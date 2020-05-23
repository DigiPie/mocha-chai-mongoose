"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = "test";
var find = require("lodash").find;
var mongoose = require("mongoose");
require("../src/models/Product");
var Product = mongoose.model("products");
var chai = require("chai");
var should = chai.should().should;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var chaiHttp = require("chai-http");
chai.use(chaiHttp);
var app = require("../src/index");
var timeoutDuration = 3000;
describe("products", function () {
    // Empty database before all test cases are executed.
    before(function (done) {
        Product.deleteMany({}, function (err) {
            done();
        });
    });
    // Empty database after all test cases are executed.
    after(function (done) {
        Product.deleteMany({}, function (err) {
            done();
        });
    });
    // Unit tests //
    /**
     * Unit test suite for the GET /api/products route.
     */
    describe("GET /api/products", function () {
        /**
         * Tests the GET /api/products route.
         * Expected to return an empty array since no Products have been added yet.
         * Expected to return a 200 OK status code.
         */
        it("Successfully GET an empty array of 0 Products.", function (done) {
            Product.deleteMany({}, function (err) {
                chai
                    .request(app)
                    .get("/api/products")
                    .end(function (err, res) {
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
        it("Successfully GET an empty array of 1 product.", function (done) {
            Product.deleteMany({}, function (err) {
                var p_name = "Apple";
                var p_price = 1.0;
                var date = Date.now();
                var product = new Product({
                    name: p_name,
                    price: p_price,
                    dateCreated: date,
                    dateUpdated: date,
                });
                product.save({}, function (err) {
                    chai
                        .request(app)
                        .get("/api/products")
                        .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a("array");
                        res.body.length.should.be.eql(1);
                        var _a = res.body[0], name = _a.name, price = _a.price;
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
    describe("POST /api/products", function () {
        /**
         * Tests the POST /api/products route with all product parameters specified.
         * Expected to return the added product retrieved from the product collection.
         * Expected to return a 200 OK status code.
         */
        it("Successfully POST 1 Product with all parameters specified.", function (done) {
            var p_name = "Apple";
            var p_price = 1.0;
            var p_quantity = 1;
            var p_isListed = true;
            chai
                .request(app)
                .post("/api/products")
                .send({
                name: p_name,
                price: p_price,
                quantity: p_quantity,
                isListed: p_isListed,
            })
                .end(function (err, res) {
                res.should.have.status(200);
                var _a = res.body, name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed;
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
        it("Successfully POST 1 Product with only required parameters specified.", function (done) {
            var p_name = "Apple";
            var p_price = 1.0;
            chai
                .request(app)
                .post("/api/products")
                .send({
                name: p_name,
                price: p_price,
            })
                .end(function (err, res) {
                res.should.have.status(200);
                var _a = res.body, name = _a.name, price = _a.price;
                chai.assert.equal(name, p_name);
                chai.assert.equal(price, p_price);
                done();
            })
                .timeout(timeoutDuration);
        });
        /**
         * Tests the POST /api/products route with all product parameters missing.
         * Expected to return a ValidationError.
         * Expected to return a 400 Bad Request status code.
         */
        it("Fail to POST 1 Product because all parameters are missing.", function (done) {
            chai
                .request(app)
                .post("/api/products")
                .end(function (err, res) {
                res.should.have.status(400);
                chai.assert.equal(res.body.name, "ValidationError");
                done();
            })
                .timeout(timeoutDuration);
        });
        /**
         * Tests the POST /api/products route with required parameter 'name' missing.
         * Expected to return a ValidationError.
         * Expected to return a 400 Bad Request status code.
         */
        it("Fail to POST 1 Product because 'name' parameter is missing.", function (done) {
            var p_price = 1.0;
            chai
                .request(app)
                .post("/api/products")
                .send({
                price: p_price,
            })
                .end(function (err, res) {
                res.should.have.status(400);
                chai.assert.equal(res.body.name, "ValidationError");
                done();
            })
                .timeout(timeoutDuration);
        });
        /**
         * Tests the POST /api/products route with required parameter 'price' missing.
         * Expected to return a ValidationError.
         * Expected to return a 400 Bad Request status code.
         */
        it("Fail to POST 1 Product because 'price' parameter is missing.", function (done) {
            var p_name = "Apple";
            chai
                .request(app)
                .post("/api/products")
                .send({
                name: p_name,
            })
                .end(function (err, res) {
                res.should.have.status(400);
                chai.assert.equal(res.body.name, "ValidationError");
                done();
            })
                .timeout(timeoutDuration);
        });
    });
    /**
     * Unit test suite for the PUT /api/products route.
     */
    describe("PUT /api/products", function () {
        /**
         * Tests the PUT /api/products route with all product parameters specified.
         * Expected to return the updated product retrieved from the product collection.
         * Expected to return a 200 OK status code.
         */
        it("Successfully PUT 1 Product with all parameters specified.", function (done) {
            Product.deleteMany({}, function (err) {
                var p_name = "Apple";
                var p_price = 1.0;
                var p_quantity = 1;
                var p_isListed = true;
                var date = Date.now();
                var product = new Product({
                    name: p_name,
                    price: p_price,
                    quantity: p_quantity,
                    isListed: p_isListed,
                    dateCreated: date,
                    dateUpdated: date,
                });
                product.save({}, function (err) {
                    // Retrieve the saved document's Mongoose ID
                    var _id = product._id;
                    chai.assert.isNotNull(_id);
                    // Properties to update to
                    var u_name = "Banana";
                    var u_price = 1.5;
                    var u_quantity = 2;
                    var u_isListed = false;
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
                        .end(function (err, res) {
                        res.should.have.status(200);
                        var _a = res.body, name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed;
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
        it("Successfully PUT 1 Product with only one parameter specified besides '_id'.", function (done) {
            Product.deleteMany({}, function (err) {
                var p_name = "Apple";
                var p_price = 1.0;
                var p_quantity = 1;
                var p_isListed = true;
                var date = Date.now();
                var product = new Product({
                    name: p_name,
                    price: p_price,
                    quantity: p_quantity,
                    isListed: p_isListed,
                    dateCreated: date,
                    dateUpdated: date,
                });
                product.save({}, function (err) {
                    // Retrieve the saved document's Mongoose ID
                    var _id = product._id;
                    chai.assert.isNotNull(_id);
                    // Properties to update to
                    var u_name = "Carrot";
                    chai
                        .request(app)
                        .put("/api/products")
                        .send({
                        _id: _id,
                        name: u_name,
                    })
                        .end(function (err, res) {
                        res.should.have.status(200);
                        var _a = res.body, name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed;
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
        it("Successfully PUT 1 Product with no parameters specified.", function (done) {
            Product.deleteMany({}, function (err) {
                var p_name = "Apple";
                var p_price = 1.0;
                var p_quantity = 0;
                var p_isListed = false;
                var date = Date.now();
                var product = new Product({
                    name: p_name,
                    price: p_price,
                    quantity: p_quantity,
                    isListed: p_isListed,
                    dateCreated: date,
                    dateUpdated: date,
                });
                product.save({}, function (err) {
                    // Retrieve the saved document's Mongoose ID
                    var _id = product._id;
                    chai.assert.isNotNull(_id);
                    chai
                        .request(app)
                        .put("/api/products")
                        .send({
                        _id: _id,
                    })
                        .end(function (err, res) {
                        res.should.have.status(200);
                        var _a = res.body, name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed;
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
        it("Successfully PUT 1 Product with valid and non-valid parameters specified.", function (done) {
            Product.deleteMany({}, function (err) {
                var p_name = "Carrot Cake";
                var p_price = 1.0;
                var p_quantity = 50;
                var p_isListed = true;
                var date = Date.now();
                var product = new Product({
                    name: p_name,
                    price: p_price,
                    quantity: p_quantity,
                    isListed: p_isListed,
                    dateCreated: date,
                    dateUpdated: date,
                });
                product.save({}, function (err) {
                    // Retrieve the saved document's Mongoose ID
                    var _id = product._id;
                    chai.assert.isNotNull(_id);
                    // Properties to update to
                    var u_name = "Carrot";
                    var u_isListed = false;
                    var i_age = 20; // Invalid property which should be ignored
                    chai
                        .request(app)
                        .put("/api/products")
                        .send({
                        _id: _id,
                        name: u_name,
                        isListed: u_isListed,
                        age: i_age,
                    })
                        .end(function (err, res) {
                        res.should.have.status(200);
                        var _a = res.body, name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed, age = _a.age;
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
         * Expected to return a ValidationError.
         * Expected to return a 400 Bad Request status code.
         */
        it("Fail to PUT 1 Product because '_id' is missing.", function (done) {
            Product.deleteMany({}, function (err) {
                var p_name = "Apple";
                var p_price = 1.0;
                var p_quantity = 0;
                var p_isListed = false;
                var date = Date.now();
                var product = new Product({
                    name: p_name,
                    price: p_price,
                    quantity: p_quantity,
                    isListed: p_isListed,
                    dateCreated: date,
                    dateUpdated: date,
                });
                product.save({}, function (err) {
                    chai
                        .request(app)
                        .put("/api/products")
                        .end(function (err, res) {
                        res.should.have.status(400);
                        chai.assert.equal(res.body.name, "ValidationError");
                        done();
                    })
                        .timeout(timeoutDuration);
                });
            });
        });
        /**
         * Tests the PUT /api/products route with required parameter '_id' being malformed.
         * Expected to not update the product added via the Mongoose model directly.
         * Expected to return a CastError.
         * Expected to return a 400 Bad Request status code.
         */
        it("Fail to PUT 1 Product because '_id' is malformed.", function (done) {
            Product.deleteMany({}, function (err) {
                var p_name = "Apple";
                var p_price = 1.0;
                var date = Date.now();
                var product = new Product({
                    name: p_name,
                    price: p_price,
                    dateCreated: date,
                    dateUpdated: date,
                });
                product.save({}, function (err) {
                    chai
                        .request(app)
                        .put("/api/products")
                        .send({ _id: "Banana" })
                        .end(function (err, res) {
                        res.should.have.status(400);
                        chai.assert.equal(res.body.name, "CastError");
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
    describe("DELETE /api/products", function () {
        /**
         * Tests the DELETE /api/products route.
         * Expected to delete the product added via the Mongoose model directly.
         * Expected to return a 200 OK status code.
         */
        it("Successfully DELETE 1 Product.", function (done) {
            Product.deleteMany({}, function (err) {
                var p_name = "Apple";
                var p_price = 1.0;
                var date = Date.now();
                var product = new Product({
                    name: p_name,
                    price: p_price,
                    dateCreated: date,
                    dateUpdated: date,
                });
                product.save({}, function (err) {
                    // Retrieve the saved document's Mongoose ID
                    var _id = product._id;
                    chai.assert.isNotNull(_id);
                    // There should be 1 product in the Collection
                    Product.countDocuments({}, function (err, count) {
                        chai.assert.equal(count, 1);
                    });
                    chai
                        .request(app)
                        .delete("/api/products")
                        .send({ _id: _id })
                        .end(function (err, res) {
                        res.should.have.status(200);
                        // There should be 0 Products in the Collection after deletion
                        Product.countDocuments({}, function (err, count) {
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
         * Expected to return a ValidationError.
         * Expected to return a 400 Bad Request status code.
         */
        it("Fail to DELETE 1 Product because '_id' is missing.", function (done) {
            Product.deleteMany({}, function (err) {
                var p_name = "Apple";
                var p_price = 1.0;
                var date = Date.now();
                var product = new Product({
                    name: p_name,
                    price: p_price,
                    dateCreated: date,
                    dateUpdated: date,
                });
                product.save({}, function (err) {
                    // Retrieve the saved document's Mongoose ID
                    var _id = product._id;
                    chai.assert.isNotNull(_id);
                    // There should be 1 product in the Collection
                    Product.countDocuments({}, function (err, count) {
                        chai.assert.equal(count, 1);
                    });
                    chai
                        .request(app)
                        .delete("/api/products")
                        .end(function (err, res) {
                        res.should.have.status(400);
                        chai.assert.equal(res.body.name, "ValidationError");
                        // There should still be 1 product in the Collection
                        Product.countDocuments({}, function (err, count) {
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
         * Expected to return a CastError.
         * Expected to return a 400 Bad Request status code.
         */
        it("Fail to DELETE 1 Product because '_id' is malformed.", function (done) {
            Product.deleteMany({}, function (err) {
                var p_name = "Apple";
                var p_price = 1.0;
                var date = Date.now();
                var product = new Product({
                    name: p_name,
                    price: p_price,
                    dateCreated: date,
                    dateUpdated: date,
                });
                product.save({}, function (err) {
                    // There should be 1 product in the Collection
                    Product.countDocuments({}, function (err, count) {
                        chai.assert.equal(count, 1);
                    });
                    chai
                        .request(app)
                        .delete("/api/products")
                        .send({ _id: "Banana" })
                        .end(function (err, res) {
                        res.should.have.status(400);
                        chai.assert.equal(res.body.name, "CastError");
                        // There should still be 1 product in the Collection
                        Product.countDocuments({}, function (err, count) {
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
    describe("GET and POST /api/products", function () {
        /**
         * Tests the POST /api/products and GET /api/products route.
         * Expected to return an array of 1 product added by POST.
         * Expected to return a 200 OK status code.
         */
        it("Successfully GET an array of 1 Product added by POST.", function (done) {
            Product.deleteMany({}, function (err) {
                var p_name = "Apple";
                var p_price = 1.0;
                var p_quantity = 1;
                var p_isListed = false;
                chai
                    .request(app)
                    .post("/api/products")
                    .send({
                    name: p_name,
                    price: p_price,
                    quantity: p_quantity,
                    isListed: p_isListed,
                })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    var _a = res.body, name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed;
                    chai.assert.equal(name, p_name);
                    chai.assert.equal(price, p_price);
                    chai.assert.equal(quantity, p_quantity);
                    chai.assert.equal(isListed, p_isListed);
                })
                    .timeout(timeoutDuration);
                chai
                    .request(app)
                    .get("/api/products")
                    .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(1);
                    var _a = res.body[0], name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed;
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
        it("Successfully GET an array of 2 Products added by POST.", function (done) {
            Product.deleteMany({}, function (err) {
                // Add 1st product
                var p_name = "Apple";
                var p_price = 1.0;
                var p_quantity = 1;
                var p_isListed = false;
                chai
                    .request(app)
                    .post("/api/products")
                    .send({
                    name: p_name,
                    price: p_price,
                    quantity: p_quantity,
                    isListed: p_isListed,
                })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    var _a = res.body, name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed;
                    chai.assert.equal(name, p_name);
                    chai.assert.equal(price, p_price);
                    chai.assert.equal(quantity, p_quantity);
                    chai.assert.equal(isListed, p_isListed);
                })
                    .timeout(timeoutDuration);
                // Add 2nd product
                var p_name_2 = "Banana";
                var p_price_2 = 15;
                chai
                    .request(app)
                    .post("/api/products")
                    .send({
                    name: p_name_2,
                    price: p_price_2,
                })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    var _a = res.body, name = _a.name, price = _a.price;
                    chai.assert.equal(name, p_name_2);
                    chai.assert.equal(price, p_price_2);
                })
                    .timeout(timeoutDuration);
                // GET the 2 added products
                chai
                    .request(app)
                    .get("/api/products")
                    .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(2);
                    var product_1 = find(res.body, ["name", p_name]);
                    var name = product_1.name, price = product_1.price, quantity = product_1.quantity, isListed = product_1.isListed;
                    chai.assert.equal(name, p_name);
                    chai.assert.equal(price, p_price);
                    chai.assert.equal(quantity, p_quantity);
                    chai.assert.equal(isListed, p_isListed);
                    var product_2 = find(res.body, ["name", p_name_2]);
                    var name_2 = product_2.name, price_2 = product_2.price;
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
    describe("POST and DELETE /api/products", function () {
        /**
         * Tests the POST /api/products and DELETE /api/products route.
         * Expected to POST a product and then DELETE it successfully.
         * Expected to return a 200 OK status code.
         */
        it("Successfully POST 1 Product then DELETE 1 Product.", function (done) {
            Product.deleteMany({}, function (err) {
                // Add the product
                var p_name = "Apple";
                var p_price = 1.0;
                var p_quantity = 1;
                var p_isListed = false;
                chai
                    .request(app)
                    .post("/api/products")
                    .send({
                    name: p_name,
                    price: p_price,
                    quantity: p_quantity,
                    isListed: p_isListed,
                })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    var _a = res.body, _id = _a._id, name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed;
                    chai.assert.equal(name, p_name);
                    chai.assert.equal(price, p_price);
                    chai.assert.equal(quantity, p_quantity);
                    chai.assert.equal(isListed, p_isListed);
                    // Delete the product
                    chai
                        .request(app)
                        .delete("/api/products")
                        .send({ _id: _id })
                        .end(function (err, res) {
                        res.should.have.status(200);
                        // There should be 0 Products in the Collection after deletion
                        Product.countDocuments({}, function (err, count) {
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
        it("Successfully POST 2 Products then DELETE 1 Product.", function (done) {
            Product.deleteMany({}, function (err) {
                // Add 1st product
                var p_name = "Apple";
                var p_price = 1.0;
                var p_quantity = 1;
                var p_isListed = false;
                chai
                    .request(app)
                    .post("/api/products")
                    .send({
                    name: p_name,
                    price: p_price,
                    quantity: p_quantity,
                    isListed: p_isListed,
                })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    var _a = res.body, name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed;
                    chai.assert.equal(name, p_name);
                    chai.assert.equal(price, p_price);
                    chai.assert.equal(quantity, p_quantity);
                    chai.assert.equal(isListed, p_isListed);
                })
                    .timeout(timeoutDuration);
                // Add 2nd product
                var p_name_2 = "Banana";
                var p_price_2 = 15;
                chai
                    .request(app)
                    .post("/api/products")
                    .send({
                    name: p_name_2,
                    price: p_price_2,
                })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    var _a = res.body, _id = _a._id, name = _a.name, price = _a.price;
                    chai.assert.equal(name, p_name_2);
                    chai.assert.equal(price, p_price_2);
                    // There should be 2 Products
                    Product.countDocuments({}, function (err, count) {
                        chai.assert.equal(count, 2);
                    });
                    // Delete the product
                    chai
                        .request(app)
                        .delete("/api/products")
                        .send({ _id: _id })
                        .end(function (err, res) {
                        res.should.have.status(200);
                        // There should be 1 Product left
                        Product.countDocuments({}, function (err, count) {
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
    describe("POST and PUT /api/products", function () {
        /**
         * Tests the POST /api/products and PUT /api/products route.
         * Expected to POST a product and then PUT it successfully.
         * Expected to return a 200 OK status code.
         */
        it("Successfully POST 1 Product then PUT 1 Product.", function (done) {
            Product.deleteMany({}, function (err) {
                // Add the product
                var p_name = "Apple";
                var p_price = 1.0;
                var p_quantity = 1;
                var p_isListed = false;
                chai
                    .request(app)
                    .post("/api/products")
                    .send({
                    name: p_name,
                    price: p_price,
                    quantity: p_quantity,
                    isListed: p_isListed,
                })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    var _a = res.body, _id = _a._id, name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed;
                    chai.assert.equal(name, p_name);
                    chai.assert.equal(price, p_price);
                    chai.assert.equal(quantity, p_quantity);
                    chai.assert.equal(isListed, p_isListed);
                    // Properties to update to
                    var u_name = "Banana";
                    var u_price = 1.5;
                    var u_quantity = 2;
                    var u_isListed = false;
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
                        .end(function (err, res) {
                        res.should.have.status(200);
                        var _a = res.body, name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed;
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
        it("Successfully POST 2 Products then PUT 1 Product.", function (done) {
            Product.deleteMany({}, function (err) {
                // Add 1st product
                var p_name = "Apple";
                var p_price = 1.0;
                var p_quantity = 1;
                var p_isListed = false;
                chai
                    .request(app)
                    .post("/api/products")
                    .send({
                    name: p_name,
                    price: p_price,
                    quantity: p_quantity,
                    isListed: p_isListed,
                })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    var _a = res.body, name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed;
                    chai.assert.equal(name, p_name);
                    chai.assert.equal(price, p_price);
                    chai.assert.equal(quantity, p_quantity);
                    chai.assert.equal(isListed, p_isListed);
                })
                    .timeout(timeoutDuration);
                // Add 2nd product
                var p_name_2 = "Banana";
                var p_price_2 = 15;
                chai
                    .request(app)
                    .post("/api/products")
                    .send({
                    name: p_name_2,
                    price: p_price_2,
                })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    var _a = res.body, _id = _a._id, name = _a.name, price = _a.price;
                    chai.assert.equal(name, p_name_2);
                    chai.assert.equal(price, p_price_2);
                    // There should be 2 Products
                    Product.countDocuments({}, function (err, count) {
                        chai.assert.equal(count, 2);
                    });
                    // Properties to update to
                    var u_name = "Carrot";
                    var u_price = 1.5;
                    var u_quantity = 2;
                    var u_isListed = false;
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
                        .end(function (err, res) {
                        res.should.have.status(200);
                        var _a = res.body, name = _a.name, price = _a.price, quantity = _a.quantity, isListed = _a.isListed;
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
