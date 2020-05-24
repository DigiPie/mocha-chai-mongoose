# mocha-chai-mongoose

## Test Plan

This test plan details how the `mocha-chai-mongoose` backend server API is tested.

In this project:

- `test/productRoutes.test.ts` contains unit and integration tests for `src/routes/productRoutes.ts`.
- `src/routes/productRoutes.ts` contains routes which interact with `src/services/ProductService.ts`.
- `src/services/ProductService.ts` contains service methods which interact with `src/models/Product.ts`.

Test cases:

- Unit test cases are written for all routes implemented in `productRoutes.ts`.
    - For unit test cases for `GET`, `PUT` and `DELETE` which require having an existing product in the collection, the product is saved directly via the Product Mongoose model.
- Integration test cases which test pairs of routes together are also written (e.g. `GET` and `POST`).

### Test cases

|Number|Suite          |Test case                                                                  |
|-----:|---------------|---------------------------------------------------------------------------|
|1     |GET            |Successfully GET an empty array of 0 Products.                             |
|2     |GET            |Successfully GET an empty array of 1 Product.                              |
|3     |POST           |Successfully POST 1 Product with all parameters specified.                 |
|4     |POST           |Successfully POST 1 Product with only required parameters specified.       |
|5     |POST           |Fail to POST 1 Product because all parameters are missing.                 |
|6     |POST           |Fail to POST 1 Product because 'name' parameter is missing.                |
|7     |POST           |Fail to POST 1 Product because 'price' parameter is missing.               |
|8     |PUT            |Successfully PUT 1 Product with all parameters specified.                  |
|9     |PUT            |Successfully PUT 1 Product with only one parameter specified besides '_id'.|
|10    |PUT            |Successfully PUT 1 Product with no parameters specified.                   |
|11    |PUT            |Successfully PUT 1 Product with valid and non-valid parameters specified.  |
|12    |PUT            |Fail to PUT 1 Product because '_id' is missing.                            |
|13    |PUT            |Fail to PUT 1 Product because '_id' is malformed.                          |
|14    |DELETE         |Successfully DELETE 1 Product.                                             |
|15    |DELETE         |Fail to DELETE 1 Product because '_id' is missing.                         |
|16    |DELETE         |Fail to DELETE 1 Product because '_id' is malformed.                       |
|17    |GET and POST   |Successfully GET an array of 1 Product added by POST.                      |
|18    |GET and POST   |Successfully GET an array of 2 Products added by POST.                     |
|19    |POST and DELETE|Successfully POST 1 Product then DELETE 1 Product.                         |
|20    |POST and DELETE|Successfully POST 2 Products then DELETE 1 Product.                        |
|21    |POST and PUT   |Successfully POST 1 Product then PUT 1 Product.                            |
|22    |POST and PUT   |Successfully POST 2 Products then PUT 1 Product.                           |