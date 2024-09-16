import request from "supertest";
import express from "express";
import { describe, expect, it } from "vitest";
import userRouter from "../../router/userRouter/userRouter";

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
  //   // Test for forgot password
  it("should send forgot password email", async () => {
    const res = await request(app).post("/api/v1/users/forgot-password").send({
      email: testUser.email,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
  });
});
