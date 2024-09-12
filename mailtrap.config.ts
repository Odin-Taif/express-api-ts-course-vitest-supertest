import { MailtrapClient } from "mailtrap";

import dotenv from "dotenv";

dotenv.config();

const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN!;

// if (!MAILTRAP_TOKEN) {
//   throw new Error("MAILTRAP_TOKEN is not set in the environment variables");
// } else {
//   console.log(MAILTRAP_TOKEN);
// }

export const mailTrapClient = new MailtrapClient({
  token: MAILTRAP_TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
