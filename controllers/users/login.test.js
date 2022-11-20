const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");

require("dotenv").config();
const { DB_HOST } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_HOST);
  });

  test("should login user", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "user1@mail.com",
      password: "user1",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      data: {
        token: expect.any(String),
        user: {
          email: "user1@mail.com",
          subscription: expect.any(String),
          avatarURL: expect.any(String),
        },
      },
    });
  });
});
