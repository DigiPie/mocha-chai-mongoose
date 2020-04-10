# mocha-chai-mongoose

## Test Plan
This test plan details how the _mocha-chai-mongoose_ backend server API is tested.

In this project, a single test file: _test/productRoutes.test.js_ is used to test a single Express route: _routes/productRoutes.js_ which handles API calls pertaining to a single Mongoose model: _models/Product.js_.

Test cases:

- Unit test cases are written for all routes implemented in _productRoutes.js_.
    - For unit test cases written for `GET` which require having an existing Product in the Product collection, the test case directly saves a new Product to the Product Mongoose model before testing.
- Integration test cases which test multiple routes together are also written.

### Test cases
|   | Type        | Suite                                          | Test case                                                           |
|--:|-------------|------------------------------------------------|---------------------------------------------------------------------|
| 1 | U        | GET /api/products                              | Successfully GET an empty array of 0 Products.                      |
| 2 | U        | GET /api/products                              | Successfully GET an empty array of 1 Product.                       |
| 3 | U        | POST /api/products                             | Successfully add a Product with all parameters specified.           |
| 4 | U        | POST /api/products                             | Successfully add a Product with only required parameters specified. |
| 5 | U        | POST /api/products                             | Fail to add a Product because all parameters are missing.           |
| 6 | U        | POST /api/products                             | Fail to add a Product because 'name' parameter is missing.          |
| 7 | U        | POST /api/products                             | Fail to add a Product because 'price' parameter is missing.         |
| 8 | I | GET /api/products and POST /api/products | Successfully GET an array of 1 Product added by POST.               |
| 9 | I | GET /api/products and POST /api/products | Successfully GET an array of 2 Products added by POST.              |
