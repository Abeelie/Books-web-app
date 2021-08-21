process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

describe("GET /", function() {
    test("Render homepage", async function() {
      const response = await request(app).get(`/`);
      expect(response.statusCode).toEqual(200);
  });
});

describe("GET /search", function() {
    test("Render search page", async function() {
      const response = await request(app).get(`/search`);
      expect(response.statusCode).toEqual(200);
  });
});

describe("GET /recommendations", function() {
    test("Render recommendations page", async function() {
      const response = await request(app).get(`/recommendations`);
      expect(response.statusCode).toEqual(200);
  });
});

describe("GET /news", function() {
    test("Render newspage", async function() {
      const response = await request(app).get(`/news`);
      expect(response.statusCode).toEqual(200);
  });
});

