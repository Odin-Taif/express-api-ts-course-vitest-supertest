import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../server";

//post request register
describe("POST /api/v1/users/signup", () => {
  it("should successfully register a user with valid data", async () => {
    const response = await request(app).post("/api/v1/users/signup").send({
      name: "John Doe",
      email: "john@example.com",
      password: "P!!assword123",
    });

    expect(response.status).toBe(201);
    // expect(response.body.message).toBe("user registered");
    // expect(response.body.user).toHaveProperty("name", "John Doe");
    // expect(response.body.user).toHaveProperty("email", "john@example.com");
    // expect(response.body.users).toHaveProperty("hashPassword");
  });
});
