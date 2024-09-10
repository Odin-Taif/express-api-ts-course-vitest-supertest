import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../server";

// test get request
describe("GET /users", () => {
  it("should return users route is working", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("route is working");
  });
});

//post request register
describe("POST /users/signup", () => {
  it("should successfully register a user with valid data", async () => {
    const response = await request(app).post("/users/signup").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("user registered");
    expect(response.body.user).toHaveProperty("name", "John Doe");
    expect(response.body.user).toHaveProperty("email", "john@example.com");
    // expect(response.body.users).toHaveProperty("hashPassword");
  });
});

//post request login
// describe("POST /users/login", () => {
//   it("should return users logged in ", async () => {
//     const response = await request(app).post("/users/login").send({
//       email: "john@example.com",
//       password: "password123",
//     });
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("users logged in");
//   });
// });
