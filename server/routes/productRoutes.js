const mongoose = require("mongoose");
const Product = mongoose.model("products");

module.exports = app => {
  // Get all products
  app.get("/api/products", async (req, res) => {
    const products = await Product.find();
    res.send(products);
  });
};
