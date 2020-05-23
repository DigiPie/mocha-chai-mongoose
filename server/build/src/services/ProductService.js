var pick = require("lodash").pick;
var mongoose = require("mongoose");
var Product = mongoose.model("products");
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    /**
     * Returns a Promise which finds all documents in the Collection.
     */
    ProductService.findAll = function () {
        return Product.find();
    };
    /**
     * Returns a Promise which saves one document to the Collection.
     */
    ProductService.saveOne = function (properties) {
        var date = Date.now();
        // Only pick out valid properties, discard the rest
        properties = pick(properties, "name", "price", "quantity", "isListed");
        properties.dateCreated = date; // Append dateUpdated
        properties.dateUpdated = date; // Append dateUpdated
        return new Product(properties).save(); // Return the saved document
    };
    /**
     * Returns a Promise which updates one document in the Collection.
     */
    ProductService.findByIdAndUpdate = function (_id, properties) {
        // If _id is not supplied, short-circuit and return a ValidationError
        if (!_id) {
            var err = new Error("Missing parameter: '_id'.");
            err.name = "ValidationError";
            throw err;
        }
        // Only pick out valid properties, discard the rest
        properties = pick(properties, "name", "price", "quantity", "isListed");
        properties.dateUpdated = Date.now(); // Append dateUpdated
        return Product.findByIdAndUpdate(_id, properties, { new: true } // Return the new modified document rather than the original
        );
    };
    /**
     * Returns a Promise which deletes one document in the Collection.
     */
    ProductService.findByIdAndRemove = function (_id) {
        // If _id is not supplied, short-circuit and return a ValidationError
        if (!_id) {
            var err = new Error("Missing parameter: '_id'.");
            err.name = "ValidationError";
            throw err;
        }
        return Product.findByIdAndRemove(_id);
    };
    return ProductService;
}());
module.exports = ProductService;
