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
     * Expected to return an empty array since no Products have been added yet.
     * Expected to return a 200 OK status code.
     */
    it("Successfully GET an empty array of 0 Products.", (done) => {
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

    /**
     * Tests the GET /api/products route.
     * Expected to return an array of 1 product added via the Mongoose model directly.
     * Expected to return a 200 OK status code.
     */
    it("Successfully GET an empty array of 1 product.", (done) => {
      Product.deleteMany({}, (err) => {
        const p_name = "Apple";
        const p_price = 1.0;

        const product = new Product({
          name: p_name,
          price: p_price,
          dateCreated: Date.now(),
          dateUpdated: Date.now()
        });

        product.save({}, (err) => {
          chai
            .request(app)
            .get("/api/products")
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("array");
              res.body.length.should.be.eql(1);
              const { name, price } = res.body[0];
              chai.assert.equal(name, p_name);
              chai.assert.equal(price, p_price);
              done();
            })
            .timeout(500);
        });
      });
    });
  });

  /**
   * Unit test suite for the POST /api/products route.
   */
  describe("POST /api/products", () => {
    /**
     * Tests the POST /api/products route with all product parameters specified.
     * Expected to return the added product retrieved from the product collection.
     * Expected to return a 200 OK status code.
     */
    it("Successfully POST 1 Product with all parameters specified.", (done) => {
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
     * Tests the POST /api/products route with only required product parameters specified.
     * Expected to return the added product retrieved from the product collection.
     * Expected to return a 200 OK status code.
     */
    it("Successfully POST 1 Product with only required parameters specified.", (done) => {
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
     * Tests the POST /api/products route with all product parameters missing.
     * Expected to return a ValidationError.
     * Expected to return a 400 Bad Request status code.
     */
    it("Fail to POST 1 Product because all parameters are missing.", (done) => {
      chai
        .request(app)
        .post("/api/products")
        .end((err, res) => {
          res.should.have.status(400);
          chai.assert.equal(res.body.name, "ValidationError");
          done();
        })
        .timeout(500);
    });

    /**
     * Tests the POST /api/products route with required parameter 'name' missing.
     * Expected to return a ValidationError.
     * Expected to return a 400 Bad Request status code.
     */
    it("Fail to POST 1 Product because 'name' parameter is missing.", (done) => {
      const p_price = 1.0;

      chai
        .request(app)
        .post("/api/products")
        .send({
          price: p_price,
        })
        .end((err, res) => {
          res.should.have.status(400);
          chai.assert.equal(res.body.name, "ValidationError");
          done();
        })
        .timeout(500);
    });

    /**
     * Tests the POST /api/products route with required parameter 'price' missing.
     * Expected to return a ValidationError.
     * Expected to return a 400 Bad Request status code.
     */
    it("Fail to POST 1 Product because 'price' parameter is missing.", (done) => {
      const p_name = "Apple";

      chai
        .request(app)
        .post("/api/products")
        .send({
          name: p_name,
        })
        .end((err, res) => {
          res.should.have.status(400);
          chai.assert.equal(res.body.name, "ValidationError");
          done();
        })
        .timeout(500);
    });
  });

  /**
   * Unit test suite for the DELETE /api/products route.
   */
  describe("DELETE /api/products", () => {
    /**
     * Tests the DELETE /api/products route.
     * Expected to delete the product added via the Mongoose model directly.
     * Expected to return a 200 OK status code.
     */
    it("Successfully DELETE 1 Product.", (done) => {
      Product.deleteMany({}, (err) => {
        const p_name = "Apple";
        const p_price = 1.0;

        const product = new Product({
          name: p_name,
          price: p_price,
          dateCreated: Date.now(),
          dateUpdated: Date.now()
        });

        product.save({}, (err) => {
          // Retrieve the saved document's Mongoose ID
          const { _id } = product;
          chai.assert.isNotNull(_id);

          // There should be 1 product in the Collection
          Product.countDocuments({}, (err, count) => {
            chai.assert.equal(count, 1);
          });

          chai
            .request(app)
            .delete("/api/products")
            .send({ _id: _id })
            .end((err, res) => {
              res.should.have.status(200);

              // There should be 0 Products in the Collection after deletion
              Product.countDocuments({}, (err, count) => {
                chai.assert.equal(count, 0);
              });

              done();
            })
            .timeout(500);
        });
      });
    });

    /**
     * Tests the DELETE /api/products route with required parameter '_id' missing.
     * Expected to not delete the product added via the Mongoose model directly.
     * Expected to return a ValidationError.
     * Expected to return a 400 Bad Request status code.
     */
    it("Fail to DELETE 1 Product because '_id' is missing.", (done) => {
      Product.deleteMany({}, (err) => {
        const p_name = "Apple";
        const p_price = 1.0;

        const product = new Product({
          name: p_name,
          price: p_price,
          dateCreated: Date.now(),
          dateUpdated: Date.now()
        });

        product.save({}, (err) => {
          // Retrieve the saved document's Mongoose ID
          const { _id } = product;
          chai.assert.isNotNull(_id);

          // There should be 1 product in the Collection
          Product.countDocuments({}, (err, count) => {
            chai.assert.equal(count, 1);
          });

          chai
            .request(app)
            .delete("/api/products")
            .end((err, res) => {
              res.should.have.status(400);
              chai.assert.equal(res.body.name, "ValidationError");

              // There should still be 1 product in the Collection
              Product.countDocuments({}, (err, count) => {
                chai.assert.equal(count, 1);
              });

              done();
            })
            .timeout(500);
        });
      });
    });

    /**
     * Tests the DELETE /api/products route with required parameter '_id' being malformed.
     * Expected to not delete the product added via the Mongoose model directly.
     * Expected to return a CastError.
     * Expected to return a 400 Bad Request status code.
     */
    it("Fail to DELETE 1 Product because '_id' is malformed.", (done) => {
      Product.deleteMany({}, (err) => {
        const p_name = "Apple";
        const p_price = 1.0;

        const product = new Product({
          name: p_name,
          price: p_price,
          dateCreated: Date.now(),
          dateUpdated: Date.now()
        });

        product.save({}, (err) => {
          // Retrieve the saved document's Mongoose ID
          const { _id } = product;
          chai.assert.isNotNull(_id);

          // There should be 1 product in the Collection
          Product.countDocuments({}, (err, count) => {
            chai.assert.equal(count, 1);
          });

          chai
            .request(app)
            .delete("/api/products")
            .send({ _id: "Banana" })
            .end((err, res) => {
              res.should.have.status(400);
              chai.assert.equal(res.body.name, "CastError");

              // There should still be 1 product in the Collection
              Product.countDocuments({}, (err, count) => {
                chai.assert.equal(count, 1);
              });

              done();
            })
            .timeout(500);
        });
      });
    });
  });

  // Integration tests //

  /**
   * Integration test suite for the GET /api/products and POST /api/products route.
   */
  describe("GET and POST /api/products", () => {
    /**
     * Tests the POST /api/products and GET /api/products route.
     * Expected to return an array of 1 product added by POST.
     * Expected to return a 200 OK status code.
     */
    it("Successfully GET an array of 1 Product added by POST.", (done) => {
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
    it("Successfully GET an array of 2 Products added by POST.", (done) => {
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

  /**
   * Integration test suite for the POST /api/products and DELETE /api/products route.
   */
  describe("POST and DELETE /api/products", () => {
    /**
     * Tests the POST /api/products and DELETE /api/products route.
     * Expected to POST a product and then DELETE it successfully.
     * Expected to return a 200 OK status code.
     */
    it("Successfully POST 1 Product then DELETE 1 Product.", (done) => {
      Product.deleteMany({}, (err) => {
        // Add the product
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
            const { _id, name, price, quantity, isListed } = res.body;
            chai.assert.equal(name, p_name);
            chai.assert.equal(price, p_price);
            chai.assert.equal(quantity, p_quantity);
            chai.assert.equal(isListed, p_isListed);
            // Delete the product
            chai
              .request(app)
              .delete("/api/products")
              .send({ _id })
              .end((err, res) => {
                res.should.have.status(200);

                // There should be 0 Products in the Collection after deletion
                Product.countDocuments({}, (err, count) => {
                  chai.assert.equal(count, 0);
                });

                done();
              });
          })
          .timeout(500);
      });
    });

    /**
     * Tests the POST /api/products and DELETE /api/products route.
     * Expected to POST 2 products and then DELETE the second one successfully.
     * Expected to return a 200 OK status code.
     */
    it("Successfully POST 2 Products then DELETE 1 Product.", (done) => {
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
            const { _id, name, price } = res.body;
            chai.assert.equal(name, p_name_2);
            chai.assert.equal(price, p_price_2);

            // There should be 2 Products
            Product.countDocuments({}, (err, count) => {
              chai.assert.equal(count, 2);
            });

            // Delete the product
            chai
              .request(app)
              .delete("/api/products")
              .send({ _id })
              .end((err, res) => {
                res.should.have.status(200);

                // There should be 1 Product left
                Product.countDocuments({}, (err, count) => {
                  chai.assert.equal(count, 1);
                });

                done();
              });
          })
          .timeout(500);
      });
    });
  });
});
