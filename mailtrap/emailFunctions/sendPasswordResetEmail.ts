import { PASSWORD_RESET_REQUEST_TEMPLATE } from "../templates";
import { mailTrapClient } from "../../mailtrap.config";
import { sender } from "../../mailtrap.config";

export const sendPasswordResetEmail = async (email: any, resetUrl: any) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Password Reset",
    });
    console.log("Reset password email sent", response);
  } catch (error) {
    console.log(error);
  }
};
