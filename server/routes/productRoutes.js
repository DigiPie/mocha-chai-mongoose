const mongoose = require("mongoose");
const Product = mongoose.model("products");

module.exports = app => {
  // Get all products
  app.get("/api/products", async (req, res) => {
    const products = await Product.find();
    res.send(products);
  });

  // Add a product
  app.post("/api/products", async (req, res) => {
    const { name, price, quantity, isListed } = req.body;

    const product = new Product({
      name,
      price,
      quantity,
      isListed,
      dateCreated: Date.now()
    });
    
    try {
      await product.save();
      res.send(product);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
