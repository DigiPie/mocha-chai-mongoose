# mocha-chai-mongoose

## Local testing guide

To deploy this project locally for development purposes, follow the steps below.

### Downloads

To begin, first install and set up the following.

1. [Install NodeJS](https://nodejs.org/en/).
2. Set up a MongoDB instance for testing. There are three ways to go about it; choose one:
    - Run `docker-compose up -d` in the `server/` directory to start a MongoDB [Docker](https://docs.docker.com/get-docker/) container
    - [Install MongoDB locally](https://www.evantay.com/docs/mongodb/local-setup/)
    - Sign up for a [mLab](https://mlab.com/) account and launch an online MongoDB instance
3. Take note of your `mongoURI`.

### Project setup

Next, set up the NodeJS application with the following steps.

1. Open the `server/` sub-directory within the `mocha-chai-mongoose` folder: `cd server`.
2. Install the required packages (which are specified in `package.json`): `npm install`.
3. Open `server/src/config/example_dev.ts` and fill in the `mongoURI` to your local MongoDB instance.
4. Rename `example_dev.ts` as `dev.ts`.
5. Run `tsc` or `npm run compile` to compile the Typescript source code in `server/src` into Javascript code stored at `server/build`.
    - You will need to install the [Typescript compiler](https://code.visualstudio.com/docs/typescript/typescript-compiling#_install-the-typescript-compiler) first: `npm install -g typescript`.

**Note:** You have to run `tsc` or `npm run compile` after each change made to the source code in `src`. The `npm start` and `npm test` scripts runs the compiled code in `build`, not the code in `src.

### Testing

Finally, you can execute the Mocha test suite files under the `server/test/` directory.

1. Check that you are in the `server/` sub-directory.
2. Run the tests: `npm test`.
    - If you encounter "Uncaught Error: listen EADDRINUSE: address already in use :::5000", specify another port number via the `PORT` environment variable: `PORT=5001 npm test`.
3. To exit testing, press `CTRL + C`.

## Automated testing via Github action

Check out the Github Action workflow for this project: `.github/workflows/nodejs.yml`. This workflow calls `npm test` each time you do a `git push` to your Github repo.

It uses the following Github actions:

- [actions/checkout](https://github.com/actions/checkout): to checkout this repo.
- [actions/setup-node](https://github.com/actions/setup-node): to setup specified node versions.
- [DigiPie/mongo-action](https://github.com/DigiPie/mongo-action): to instantiate a mongoDB server in a Docker container which will be used for storing test data.
