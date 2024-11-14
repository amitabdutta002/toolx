import { EmailTemplate } from '@/email/verificationTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, fullName: string, verificationCode: string) {
    try {
        const { data, error } = await resend.emails.send({
        from: 'ToolX <onboarding@resend.dev>',
        to: email,
        subject: 'ToolX | Verification code',
        react: EmailTemplate({ fullName, verificationCode }),
    });

    if (error) {
        return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);

    }   catch (error) {
    return Response.json({ error }, { status: 500 });
}
}
