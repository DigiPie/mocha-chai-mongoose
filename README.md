# mocha-chai-mongoose

## Introduction

![Node.js CI](https://github.com/DigiPie/mocha-chai-mongoose/workflows/Node.js%20CI/badge.svg)

An up-to-date 2020 example of how you can use Mocha and Chai to perform API testing for a Node-ExpressJS-Mongoose app. 

### Local testing and online automated testing

You will be able to test your code **locally** and also automatically when you push your code to Github, using **Github Action**. 

### Built for easy deployment

Furthermore, the code is set up such that it will automatically switch to Production Keys rather than Development Keys on deployment.

## Project

### Status

The current plan is to implement `GET`, `POST`, `PUT` and `DELETE` routes and their unit and integration test cases by [`v0.1.0`](https://github.com/DigiPie/mocha-chai-mongoose/milestone/1). The current version is [`v0.0.8`](https://github.com/DigiPie/mocha-chai-mongoose/releases).

View the [Project Board](https://github.com/DigiPie/mocha-chai-mongoose/projects/1) for more information.

### Setup instructions

View the [Test Guide](TEST_GUIDE.md) for instructions on how to perform local testing and automated testing via Github Action for this project.

### Test plan

In this project:

- `test/productRoutes.test.js` contains unit and integration tests for `routes/productRoutes.js`.
- `routes/productRoutes.js` contains routes which interact with `services/ProductService.js`.
- `services/ProductService.js` contains controller methods which interact with `models/Product.js`.

View the [Test Plan](TEST_PLAN.md) for more information on how testing was performed.

## Background info

### What is [Mongoose](https://mongoosejs.com/)

MongooseJS provides a straight-forward solution to modeling your NodeJS application data easily in MongoDB. It handles all MongoDB validation, casting and business logic on your behalf.

### What is [Mocha](https://mochajs.org/)

Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser. It is our test environment of choice for this project.

### What is [Chai](https://www.chaijs.com/)

Chai is an assertion library for Node. We use Chai assertions and `chai-http` in Mocha to perform HTTP testing of our NodeJS API endpoints.
