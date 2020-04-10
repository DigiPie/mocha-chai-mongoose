process.env.NODE_ENV = "test";

const _ = require("lodash");

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
    it("Successfully add a Product with all parameters specified.", (done) => {
      const p_name = "Apple";
      const p_price = 1.0;
      const p_quantity = 1;
      const p_isListed = true;

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
     * Tests the POST /api/products route with only required Product parameters specified.
     * Expected to return the added Product retrieved from the Product collection.
     * Expected to return a 200 OK status code.
     */
    it("Successfully add a Product with only required parameters specified.", (done) => {
      const p_name = "Apple";
      const p_price = 1.0;

      chai
        .request(app)
        .post("/api/products")
        .send({
          name: p_name,
          price: p_price,
        })
        .end((err, res) => {
          res.should.have.status(200);
          const { name, price } = res.body;
          chai.assert.equal(name, p_name);
          chai.assert.equal(price, p_price);
          done();
        })
        .timeout(500);
    });

    /**
     * Tests the POST /api/products route with all Product parameters missing.
     * Expected to return a ValidationError.
     * Expected to return a 422 Unprocessable Entity status code.
     */
    it("Fail to add a Product because all parameters are missing.", (done) => {
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

    /**
     * Tests the POST /api/products route with required paramter 'name' missing.
     * Expected to return a ValidationError.
     * Expected to return a 422 Unprocessable Entity status code.
     */
    it("Fail to add a Product because 'name' parameter is missing.", (done) => {
      const p_price = 1.0;

      chai
        .request(app)
        .post("/api/products")
        .send({
          price: p_price,
        })
        .end((err, res) => {
          chai.assert.equal(res.body.name, "ValidationError");
          res.should.have.status(422);
          done();
        })
        .timeout(500);
    });

    /**
     * Tests the POST /api/products route with required paramter 'price' missing.
     * Expected to return a ValidationError.
     * Expected to return a 422 Unprocessable Entity status code.
     */
    it("Fail to add a Product because 'price' parameter is missing.", (done) => {
      const p_name = "Apple";

      chai
        .request(app)
        .post("/api/products")
        .send({
          name: p_name,
        })
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
   * Integration test suite for the GET /api/products and POST /api/products route.
   */
  describe("GET /api/products & POST /api/products", () => {
    /**
     * Tests the POST /api/products and GET /api/products route.
     * Expected to return an array of 1 product added by POST.
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

    /**
     * Tests the POST /api/products and GET /api/products route.
     * Expected to return an array of 2 products added by POST.
     * Expected to return a 200 OK status code.
     */
    it("Successfully GET an array of 2 products added by POST.", (done) => {
      Product.deleteMany({}, (err) => {
        // Add 1st product
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

        // Add 2nd product
        const p_name_2 = "Banana";
        const p_price_2 = 15;

        chai
          .request(app)
          .post("/api/products")
          .send({
            name: p_name_2,
            price: p_price_2,
          })
          .end((err, res) => {
            res.should.have.status(200);
            const { name, price } = res.body;
            chai.assert.equal(name, p_name_2);
            chai.assert.equal(price, p_price_2);
          })
          .timeout(500);

        // GET the 2 added products
        chai
          .request(app)
          .get("/api/products")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.be.eql(2);

            const product_1 = _.find(res.body, ["name", p_name]);
            const { name, price, quantity, isListed } = product_1;
            chai.assert.equal(name, p_name);
            chai.assert.equal(price, p_price);
            chai.assert.equal(quantity, p_quantity);
            chai.assert.equal(isListed, p_isListed);

            const product_2 = _.find(res.body, ["name", p_name_2]);
            const { name: name_2, price: price_2 } = product_2;
            chai.assert.equal(name_2, p_name_2);
            chai.assert.equal(price_2, p_price_2);
            done();
          })
          .timeout(500);
      });
    });
  });
});
