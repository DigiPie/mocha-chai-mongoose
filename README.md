# mocha-chai-mongoose

## Introduction

![Node.js CI](https://github.com/DigiPie/mocha-chai-mongoose/workflows/Node.js%20CI/badge.svg)

An up-to-date 2020 example of how you can use Mocha and Chai to perform API testing for a Node-ExpressJS-Mongoose app. 

### Local testing and online automated testing
You will be able to test your code **locally** and also automatically when you push your code to Github, using **Github Action**. 

### Built for easy deployment
Furthermore, the code is set up such that it will automatically switch to Production Keys rather than Development Keys on deployment.

### Test suite

In this project:

- `test/productRoutes.test.js` contains unit and integration tests for `routes/productRoutes.js`.
- `routes/productRoutes.js` contains routes which interact with `services/ProductService.js`.
- `services/ProductService.js` contains controller methods which interact with `models/Product.js`.

View the [Test Plan](TEST_PLAN.md) for more information.

**Work-in-progress:** The current plan is to implement `GET`, `POST`, `PUT` and `DELETE` routes and their unit and integration test cases by [`v0.1.0`](https://github.com/DigiPie/mocha-chai-mongoose/milestone/1). The current version is `v0.0.7`.

View the [Project Board](https://github.com/DigiPie/mocha-chai-mongoose/projects/1) for more information.

## Local testing guide
To deploy this project locally for development purposes, follow the steps below.

### Downloads
To begin, first install and set up the following.

1. [Install MongoDB locally](https://digipie.github.io/digidocs/full-stack/mongodb/local-setup/), take note of your `mongoURI`. Alternatively, you can use [mLab](https://mlab.com/) instead.
2. [Install NodeJS](https://nodejs.org/en/).
3. Clone this repository (e.g. enter `git clone https://github.com/DigiPie/mocha-chai-mongoose.git` in your command-line terminal).

### Project setup
Next, set up the NodeJS application with the following steps.

1. Open the `server` sub-directory (folder) within the `mocha-chai-mongoose` folder you cloned (e.g. `cd server`).
2. Install the required packages (which are specified in `package.json`) by entering `npm install`.
3. Open `config/example_dev.js and fill in the `mongoURI` to your development MongoDB instance.

### Testing
Finally, you can execute the Mocha test suites under the test/ directory.

1. Check that you are in the server sub-directory.
2. Run this project on your local server by running `npm test` (check out the `scripts` section in package.json for more info).
4. To exit the test, press `CTRL + C`.

## Automated testing via Github action

Check out the Github Action workflow for this project: [nodejs.yml](https://github.com/DigiPie/mocha-chai-mongoose/blob/master/.github/workflows/nodejs.yml). This workflow performs automated testing via `npm test` each time you do a `git push` to your Github repo.

It uses:

- [actions/checkout](https://github.com/actions/checkout): to checkout this repo.
- [actions/setup-node](https://github.com/actions/setup-node): to setup specified node versions.
- [DigiPie/mongo-action](https://github.com/DigiPie/mongo-action): to instantiate a mongoDB server in a Docker container for testing against.

## Background info

### What is [Mongoose](https://mongoosejs.com/)
MongooseJS provides a straight-forward solution to modeling your NodeJS application data easily in MongoDB. It handles all MongoDB validation, casting and business logic on your behalf.

### What is [Mocha](https://mochajs.org/)
Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser. It is our test environment of choice for this project.

### What is [Chai](https://www.chaijs.com/)
Chai is an assertion library for Node. We use Chai assertions and `chai-http` in Mocha to perform HTTP testing of our NodeJS API endpoints.
