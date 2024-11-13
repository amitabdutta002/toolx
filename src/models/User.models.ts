import mongoose, { Document, Schema } from "mongoose";

export interface userInterface extends Document {
    fullName: string,
    email: string,
    password: string,
    avtar?: string,
    role:  "Admin" | "Team member" | "Project manager" | "Viewer",
    isActive: boolean
    lastLogin?: Date
}

const userSchema: Schema<userInterface> = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "name is required"], 
        index: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "email is required"], 
        index: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"] 
    },
    avtar: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Team member", "Project manager", "Viewer"],
        default: "Team member",
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
    }

}, { timestamps: true })

export const User = mongoose.models.User as mongoose.Model<userInterface> || mongoose.model<userInterface>('User', userSchema)