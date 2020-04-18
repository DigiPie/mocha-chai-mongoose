const _ = require("lodash");
const mongoose = require("mongoose");
const Product = mongoose.model("products");

class ProductService {
  // Returns a Promise which finds all documents in the Collection
  static findAll() {
    return Product.find();
  }

  // Returns a Promise which saves one document to the Collection
  static saveOne(name, price, quantity, isListed) {
    const date = Date.now();

    const product = new Product({
      name,
      price,
      quantity,
      isListed,
      dateCreated: date,
      dateUpdated: date,
    });

    return product.save();
  }

  // Returns a Promise which updates one document in the Collection
  static findByIdAndUpdate(_id, properties) {
    if (!_id) {
      let err = new Error("Missing parameter: '_id'.");
      err.name = "ValidationError";
      throw err;
    }

    // Only pick out valid properties, discard the rest
    properties = _.pick(properties, "name", "price", "quantity", "isListed");
    properties.dateUpdated = Date.now(); // Append dateUpdated
    
    return Product.findByIdAndUpdate(
      _id,
      properties,
      { new: true } // Return the new modified document rather than the original
    );
  }

  // Returns a Promise which deletes one document in the Collection
  static findByIdAndRemove(_id) {
    if (!_id) {
      let err = new Error("Missing parameter: '_id'.");
      err.name = "ValidationError";
      throw err;
    }

    return Product.findByIdAndRemove(_id);
  }
}

module.exports = ProductService;
