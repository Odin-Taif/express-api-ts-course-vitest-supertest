import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../server";

// test get request
describe("GET /api/v1/users", () => {
  it("should get all users", async () => {
    const res = await request(app).get("/api/v1/users/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
  });
});
