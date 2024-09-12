import { MailtrapClient } from "mailtrap";

import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.TOKEN;

if (!TOKEN) {
  throw new Error("MAILTRAP_TOKEN is not set in the environment variables");
} else {
  console.log(TOKEN);
}

export const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
