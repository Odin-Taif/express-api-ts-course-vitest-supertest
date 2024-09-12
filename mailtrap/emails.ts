import { VERIFICATION_EMAIL_TEMPLATE } from "./templates";
import { mailTrapClient } from "../mailtrap.config";
import { sender } from "../mailtrap.config";
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

export const sendWelcomeEmail = async (email: any, name: any) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "da74f1dd-955b-4374-9a2f-5e25a1f450ed",
      template_variables: {
        company_info_name: "Test_Company_info_name",
        name: "Test_Name",
        company_info_address: "Test_Company_info_address",
        company_info_city: "Test_Company_info_city",
        company_info_zip_code: "Test_Company_info_zip_code",
        company_info_country: "Test_Company_info_country",
      },
    });
    console.log("welcome email sent", response);
  } catch (error) {
    console.log(error);
  }
};
