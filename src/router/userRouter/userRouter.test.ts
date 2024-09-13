import request from "supertest";
import express from "express";
import userRouter from "./userRouter"; // Update with correct path
import { describe, expect, it } from "vitest";

// Create a new instance of an Express app
const app = express();

// Use JSON parser middleware
app.use(express.json());

// Add your userRouter to the app
app.use("/api/v1/users", userRouter);
const testUser = {
  name: "Test User",
  email: "mjd.daif1995@gmail.com",
  password: "newpasA!!word123", // resetPassword : newpasA!!word123  || password : Passwordfsdf12@3!
};
describe("User Router", () => {
  // Test for protected route | you must login first
  // First login to get the token from cookies
  // it("should login, set cookie, and access protected route", async () => {
  //   // Step 1: Login to get the token in cookies
  //   const loginRes = await request(app).post("/api/v1/users/login").send({
  //     email: testUser.email,
  //     password: testUser.password, // resetPassword : newpasA!!word123  || password : Passwordfsdf12@3!
  //   });
  //   // Ensure login was successful and token is set in cookies
  //   expect(loginRes.status).toBe(200);
  //   expect(loginRes.headers["set-cookie"]).toBeDefined();
  //   // Extract the token from the cookie
  //   const cookies = loginRes.headers["set-cookie"];
  //   // Step 2: Use the cookie to access the protected route
  //   const protectedRes = await request(app)
  //     .get("/api/v1/users/protucted-route") // Update to the correct route path
  //     .set("Cookie", cookies); // Pass the cookies containing the token
  //   // Check if the protected route works with the token from cookies
  //   expect(protectedRes.status).toBe(200);
  //   expect(protectedRes.body).toHaveProperty("success", true);
  //   expect(protectedRes.body).toHaveProperty("user");
  // });
});
