import dotenv from "dotenv";
dotenv.config();
import { MailtrapClient } from "mailtrap";

const TOKEN = "f942155a0d549f0636d99a50071e6fcb";

// console.log("MAILTRAP_TOKEN:", process.env.MAILTRAP_TOKEN);

if (!TOKEN) {
  throw new Error("MAILTRAP_TOKEN is not set in the environment variables");
}
export const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
