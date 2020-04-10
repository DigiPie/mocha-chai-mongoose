# mocha-chai-mongoose

## Test Plan
This test plan details how the _mocha-chai-mongoose_ backend server API is tested.

In this project, a single test file: _test/productRoutes.test.js_ is used to test a single Express route: _routes/productRoutes.js_ which handles API calls pertaining to a single Mongoose model: _models/Product.js_.

Test cases:

- Unit test cases are written for all routes implemented in _productRoutes.js_.
- Integration test cases which test multiple routes together are also written.

### Test cases
|   | Type        | Suite                                      | Test case                                                           |
|--:|-------------|--------------------------------------------|---------------------------------------------------------------------|
| 1 | Unit        | GET /api/products                          | Successfully GET an empty array of 0 products.                      |
| 2 | Unit        | POST /api/products                         | Successfully add a Product with all parameters specified.           |
| 3 | Unit        | POST /api/products                         | Successfully add a Product with only required parameters specified. |
| 4 | Unit        | POST /api/products                         | Fail to add a Product because all parameters are missing.           |
| 5 | Unit        | POST /api/products                         | Fail to add a Product because 'name' parameter is missing.          |
| 6 | Unit        | POST /api/products                         | Fail to add a Product because 'price' parameter is missing.         |
| 7 | Integration | GET /api/products &amp; POST /api/products | Successfully GET an array of 1 product added by POST.               |
| 8 | Integration | GET /api/products &amp; POST /api/products | Successfully GET an array of 2 products added by POST.              |