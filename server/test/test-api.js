/* eslint-disable no-unused-expressions */
const restify = require("restify-clients");

const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;

let client = null;

before(() => {
  const port = process.env.PORT || 8080;
  // init the test client
  client = restify.createJsonClient({
    url: "http://localhost:" + port,
    version: "*",
  });
});

after(() => {});

describe.skip("service: post get in firebase", () => {
  it("should add a document", function (done) {
    client.get("/api/questions", function (err, req, res, data) {
      if (err) {
        throw new Error(err);
      } else {
        let body = JSON.parse(res.body);
        assert.equal(res.statusCode, 200);
        expect(body).to.exist;
        done();
      }
    });
  });
});
