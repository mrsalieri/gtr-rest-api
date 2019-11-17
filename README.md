# single-endpoint-rest-api
NodeJS + MongoDB REST API for demo purposes

## Installation
Just run `npm install` in the project folder and do the configuration for your system. To do it, check 4 files under the config folder. To do the configuration in env(not a requirement), just create a .env file in the root folder and add environmental settings inside(Including port, or the API will run at default port, 8054). For more information about the config and .env structure, please check the links below
https://github.com/lorenwest/node-config
https://github.com/motdotla/dotenv

## Running
You can start the API by running `npm start` in production mode or `npm run dev` in development mode, test it by `npm test`. You can also test manually via
`/api/swagger/api-docs/`
