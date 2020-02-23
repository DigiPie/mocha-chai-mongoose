process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
require("../models/Product");
const Product = mongoose.model("products");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const should = chai.should();

chai.use(chaiHttp);
describe("products", () => {
  // Empty database before each test case is executed
  beforeEach(done => {
    Product.deleteMany({}, err => {
      done();
    });
  });

  /**
   * Tests the GET /api/products route which is expected to
   * return an empty array since no products have been added yet.
   */
  describe("GET /api/products Empty", () => {
    it("Empty array should be returned successfully.", done => {
      chai.request(app)
        .get("/api/products")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
