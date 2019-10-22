# Catelli's Web Client

A React/TypeScript/GraphQL web client for the Catelli's Restaurant Reservation app.

These installation steps assume a machine running a recent version of OSX.

## Installation/setup

Node Version: 8.16.1
NPM Version: 6.4.1

Note: these instructions assume you're already in an environment with a configured Node.js/npm installation. Is that not the case for you? Then check out the Environment section below in order to set your system up.

### Required so Client knows where to find API:
Create a `.env` file with `REACT_APP_API_URL='http://localhost:3000'` where `http://localhost:3000` is the path to your locally running version of the API.

1. Install with `npm install`
2. Verify build with `npm run build`
3. Start the server with `npm run start`. If a browser window doesn't open, visit the site on [localhost:4567](http://localhost:4567/).

## Environment

You

### Node/npm

Both Node.js and npm can be acquired by installing a bundle from Node.js. You can download the appropriate package [here](https://nodejs.org/en/). Either the LTS or "Current" version (8.9.4 and 9.6.1, respectively, as of this writing) are fine. You should only have to double-click the downloaded package and follow the installation wizard instructions in order to finish the installation.
