import { PASSWORD_RESET_SUCCESS_TEMPLATE } from "../templates";
import { mailTrapClient } from "../../mailtrap.config";
import { sender } from "../../mailtrap.config";
export const sendResetSuccessEmail = async (email: any) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Your password",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset Successful",
    });
    console.log("Reset password Successfull", response);
  } catch (error) {
    console.log(error);
  }
};
