process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
require("../models/Product");
const Product = mongoose.model("products");

const chai = require("chai");
const { assert, expect } = chai;
const { should } = chai.should();

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const chaiHttp = require("chai-http");

const app = require("../index");

chai.use(chaiHttp);
describe("products", () => {
  // Empty database before all test cases are executed.
  before((done) => {
    Product.deleteMany({}, (err) => {
      done();
    });
  });

  // Empty database after all test cases are executed.
  after((done) => {
    Product.deleteMany({}, (err) => {
      done();
    });
  });

  // Unit tests //

  /**
   * Unit test suite for the GET /api/products route.
   */
  describe("GET /api/products", () => {
    /**
     * Tests the GET /api/products route.
     * Expected to return an empty array since no products have been added yet.
     * Expected to return a 200 OK status code.
     */
    it("Successfully GET an empty array of 0 products.", (done) => {
      Product.deleteMany({}, (err) => {
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
  });

  /**
   * Unit test suite for the POST /api/products route.
   */
  describe("POST /api/products", () => {
    /**
     * Tests the POST /api/products route with all Product parameters specified.
     * Expected to return the added Product retrieved from the Product collection.
     * Expected to return a 200 OK status code.
     */
    it("Successfully return added Product.", (done) => {
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

    /**
     * Tests the POST /api/products route with all Product parameters missing.
     * Expected to return a ValidationError.
     * Expected to return a 422 Unprocessable Entity status code.
     */
    it("Fail to add Product and successfully return ValidationError.", (done) => {
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

  // Integration tests //

  /**
   * Integration test suite for the GET /api/products and POST /apip/products route.
   */
  describe("GET /api/products & POST /api/products", () => {
    /**
     * Tests the POST /api/products and GET /api/products route.
     * Expected to return an empty array since no products have been added yet.
     * Expected to return a 200 OK status code.
     */
    it("Successfully GET an array of 1 product added by POST.", (done) => {
      Product.deleteMany({}, (err) => {
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
          })
          .timeout(500);

        chai
          .request(app)
          .get("/api/products")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.be.eql(1);
            const { name, price, quantity, isListed } = res.body[0];
            chai.assert.equal(name, p_name);
            chai.assert.equal(price, p_price);
            chai.assert.equal(quantity, p_quantity);
            chai.assert.equal(isListed, p_isListed);
            done();
          })
          .timeout(500);
      });
    });
  });
});
