import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../server";

//post request register
describe("POST /api/v1/users/signup", () => {
  const testUser = {
    name: "Test User",
    email: "mjd.daif1995@gmail.com",
    password: "Passwordfsdf12@3!",
  };
  // Test for signup | done
  it("should sign up a user", async () => {
    const res = await request(app).post("/api/v1/users/signup").send(testUser);
    expect(res.status).toBe(201); // Assuming 201 Created
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("user");
  });
});
