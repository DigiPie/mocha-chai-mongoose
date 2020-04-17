# mocha-chai-mongoose

## Test Plan
This test plan details how the _mocha-chai-mongoose_ backend server API is tested.

In this project, a single test file: _test/productRoutes.test.js_ is used to test a single Express route: _routes/productRoutes.js_ which handles API calls pertaining to a single Mongoose model: _models/Product.js_.

Test cases:

- Unit test cases are written for all routes implemented in _productRoutes.js_.
    - For unit test cases written for `GET` and `DELETE` which require having an existing Product in the Product collection, the test case directly saves a new Product to the Product Mongoose model before testing.
- Integration test cases which test multiple routes together are also written.

### Test cases
|Number|Suite                     |Test case                                                           |
|-----:|--------------------------|--------------------------------------------------------------------|
|1     |GET /api/products         |Successfully GET an empty array of 0 Products.                      |
|2     |GET /api/products         |Successfully GET an empty array of 1 Product.                       |
|3     |POST /api/products        |Successfully POST 1 Product with all parameters specified.          |
|4     |POST /api/products        |Successfully POST 1 Product with only required parameters specified.|
|5     |POST /api/products        |Fail to POST 1 Product because all parameters are missing.          |
|6     |POST /api/products        |Fail to POST 1 Product because 'name' parameter is missing.         |
|7     |POST /api/products        |Fail to POST 1 Product because 'price' parameter is missing.        |
|8     |DELETE /api/products      |Successfully DELETE 1 Product.                                      |
|9     |DELETE /api/products      |Fail to DELETE 1 Product because '_id' is missing.                  |
|10    |DELETE /api/products      |Fail to DELETE 1 Product because '_id' is malformed.                |
|11    |GET and POST /api/products|Successfully GET an array of 1 Product added by POST.               |
|12    |GET and POST /api/products|Successfully GET an array of 2 Products added by POST.              |
|13    |POST and DELETE /api/products|Successfully POST 1 Product then DELETE 1 Product.               |
|14    |POST and DELETE /api/products|Successfully POST 2 Products then DELETE 1 Product.              |
