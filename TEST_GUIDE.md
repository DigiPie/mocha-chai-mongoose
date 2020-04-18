# mocha-chai-mongoose

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