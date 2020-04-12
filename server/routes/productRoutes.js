const _ = require("lodash");
const ProductService = require("../services/ProductService");

module.exports = (app) => {
  // Get all products
  app.get("/api/products", async (req, res, next) => {
    try {
      const products = await ProductService.getAll();
      res.send(products);
    } catch (err) {
      // Pass on unexpected error
      return next(err);
    }
  });

  // Add a product
  app.post("/api/products", async (req, res, next) => {
    const { name, price, quantity, isListed } = req.body;

    try {
      const product = await ProductService.addOne(
        name,
        price,
        quantity,
        isListed
      );
      res.send(product);
    } catch (err) {
      // If validation error, return 400 Bad Request
      if (_.isEqual(err.name, "ValidationError")) {
        return res.status(400).send(err);
      }

      // Pass on unexpected error
      return next(err);
    }
  });

  // Delete a product
  app.delete("/api/products", async (req, res, next) => {
    const { _id } = req.body;

    try {
      const query = await Product.findByIdAndRemove(_id);

      res.send(query);
    } catch (err) {
      // If validation error, return 400 Bad Request

      if (_.isEqual(err.name, "ReferenceError")) {
        return res.status(400).send(err);
      }

      // Pass on unexpected error
      return next(err);
    }
  });

  // Error handling
  app.use(function (err, req, res, next) {
    if (req.xhr) {
      res.status(500).send(err);
    } else {
      next(err);
    }
  });
};
