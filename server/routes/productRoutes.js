const _ = require("lodash");
const ProductService = require("../services/ProductService");

module.exports = (app) => {
  // Gets all products
  app.get("/api/products", async (req, res, next) => {
    try {
      const products = await ProductService.findAll();
      res.send(products);
    } catch (err) {
      // Pass on unexpected error
      return next(err);
    }
  });

  // Saves a product
  app.post("/api/products", async (req, res, next) => {
    const { name, price, quantity, isListed } = req.body;

    try {
      const product = await ProductService.saveOne(
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

  // Updates a product
  app.put("/api/products", async (req, res, next) => {
    const { _id } = req.body;
    // Only pick out valid properties, discard the rest
    const properties = _.pick(req.body, "name", "price", "quantity", "isListed");

    try {
      const product = await ProductService.findByIdAndUpdate(_id, properties);
      res.send(product);
    } catch (err) {
      // If validation error, return 400 Bad Request
      if (_.isEqual(err.name, "ValidationError")) {
        return res.status(400).send(err);
      }

      // If fields are malformed, return 400 Bad Request
      if (_.isEqual(err.name, "CastError")) {
        return res.status(400).send(err);
      }

      // Pass on unexpected error
      return next(err);
    }
  });

  // Deletes a product
  app.delete("/api/products", async (req, res, next) => {
    const { _id } = req.body;

    try {
      const query = await ProductService.findByIdAndRemove(_id);
      res.send(query);
    } catch (err) {
      // If validation error, return 400 Bad Request
      if (_.isEqual(err.name, "ValidationError")) {
        return res.status(400).send(err);
      }

      // If _id is malformed, return 400 Bad Request
      if (_.isEqual(err.name, "CastError")) {
        return res.status(400).send(err);
      }

      // Pass on unexpected error
      return next(err);
    }
  });

  // Catch-all error handling
  app.use(function (err, req, res, next) {
    if (req.xhr) {
      res.status(500).send(err);
    } else {
      next(err);
    }
  });
};
