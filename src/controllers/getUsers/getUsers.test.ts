import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../server";

// test get request
describe("GET /api/v1/users", () => {
  it("should return users route is working", async () => {
    const response = await request(app).get("/api/v1/users");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Users fetched successfully");
  });
});
