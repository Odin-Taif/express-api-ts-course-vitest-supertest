import { VERIFICATION_EMAIL_TEMPLATE } from "../templates";
import { mailTrapClient } from "../../mailtrap.config";
import { sender } from "../../mailtrap.config";

export const sendVerificationEmail = async (
  email: any,
  verificationToken: any
) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);

    throw new Error(`Error sending verification email: ${error}`);
  }
};
