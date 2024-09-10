import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../server";
describe("GET /api", () => {
  it("should return api router", async () => {
    const response = await request(app).get("/api");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("api router");
  });
});
