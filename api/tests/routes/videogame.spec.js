const supertest = require("supertest");
var request = require("supertest");
const app = require("../../src/app.js");

describe("GET /genres", function () {
  it("it should has status code 200", function () {
    supertest(app)
      .get("/genres")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("GET /videogame/:ID", function () {
  it("it should has status code 200", function (done) {
    supertest(app)
      .get("/videogame/11")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("GET /videogames?name=", function () {
  it("it should has status code 200", function (done) {
    supertest(app)
      .get("/videogames?name=cars")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});
