import request from "supertest";
import express from "express";
import userRouter from "./userRouter"; // Update with correct path
import { describe, expect, it } from "vitest";
import { users } from "../../../drizzle/dbschema/schema";
import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/dbschema/db";

// Create a new instance of an Express app
const app = express();

// Use JSON parser middleware
app.use(express.json());

// Add your userRouter to the app
app.use("/api/v1/users", userRouter);

// Sample test user data
const testUser = {
  name: "Test User",
  email: "mjd.daif1995@gmail.com",
  password: "Passwordfsdf12@3!",
};

describe("User Router", () => {
  // Test for getting all users
  it("should get all users", async () => {
    const res = await request(app).get("/api/v1/users/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
  });

  // Test for signup | done
  //   it("should sign up a user", async () => {
  //     const res = await request(app).post("/api/v1/users/signup").send(testUser);
  //     expect(res.status).toBe(201); // Assuming 201 Created
  //     expect(res.body).toHaveProperty("success", true);
  //     expect(res.body).toHaveProperty("user");
  //   });

  //   // Test for verify email comes before login
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
  //   // Test for login after the email has been verified
  it("should login a user", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("token"); // Assuming token is returned on successful login
  });

  //   // Test for logout
  it("should logout a user", async () => {
    const res = await request(app).post("/api/v1/users/logout");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).not.toHaveProperty("token");
  });

  //   // Test for forgot password
  //   it("should send forgot password email", async () => {
  //     const res = await request(app).post("/api/users/forgot-password").send({
  //       email: testUser.email,
  //     });
  //     expect(res.status).toBe(200);
  //     expect(res.body).toHaveProperty("success", true);
  //   });

  //   // Test for reset password
  //   it("should reset password", async () => {
  //     const resetToken = "sampleToken"; // This should be the actual token from the forgot-password process
  //     const res = await request(app)
  //       .post(`/api/users/reset-password/${resetToken}`)
  //       .send({
  //         newPassword: "newpassword123",
  //       });
  //     expect(res.status).toBe(200);
  //     expect(res.body).toHaveProperty("success", true);
  //   });

  //   // Test for protected route
  //   it("should access protected route", async () => {
  //     const token = "sampleValidToken"; // Replace with actual JWT token
  //     const res = await request(app)
  //       .get("/api/users/protucted-route")
  //       .set("Authorization", `Bearer ${token}`);
  //     expect(res.status).toBe(200);
  //     expect(res.body).toHaveProperty("success", true);
  //     expect(res.body).toHaveProperty("user");
  //   });
});
