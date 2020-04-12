const mongoose = require("mongoose");
const Product = mongoose.model("products");

class ProductService {
  // Returns a Promise which finds all documents in the Collection
  static getAll() {
    return Product.find();
  }

  // Returns a Promise which adds one document to the Collection
  static addOne(name, price, quantity, isListed) {
    const product = new Product({
      name,
      price,
      quantity,
      isListed,
      dateCreated: Date.now(),
    });

    return product.save();
  }
}

module.exports = ProductService;
