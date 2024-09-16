import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../server";

describe("POST /api/v1/users/login", () => {
  const testUser = {
    name: "Test User",
    email: "mjd.daif1995@gmail.com",
    password: "newpasA!!word123", // resetPassword : newpasA!!word123  || password : Passwordfsdf12@3!
  };

  // Test for login after the email has been verified
  it("should login a user", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("token"); // Assuming token is returned on successful login
  });
});
