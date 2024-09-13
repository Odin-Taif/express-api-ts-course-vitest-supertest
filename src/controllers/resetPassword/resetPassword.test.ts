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

describe("User Router", () => {
  //  Test for reset password
  it("should reset password", async () => {
    const resetToken = "0887d5027140405c1551469f0e1c2b6b9ad824fb"; // This should be the actual token from the forgot-password process
    const res = await request(app)
      .post(`/api/v1/users/reset-password/${resetToken}`)
      .send({
        password: "newpasA!!word123",
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
  });
});
