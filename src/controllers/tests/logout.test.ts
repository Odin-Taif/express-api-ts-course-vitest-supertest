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

describe("User Router for logout", () => {
  //   // Test for logout
  it("should logout a user", async () => {
    const res = await request(app).post("/api/v1/users/logout");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).not.toHaveProperty("token");
  });
});
