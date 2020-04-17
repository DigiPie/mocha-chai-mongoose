const mongoose = require("mongoose");
const Product = mongoose.model("products");

class ProductService {
  // Returns a Promise which finds all documents in the Collection
  static findAll() {
    return Product.find();
  }

  // Returns a Promise which saves one document to the Collection
  static saveOne(name, price, quantity, isListed) {
    const product = new Product({
      name,
      price,
      quantity,
      isListed,
      dateCreated: Date.now(),
    });

    return product.save();
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
