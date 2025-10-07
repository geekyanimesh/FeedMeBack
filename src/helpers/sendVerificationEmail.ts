import {resend} from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {
      await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'FeedMeBack | Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
        return {successs: false, message: "Verification mail sent successfully!"}
    } catch (emailError) {
        console.error("Error sending verification mail", emailError)
        return {successs: false, message: "Failed to send verification mail!"}
    }
}