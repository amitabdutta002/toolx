import { connectDB } from "@/connection";
import { sendVerificationEmail } from "@/helpers/verificationEmail";
import { User } from "@/models/User.models";
import bcrypt from 'bcryptjs'

export async function POST(request: Request){
    await connectDB()

    try {
        const { fullName, email, password } = await request.json();

        if ([fullName, email, password].some((field) => field?.trim() === "" )) {
            return Response.json(
                {
                    success: false,
                    message: "All fields are required"
                },{
                    status: 400
                }
            )
        }

        const verificationCode = Math.floor( 100000 + Math.random() * 900000).toString()

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return Response.json(
                {
                    success: false,
                    message: "User with this email already exist"
                },{
                    status: 403
                }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            verificationCode
        })

        if (!user?._id) {
            return Response.json(
                {
                    success: false,
                    message: "User registration failed"
                }
            )
        }
        const createdUser = await User.findById(user?._id).select(" -password -verificationCode ")
        const emailResponse = await sendVerificationEmail(email, fullName, verificationCode)
        if (!emailResponse) {
            return Response.json(
                {
                    success: false,
                    message: "Error sending email",
                },{
                    status: 500
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: "User registerd successfully",
                data: createdUser
            },{
                status: 200
            }
        )

    } catch (error) {
        console.error(`Error registering user | ERROR:${error}`);
        return Response.json(
            {
                success: false,
                message: "Internal server error"
            },{
                status: 500
            }
        )
    }
}