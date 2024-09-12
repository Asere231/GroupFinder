const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./severUtil/mongooseSchemas/schemas");
const allOtherRoutes = require("./severUtil/routes/routers.js");
const mainRoute = require("./server.js");
const url = "mongodb+srv://User:Password@groupfinderdb.xojgwrj.mongodb.net/";

// Create an instance of Express app
const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());
app.use("/", mainRoute);
app.use("/", allOtherRoutes);

// // Connect to a test database
// beforeAll(async () => {
//   await mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// // Disconnect from the test database after tests are done
// afterAll(async () => {
//   await mongoose.connection.close();
// });

describe("POST /api/register", () => {
  it("should register a new user and send verification email", async () => {
    let mockUser = {
      firstName: "TestUser",
      lastName: "TestUser",
      username: "helloooooooo",
      email: "baneyro@yahoo.com",
      password: "password#999",
    };

    let response = await request(app)
      .post("/api/register")
      .send(mockUser)
      .expect(200);

    // Assert that the response contains a token and a message
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty(
      "msg",
      "User registered. Verification email sent."
    );
  }, 100000);

  it("should fail registration with invalid data", async () => {
    let invalidMockUser = {
      // Missing username
      email: "invalid@example.com",
      password: "password123",
    };

    let response = await request(app)
      .post("/api/register")
      .send(invalidMockUser)
      .expect(400);

    // In this case I'm omitting asserting the response body because it changes depending on the passed values
    // or if there is any other errors. However expecting a 400 status is more than enough.
  }, 100000);
});

describe("POST /api/login", () => {
  it("should login an existing user", async () => {
    let mockUser = {
      username: "RickL",
      password: "COP4331@",
    };

    let response = await request(app)
      .post("/api/login")
      .send(mockUser)
      .expect(200);

    expect(response.body).toHaveProperty("token");
  }, 100000);

  it("should fail login with invalid data", async () => {
    let invalidMockUser = {
      username: "testuser",
      password: "password",
    };

    let response = await request(app)
      .post("/api/login")
      .send(invalidMockUser)
      .expect(400);

    // In this case I'm omitting asserting the response body because it changes depending on the passed values
    // or if there is any other errors. However expecting a 400 status is more than enough.
  }, 100000);
});

describe("GET /api/search/:key", () => {
  it("should return an array with at least one table object", async () => {
    let searchString = "CS1";

    let response = await request(app)
      .get(`/api/search/${searchString}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);

    // Assert that the array has at least one element
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should not return anything", async () => {
    let invalidSearchString = "hvbhjdsbnsjkv";

    let response = await request(app)
      .get(`/api/search/${invalidSearchString}`)
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });
});
