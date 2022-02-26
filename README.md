# mocha-chai-mongoose

![Node.js CI](https://github.com/DigiPie/mocha-chai-mongoose/workflows/Node.js%20CI/badge.svg)

## Introduction

An up-to-date 2021 example of how you can use Mocha and Chai to perform API testing for a Node-ExpressJS-Mongoose app. You will be able to test your code locally and also automatically using Github Action. 

## Project

### Setup instructions

Read the [Test Guide](TEST_GUIDE.md) for instructions on how to perform local and automated testing.

### Test plan

In this project:

- `test/productRoutes.test.ts` contains unit and integration tests for `src/routes/productRoutes.ts`.
- `src/routes/productRoutes.ts` contains routes which interact with `src/services/ProductService.ts`.
- `src/services/ProductService.ts` contains service methods which interact with `src/models/Product.ts`.

View the [Test Plan](TEST_PLAN.md) for more information.

### Releases

**Stable release:** [`v0.1.3`](https://github.com/DigiPie/mocha-chai-mongoose/releases)

- Implementation of `GET`, `POST`, `PUT` and `DELETE` routes
- 16 unit test cases testing the API routes individually
- 6 integration test cases testing route pairs (e.g. `GET` and `PUT`)

**Current release:** [`v0.1.3`](https://github.com/DigiPie/mocha-chai-mongoose/releases)

This project will not be frequently worked on beyond [`v0.1.0`](https://github.com/DigiPie/mocha-chai-mongoose/releases).

### Contributing

If you have any suggestions, bugs to report or would like to contribute to this project, feel free to create an [Issue](https://github.com/DigiPie/mocha-chai-mongoose/issues) or [Pull Request](https://github.com/DigiPie/mocha-chai-mongoose/pulls).

## Background info

### What is [Mongoose](https://mongoosejs.com/)

MongooseJS provides a straight-forward solution to modeling your NodeJS application data easily in MongoDB. It handles all MongoDB validation, casting and business logic on your behalf.

### What is [Mocha](https://mochajs.org/)

Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser. It is the test environment of choice for this project.

### What is [Chai](https://www.chaijs.com/)

Chai is an assertion library for Node. Chai assertions and `chai-http` are used in Mocha to perform HTTP testing of the NodeJS API endpoints.
