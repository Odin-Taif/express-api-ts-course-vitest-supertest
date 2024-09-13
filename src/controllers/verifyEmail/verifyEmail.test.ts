import request from "supertest";
import express from "express";
import { describe, expect, it } from "vitest";
import { users } from "../../../drizzle/dbschema/schema";
import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/dbschema/db";
import userRouter from "../../router/userRouter/userRouter";

// Test for verify email comes before login
// Sample test user data
const testUser = {
  name: "Test User",
  email: "mjd.daif1995@gmail.com",
  password: "Passwordfsdf12@3!",
};

// Create a new instance of an Express app
const app = express();

// Use JSON parser middleware
app.use(express.json());

// Add your userRouter to the app
app.use("/api/v1/users", userRouter);

describe("group", () => {
  it("should verify email", async () => {
    // Query the database to get the verification code for a specific test user
    const email = testUser.email; // Use the email of the user you're testing with
    const user = await db
      .select({
        id: users.id,
        email: users.email,
        verificationCode: users.verificationToken, // Assuming you have a column for the code
      })
      .from(users)
      .where(eq(users.email, email));

    // Make sure user exists and code is present
    expect(user.length).toBeGreaterThan(0); // Ensure the user exists in the DB
    const verificationCode = user[0].verificationCode; // Get the actual verification code

    // Call the verify-email route with the code from the database
    const res = await request(app).post("/api/v1/users/verify-email").send({
      code: verificationCode, // Use the fetched code from the DB
    });

    // Expecting the verification to be successful
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Email verified successfully");
  });
});
