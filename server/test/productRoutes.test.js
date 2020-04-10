process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
require("../models/Product");
const Product = mongoose.model("products");

const chai = require("chai");
const { assert } = chai;
const { should } = chai.should();
const chaiHttp = require("chai-http");
const app = require("../index");

chai.use(chaiHttp);
describe("products", () => {
  // Empty database before each test case is executed
  afterEach((done) => {
    Product.deleteMany({}, (err) => {
      done();
    });
  });

  // Unit tests //

  /**
   * Tests the GET /api/products route.
   * Expected to return an empty array since no products have been added yet.
   * Expected to return a 200 OK status code.
   */
  describe("GET /api/products : Success : No documents in Product collection", () => {
    it("Delete all documents in Product collection", (done) => {
      setTimeout(() => {
        Product.deleteMany({}, (err) => {
          done();
        });
      }, 4);
    });

    it("Return an empty array with a 200 OK status code.", (done) => {
      chai
        .request(app)
        .get("/api/products")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        })
        .timeout(500);
    });
  });

  /**
   * Tests the POST /api/products route with all Product parameters specified.
   * Expected to return the added Product retrieved from the Product collection.
   * Expected to return a 200 OK status code.
   */
  describe("POST /api/products : Success : Required and optional parameters specified", () => {
    it("Return the added Product with a 200 OK status code.", (done) => {
      const p_name = "Apple";
      const p_price = 1.0;
      const p_quantity = 1;
      const p_isListed = false;

      chai
        .request(app)
        .post("/api/products")
        .send({
          name: p_name,
          price: p_price,
          quantity: p_quantity,
          isListed: p_isListed,
        })
        .end((err, res) => {
          res.should.have.status(200);
          const { name, price, quantity, isListed } = res.body;
          chai.assert.equal(name, p_name);
          chai.assert.equal(price, p_price);
          chai.assert.equal(quantity, p_quantity);
          chai.assert.equal(isListed, p_isListed);
          done();
        })
        .timeout(500);
    });
  });

  /**
   * Tests the POST /api/products route with all Product parameters missing.
   * Expected to return a ValidationError.
   * Expected to return a 422 Unprocessable Entity status code.
   */
  describe("POST /api/products : Failure : Required Product parameters not specified", () => {
    it("Return a 422 Unprocessable Entity status code.", (done) => {
      chai
        .request(app)
        .post("/api/products")
        .end((err, res) => {
          chai.assert.equal(res.body.name, "ValidationError");
          res.should.have.status(422);
          done();
        })
        .timeout(500);
    });
  });
});
