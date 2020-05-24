import express, { Request, Response, NextFunction } from "express";
const { isEqual, pick } = require("lodash");
const ProductService = require("../services/ProductService");

module.exports = (app: express.Application) => {
  /**
   * Returns all products in the collection.
   */
  app.get("/api/products", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await ProductService.findAll();
      res.send(products);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * Saves a product to the collection.
   */
  app.post("/api/products", async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Only pick out valid properties, discard the rest
      const properties = pick(
        req.body,
        "name",
        "price",
        "quantity",
        "isListed"
      );
      const product = await ProductService.saveOne(properties);
      res.send(product);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * Updates a product in the collection.
   * 0 to n properties can be specified for updating,
   * where n is the max number of properties the Product has
   * besides dateCreated and dateUpdated.
   */
  app.put("/api/products", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.body;

      // If _id is not supplied, short-circuit and return a ValidationError
      if (!_id) {
        let err = new Error("Missing parameter: '_id'.");
        err.name = "ValidationError";
        throw err;
      }

      // Only pick out valid properties, discard the rest
      const properties = pick(
        req.body,
        "name",
        "price",
        "quantity",
        "isListed"
      );
      const product = await ProductService.findByIdAndUpdate(_id, properties);
      res.send(product);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * Deletes a product in the collection.
   */
  app.delete("/api/products", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.body;

      // If _id is not supplied, short-circuit and return a ValidationError
      if (!_id) {
        let err = new Error("Missing parameter: '_id'.");
        err.name = "ValidationError";
        throw err;
      }

      const query = await ProductService.findByIdAndRemove(_id);
      res.send(query);
    } catch (err) {
      next(err);
    }
  });

  /**
   * Catch-all error handler for unexpected errors.
   */
  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // If validation or cast error, return 400 Bad Request
    if (
      isEqual(err.name, "ValidationError") ||
      isEqual(err.name, "CastError")
    ) {
      res.status(400).send(err);
    }

    res.status(500).send(err);
  });
};

export{};