# mocha-chai-mongoose

## Local testing guide

To deploy this project locally for development purposes, follow the steps below.

### Downloads

To begin, first install and set up the following.

1. [Install MongoDB locally](https://www.evantay.com/docs/full-stack/mongodb/local-setup/), take note of your `mongoURI`. Alternatively, you can use [mLab](https://mlab.com/) instead.
2. [Install NodeJS](https://nodejs.org/en/).
3. Clone this repository: `git clone https://github.com/DigiPie/mocha-chai-mongoose.git`.

### Project setup

Next, set up the NodeJS application with the following steps.

1. Open the `server/` sub-directory within the `mocha-chai-mongoose` folder: `cd server`.
2. Install the required packages (which are specified in `package.json`): `npm install`.
3. Open `config/example_dev.js` and fill in the `mongoURI` to your local MongoDB instance.
4. Rename `example_dev.js` as `dev.js`.

### Testing

Finally, you can execute the Mocha test suite files under the `server/test/` directory.

1. Check that you are in the `server/` sub-directory.
2. Run the tests: `npm test`.
4. To exit testing, press `CTRL + C`.

## Automated testing via Github action

Check out the Github Action workflow for this project: `.github/workflows/nodejs.yml`. This workflow calls `npm test` each time you do a `git push` to your Github repo.

It uses the following Github actions:

- [actions/checkout](https://github.com/actions/checkout): to checkout this repo.
- [actions/setup-node](https://github.com/actions/setup-node): to setup specified node versions.
- [DigiPie/mongo-action](https://github.com/DigiPie/mongo-action): to instantiate a mongoDB server in a Docker container which will be used for storing test data.