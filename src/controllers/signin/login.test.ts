import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../server";

describe("POST /api/v1/users/login", () => {
  it("should return users logged in ", async () => {
    const response = await request(app).post("/api/v1/users/login").send({
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Please check your Email or Password!");
  });
});
