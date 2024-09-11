import dotenv from "dotenv";
dotenv.config();
import { MailtrapClient } from "mailtrap"; // or appropriate import

const TOKEN = process.env.TOKEN;

console.log("MAILTRAP_TOKEN:", TOKEN); // This should print the token or `undefined` if not set

if (!TOKEN) {
  throw new Error("MAILTRAP_TOKEN is not set in the environment variables");
}
const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "odin.thif@appliedtechnology.se",
  },
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);
