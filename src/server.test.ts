import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import app from "./server";

let server: any;

beforeAll(() => {
  // Start the server before running tests
  server = app.listen(3000);
});

afterAll(() => {
  // Close the server after tests to release the port
  server.close();
});

// Describe the test suite for your Express API
describe("GET /", () => {
  it("should return a greeting message", async () => {
    const response = await request(app).get("/");

    // Assertions
    expect(response.status).toBe(200); // Check if status is 200 OK
    expect(response.body.message).toBe(
      "Welcome from express with TS, Vitest and supertest"
    ); // Check if message is correct
  });
});
