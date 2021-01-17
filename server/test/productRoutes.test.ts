export {};

process.env.NODE_ENV = "test";

const { find } = require("lodash");

const mongoose = require("mongoose");
require("../src/models/Product");
const Product = mongoose.model("products");

const chai = require("chai");
const { should } = chai.should();
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../src/index");

const timeoutDuration = 3000;

describe("products", () => {
  // Empty database before all test cases are executed.
  before((done) => {
    Product.deleteMany({}, (err: any) => {
      done();
    });
  });

  // Empty database after all test cases are executed.
  after((done) => {
    Product.deleteMany({}, (err: any) => {
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
      Product.deleteMany({}, (err: any) => {
        chai
          .request(app)
          .get("/api/products")
          .end((err: any, res: any) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.be.eql(0);
            done();
          })
          .timeout(timeoutDuration);
      });
    });

    /**
     * Tests the GET /api/products route.
     * Expected to return an array of 1 product added via the Mongoose model directly.
     * Expected to return a 200 OK status code.
     */
    it("Successfully GET an empty array of 1 product.", (done) => {
      Product.deleteMany({}, (err: any) => {
        const p_name = "Apple";
        const p_price = 1.0;
        const date = Date.now();

        const product = new Product({
          name: p_name,
          price: p_price,
          dateCreated: date,
          dateUpdated: date,
        });

        product.save({}, (err: any) => {
          chai
            .request(app)
            .get("/api/products")
            .end((err: any, res: any) => {
              res.should.have.status(200);
              res.body.should.be.a("array");
              res.body.length.should.be.eql(1);
              const { name, price } = res.body[0];
              chai.assert.equal(name, p_name);
              chai.assert.equal(price, p_price);
              done();
            })
            .timeout(timeoutDuration);
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
        .end((err: any, res: any) => {
          res.should.have.status(200);
          const { name, price, quantity, isListed } = res.body;
          chai.assert.equal(name, p_name);
          chai.assert.equal(price, p_price);
          chai.assert.equal(quantity, p_quantity);
          chai.assert.equal(isListed, p_isListed);
          done();
        })
        .timeout(timeoutDuration);
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
        .end((err: any, res: any) => {
          res.should.have.status(200);
          const { name, price } = res.body;
          chai.assert.equal(name, p_name);
          chai.assert.equal(price, p_price);
          done();
        })
        .timeout(timeoutDuration);
    });

    /**
     * Tests the POST /api/products route with all product parameters missing.
     * Expected to return a 400 Bad Request status code.
     */
    it("Fail to POST 1 Product because all parameters are missing.", (done) => {
      chai
        .request(app)
        .post("/api/products")
        .end((err: any, res: any) => {
          res.should.have.status(400);
          done();
        })
        .timeout(timeoutDuration);
    });

    /**
     * Tests the POST /api/products route with required parameter 'name' missing.
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
        .end((err: any, res: any) => {
          res.should.have.status(400);
          done();
        })
        .timeout(timeoutDuration);
    });

    /**
     * Tests the POST /api/products route with required parameter 'price' missing.
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
        .end((err: any, res: any) => {
          res.should.have.status(400);
          done();
        })
        .timeout(timeoutDuration);
    });
  });

  /**
   * Unit test suite for the PUT /api/products route.
   */
  describe("PUT /api/products", () => {
    /**
     * Tests the PUT /api/products route with all product parameters specified.
     * Expected to return the updated product retrieved from the product collection.
     * Expected to return a 200 OK status code.
     */
    it("Successfully PUT 1 Product with all parameters specified.", (done) => {
      Product.deleteMany({}, (err: any) => {
        const p_name = "Apple";
        const p_price = 1.0;
        const p_quantity = 1;
        const p_isListed = true;
        const date = Date.now();

        const product = new Product({
          name: p_name,
          price: p_price,
          quantity: p_quantity,
          isListed: p_isListed,
          dateCreated: date,
          dateUpdated: date,
        });

        product.save({}, (err: any) => {
          // Retrieve the saved document's Mongoose ID
          const { _id } = product;
          chai.assert.isNotNull(_id);

          // Properties to update to
          const u_name = "Banana";
          const u_price = 1.5;
          const u_quantity = 2;
          const u_isListed = false;

          chai
            .request(app)
            .put("/api/products")
            .send({
              _id: _id,
              name: u_name,
              price: u_price,
              quantity: u_quantity,
              isListed: u_isListed,
            })
            .end((err: any, res: any) => {
              res.should.have.status(200);
              const { name, price, quantity, isListed } = res.body;
              chai.assert.equal(name, u_name);
              chai.assert.equal(price, u_price);
              chai.assert.equal(quantity, u_quantity);
              chai.assert.equal(isListed, u_isListed);
              done();
            })
            .timeout(timeoutDuration);
        });
      });
    });

    /**
     * Tests the PUT /api/products route with only one parameter specified besides '_id'.
     * Expected to return the updated product retrieved from the product collection.
     * Expected to return a 200 OK status code.
     */
    it("Successfully PUT 1 Product with only one parameter specified besides '_id'.", (done) => {
      Product.deleteMany({}, (err: any) => {
        const p_name = "Apple";
        const p_price = 1.0;
        const p_quantity = 1;
        const p_isListed = true;
        const date = Date.now();

        const product = new Product({
          name: p_name,
          price: p_price,
          quantity: p_quantity,
          isListed: p_isListed,
          dateCreated: date,
          dateUpdated: date,
        });

        product.save({}, (err: any) => {
          // Retrieve the saved document's Mongoose ID
          const { _id } = product;
          chai.assert.isNotNull(_id);

          // Properties to update to
          const u_name = "Carrot";

          chai
            .request(app)
            .put("/api/products")
            .send({
              _id: _id,
              name: u_name,
            })
            .end((err: any, res: any) => {
              res.should.have.status(200);
              const { name, price, quantity, isListed } = res.body;
              // Only name was updated, other properties should still be the same as previously
              chai.assert.equal(name, u_name);
              chai.assert.equal(price, p_price);
              chai.assert.equal(quantity, p_quantity);
              chai.assert.equal(isListed, p_isListed);
              done();
            })
            .timeout(timeoutDuration);
        });
      });
    });

    /**
     * Tests the PUT /api/products route with no parameters specified.
     * Expected to return the updated product retrieved from the product collection.
     * Updated product should be the same as the original product.
     * Expected to return a 200 OK status code.
     */
    it("Successfully PUT 1 Product with no parameters specified.", (done) => {
      Product.deleteMany({}, (err: any) => {
        const p_name = "Apple";
        const p_price = 1.0;
        const p_quantity = 0;
        const p_isListed = false;
        const date = Date.now();

        const product = new Product({
          name: p_name,
          price: p_price,
          quantity: p_quantity,
          isListed: p_isListed,
          dateCreated: date,
          dateUpdated: date,
        });

        product.save({}, (err: any) => {
          // Retrieve the saved document's Mongoose ID
          const { _id } = product;
          chai.assert.isNotNull(_id);

          chai
            .request(app)
            .put("/api/products")
            .send({
              _id: _id,
            })
            .end((err: any, res: any) => {
              res.should.have.status(200);
              const { name, price, quantity, isListed } = res.body;
              // No properties were specified for update, so all properties should be unchanged
              chai.assert.equal(name, p_name);
              chai.assert.equal(price, p_price);
              chai.assert.equal(quantity, p_quantity);
              chai.assert.equal(isListed, p_isListed);
              done();
            })
            .timeout(timeoutDuration);
        });
      });
    });

    /**
     * Tests the PUT /api/products route with valid and non-valid parameters specified.
     * Non-valid parameters are expected to be discarded, while valid parameters are still read.
     * Expected to return the updated product retrieved from the product collection.
     * Expected to return a 200 OK status code.
     */
    it("Successfully PUT 1 Product with valid and non-valid parameters specified.", (done) => {
      Product.deleteMany({}, (err: any) => {
        const p_name = "Carrot Cake";
        const p_price = 1.0;
        const p_quantity = 50;
        const p_isListed = true;
        const date = Date.now();

        const product = new Product({
          name: p_name,
          price: p_price,
          quantity: p_quantity,
          isListed: p_isListed,
          dateCreated: date,
          dateUpdated: date,
        });

        product.save({}, (err: any) => {
          // Retrieve the saved document's Mongoose ID
          const { _id } = product;
          chai.assert.isNotNull(_id);

          // Properties to update to
          const u_name = "Carrot";
          const u_isListed = false;
          const i_age = 20; // Invalid property which should be ignored

          chai
            .request(app)
            .put("/api/products")
            .send({
              _id: _id,
              name: u_name,
              isListed: u_isListed,
              age: i_age, // Invalid property
            })
            .end((err: any, res: any) => {
              res.should.have.status(200);
              const { name, price, quantity, isListed, age } = res.body;
              // Only name and isListed were updated
              chai.assert.equal(name, u_name);
              chai.assert.equal(isListed, u_isListed);
              chai.assert.equal(price, p_price);
              chai.assert.equal(quantity, p_quantity);

              chai.assert.isUndefined(age); // Invalid property should not be added to product
              done();
            })
            .timeout(timeoutDuration);
        });
      });
    });

    /**
     * Tests the PUT /api/products route with required parameter '_id' missing.
     * Expected to not update the product added via the Mongoose model directly.
     * Expected to return a 400 Bad Request status code.
     */
    it("Fail to PUT 1 Product because '_id' is missing.", (done) => {
      Product.deleteMany({}, (err: any) => {
        const p_name = "Apple";
        const p_price = 1.0;
        const p_quantity = 0;
        const p_isListed = false;
        const date = Date.now();

        const product = new Product({
          name: p_name,
          price: p_price,
          quantity: p_quantity,
          isListed: p_isListed,
          dateCreated: date,
          dateUpdated: date,
        });

        product.save({}, (err: any) => {
          chai
            .request(app)
            .put("/api/products")
            .end((err: any, res: any) => {
              res.should.have.status(400);
              done();
            })
            .timeout(timeoutDuration);
        });
      });
    });

    /**
     * Tests the PUT /api/products route with required parameter '_id' being malformed.
     * Expected to not update the product added via the Mongoose model directly.
     * Expected to return a 400 Bad Request status code.
     */
    it("Fail to PUT 1 Product because '_id' is malformed.", (done) => {
      Product.deleteMany({}, (err: any) => {
        const p_name = "Apple";
        const p_price = 1.0;
        const date = Date.now();

        const product = new Product({
          name: p_name,
          price: p_price,
          dateCreated: date,
          dateUpdated: date,
        });

        product.save({}, (err: any) => {
          chai
            .request(app)
            .put("/api/products")
            .send({ _id: "Banana" })
            .end((err: any, res: any) => {
              res.should.have.status(400);
              done();
            })
            .timeout(timeoutDuration);
        });
      });
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
      Product.deleteMany({}, (err: any) => {
        const p_name = "Apple";
        const p_price = 1.0;
        const date = Date.now();

        const product = new Product({
          name: p_name,
          price: p_price,
          dateCreated: date,
          dateUpdated: date,
        });

        product.save({}, (err: any) => {
          // Retrieve the saved document's Mongoose ID
          const { _id } = product;
          chai.assert.isNotNull(_id);

          // There should be 1 product in the Collection
          Product.countDocuments({}, (err: any, count: number) => {
            chai.assert.equal(count, 1);
          });

          chai
            .request(app)
            .delete("/api/products")
            .send({ _id: _id })
            .end((err: any, res: any) => {
              res.should.have.status(200);

              // There should be 0 Products in the Collection after deletion
              Product.countDocuments({}, (err: any, count: number) => {
                chai.assert.equal(count, 0);
              });

              done();
            })
            .timeout(timeoutDuration);
        });
      });
    });

    /**
     * Tests the DELETE /api/products route with required parameter '_id' missing.
     * Expected to not delete the product added via the Mongoose model directly.
     * Expected to return a 400 Bad Request status code.
     */
    it("Fail to DELETE 1 Product because '_id' is missing.", (done) => {
      Product.deleteMany({}, (err: any) => {
        const p_name = "Apple";
        const p_price = 1.0;
        const date = Date.now();

        const product = new Product({
          name: p_name,
          price: p_price,
          dateCreated: date,
          dateUpdated: date,
        });

        product.save({}, (err: any) => {
          // Retrieve the saved document's Mongoose ID
          const { _id } = product;
          chai.assert.isNotNull(_id);

          // There should be 1 product in the Collection
          Product.countDocuments({}, (err: any, count: number) => {
            chai.assert.equal(count, 1);
          });

          chai
            .request(app)
            .delete("/api/products")
            .end((err: any, res: any) => {
              res.should.have.status(400);

              // There should still be 1 product in the Collection
              Product.countDocuments({}, (err: any, count: number) => {
                chai.assert.equal(count, 1);
              });

              done();
            })
            .timeout(timeoutDuration);
        });
      });
    });

    /**
     * Tests the DELETE /api/products route with required parameter '_id' being malformed.
     * Expected to not delete the product added via the Mongoose model directly.
     * Expected to return a 400 Bad Request status code.
     */
    it("Fail to DELETE 1 Product because '_id' is malformed.", (done) => {
      Product.deleteMany({}, (err: any) => {
        const p_name = "Apple";
        const p_price = 1.0;
        const date = Date.now();

        const product = new Product({
          name: p_name,
          price: p_price,
          dateCreated: date,
          dateUpdated: date,
        });

        product.save({}, (err: any) => {
          // There should be 1 product in the Collection
          Product.countDocuments({}, (err: any, count: number) => {
            chai.assert.equal(count, 1);
          });

          chai
            .request(app)
            .delete("/api/products")
            .send({ _id: "Banana" })
            .end((err: any, res: any) => {
              res.should.have.status(400);

              // There should still be 1 product in the Collection
              Product.countDocuments({}, (err: any, count: number) => {
                chai.assert.equal(count, 1);
              });

              done();
            })
            .timeout(timeoutDuration);
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
      Product.deleteMany({}, (err: any) => {
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
          .end((err: any, res: any) => {
            res.should.have.status(200);
            const { name, price, quantity, isListed } = res.body;
            chai.assert.equal(name, p_name);
            chai.assert.equal(price, p_price);
            chai.assert.equal(quantity, p_quantity);
            chai.assert.equal(isListed, p_isListed);
          })
          .timeout(timeoutDuration);

        chai
          .request(app)
          .get("/api/products")
          .end((err: any, res: any) => {
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
          .timeout(timeoutDuration);
      });
    });

    /**
     * Tests the POST /api/products and GET /api/products route.
     * Expected to return an array of 2 products added by POST.
     * Expected to return a 200 OK status code.
     */
    it("Successfully GET an array of 2 Products added by POST.", (done) => {
      Product.deleteMany({}, (err: any) => {
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
          .end((err: any, res: any) => {
            res.should.have.status(200);
            const { name, price, quantity, isListed } = res.body;
            chai.assert.equal(name, p_name);
            chai.assert.equal(price, p_price);
            chai.assert.equal(quantity, p_quantity);
            chai.assert.equal(isListed, p_isListed);
          })
          .timeout(timeoutDuration);

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
          .end((err: any, res: any) => {
            res.should.have.status(200);
            const { name, price } = res.body;
            chai.assert.equal(name, p_name_2);
            chai.assert.equal(price, p_price_2);
          })
          .timeout(timeoutDuration);

        // GET the 2 added products
        chai
          .request(app)
          .get("/api/products")
          .end((err: any, res: any) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.be.eql(2);

            const product_1 = find(res.body, ["name", p_name]);
            const { name, price, quantity, isListed } = product_1;
            chai.assert.equal(name, p_name);
            chai.assert.equal(price, p_price);
            chai.assert.equal(quantity, p_quantity);
            chai.assert.equal(isListed, p_isListed);

            const product_2 = find(res.body, ["name", p_name_2]);
            const { name: name_2, price: price_2 } = product_2;
            chai.assert.equal(name_2, p_name_2);
            chai.assert.equal(price_2, p_price_2);
            done();
          })
          .timeout(timeoutDuration);
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
      Product.deleteMany({}, (err: any) => {
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
          .end((err: any, res: any) => {
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
              .end((err: any, res: any) => {
                res.should.have.status(200);

                // There should be 0 Products in the Collection after deletion
                Product.countDocuments({}, (err: any, count: number) => {
                  chai.assert.equal(count, 0);
                });

                done();
              });
          })
          .timeout(timeoutDuration);
      });
    });

    /**
     * Tests the POST /api/products and DELETE /api/products route.
     * Expected to POST 2 products and then DELETE the second one successfully.
     * Expected to return a 200 OK status code.
     */
    it("Successfully POST 2 Products then DELETE 1 Product.", (done) => {
      Product.deleteMany({}, (err: any) => {
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
          .end((err: any, res: any) => {
            res.should.have.status(200);
            const { name, price, quantity, isListed } = res.body;
            chai.assert.equal(name, p_name);
            chai.assert.equal(price, p_price);
            chai.assert.equal(quantity, p_quantity);
            chai.assert.equal(isListed, p_isListed);
          })
          .timeout(timeoutDuration);

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
          .end((err: any, res: any) => {
            res.should.have.status(200);
            const { _id, name, price } = res.body;
            chai.assert.equal(name, p_name_2);
            chai.assert.equal(price, p_price_2);

            // There should be 2 Products
            Product.countDocuments({}, (err: any, count: number) => {
              chai.assert.equal(count, 2);
            });

            // Delete the product
            chai
              .request(app)
              .delete("/api/products")
              .send({ _id })
              .end((err: any, res: any) => {
                res.should.have.status(200);

                // There should be 1 Product left
                Product.countDocuments({}, (err: any, count: number) => {
                  chai.assert.equal(count, 1);
                });

                done();
              });
          })
          .timeout(timeoutDuration);
      });
    });
  });

  /**
   * Integration test suite for the POST /api/products and PUT /api/products route.
   */
  describe("POST and PUT /api/products", () => {
    /**
     * Tests the POST /api/products and PUT /api/products route.
     * Expected to POST a product and then PUT it successfully.
     * Expected to return a 200 OK status code.
     */
    it("Successfully POST 1 Product then PUT 1 Product.", (done) => {
      Product.deleteMany({}, (err: any) => {
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
          .end((err: any, res: any) => {
            res.should.have.status(200);
            const { _id, name, price, quantity, isListed } = res.body;
            chai.assert.equal(name, p_name);
            chai.assert.equal(price, p_price);
            chai.assert.equal(quantity, p_quantity);
            chai.assert.equal(isListed, p_isListed);

            // Properties to update to
            const u_name = "Banana";
            const u_price = 1.5;
            const u_quantity = 2;
            const u_isListed = false;

            // Update the product
            chai
              .request(app)
              .put("/api/products")
              .send({
                _id: _id,
                name: u_name,
                price: u_price,
                quantity: u_quantity,
                isListed: u_isListed,
              })
              .end((err: any, res: any) => {
                res.should.have.status(200);
                const { name, price, quantity, isListed } = res.body;
                chai.assert.equal(name, u_name);
                chai.assert.equal(price, u_price);
                chai.assert.equal(quantity, u_quantity);
                chai.assert.equal(isListed, u_isListed);
                done();
              });
          })
          .timeout(timeoutDuration);
      });
    });

    /**
     * Tests the POST /api/products and PUT /api/products route.
     * Expected to POST 2 products and then PUT the second one successfully.
     * Expected to return a 200 OK status code.
     */
    it("Successfully POST 2 Products then PUT 1 Product.", (done) => {
      Product.deleteMany({}, (err: any) => {
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
          .end((err: any, res: any) => {
            res.should.have.status(200);
            const { name, price, quantity, isListed } = res.body;
            chai.assert.equal(name, p_name);
            chai.assert.equal(price, p_price);
            chai.assert.equal(quantity, p_quantity);
            chai.assert.equal(isListed, p_isListed);
          })
          .timeout(timeoutDuration);

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
          .end((err: any, res: any) => {
            res.should.have.status(200);
            const { _id, name, price } = res.body;
            chai.assert.equal(name, p_name_2);
            chai.assert.equal(price, p_price_2);

            // There should be 2 Products
            Product.countDocuments({}, (err: any, count: number) => {
              chai.assert.equal(count, 2);
            });

            // Properties to update to
            const u_name = "Carrot";
            const u_price = 1.5;
            const u_quantity = 2;
            const u_isListed = false;

            // Update the product
            chai
              .request(app)
              .put("/api/products")
              .send({
                _id: _id,
                name: u_name,
                price: u_price,
                quantity: u_quantity,
                isListed: u_isListed,
              })
              .end((err: any, res: any) => {
                res.should.have.status(200);
                const { name, price, quantity, isListed } = res.body;
                chai.assert.equal(name, u_name);
                chai.assert.equal(price, u_price);
                chai.assert.equal(quantity, u_quantity);
                chai.assert.equal(isListed, u_isListed);
                done();
              });
          })
          .timeout(timeoutDuration);
      });
    });
  });
});
