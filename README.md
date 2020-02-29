# mocha-chai-mongoose 0.0.2 (Work-in-progress)

![Node.js CI](https://github.com/DigiPie/mocha-chai-mongoose/workflows/Node.js%20CI/badge.svg)

An up-to-date 2020 example of how you can use Mocha and Chai to perform API testing for a Node-ExpressJS-Mongoose app. 

### Local testing and online automated testing
You will be able to test your code **locally** and also automatically when you push your code to Github, using **Github Action**. 

### Built for easy deployment
Furthermore, the code is set up such that it will automatically switch to Production Keys rather than Development Keys on deployment.

### Test suite
In this project, a single test suite: _test/productRoutes.test.js_ is used to test a single Express route: _routes/productRoutes.js_ which handles API calls pertaining to a single Mongoose model: _models/Product.js_.

**Work-in-progress:** Currently, there is only a single test case testing the 'GET /api/products' route. A full-fledge implementation and associated testing of `POST`, `GET`, `PATCH` and `DELETE` routes will be added by end March 2020.

## What is [Mongoose](https://mongoosejs.com/)
MongooseJS provides a straight-forward solution to modeling your NodeJS application data easily in MongoDB. It handles all MongoDB validation, casting and business logic on your behalf.

## What is [Mocha](https://mochajs.org/)
Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser. It is our test environment of choice for this project.

## What is [Chai](https://www.chaijs.com/)
Chai is an assertion library for Node. We use Chai assertions and `chai-http` in Mocha to perform HTTP testing of our NodeJS API endpoints.

# Local testing guide
To deploy this project locally for development purposes, follow the steps below.

## Downloads
To begin, first install and set up the following.

1. [Install MongoDB locally](https://digipie.github.io/digidocs/full-stack/mongodb/local-setup/), take note of your `mongoURI`. Alternatively, you can use [mLab](https://mlab.com/) instead.
2. [Install NodeJS](https://nodejs.org/en/).
3. Clone this repository (e.g. enter `git clone https://github.com/DigiPie/mocha-chai-mongoose.git` in your command-line terminal).

## Project setup
Next, set up the NodeJS application with the following steps.

1. Open the _server_ sub-directory (folder) within the _mocha-chai-mongoose_ folder you cloned (e.g. `cd server`).
2. Install the required packages (which are specified in `package.json`) by entering `npm install`.
3. Open _config/example_dev.js_ and fill in the `mongoURI` to your development MongoDB instance.

## Testing
Finally, you can execute the Mocha test suites under the _test/_ directory.

1. Check that you are in the _server_ sub-directory.
2. Run this project on your local server by running `npm test` (check out the `scripts` section in _package.json_ for more info).
4. To exit the test, press `CTRL + C`.

# Automated testing via Github action
Coming soon.

# Deployment to Herokuapp
Coming soon.
