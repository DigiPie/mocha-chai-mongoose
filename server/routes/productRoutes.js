const mongoose = require("mongoose");
const Product = mongoose.model("products");

module.exports = (app) => {
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
      dateCreated: Date.now(),
    });

    try {
      await product.save();
      res.send(product);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // Delete a product
  app.delete("/api/products", async (req, res) => {
    const { _id } = req.body;

    try {
      const query = await Product.findByIdAndRemove(_id);

      // If query fails, a null query is returned
      if (!query) {
        throw new Error();
      }

      res.send(query);
    } catch (err) {
      res.status(500).send(err);
    }
  });
};
