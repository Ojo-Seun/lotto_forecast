# Full-Stack Lotto Forecast App Development Nestjs And Reactjs

## Lotto Forecast App Front-End Development With React.js,Typescript and React-redux

.1
`npx degit reduxjs/redux-templates/packages/vite-template-redux my-app`

.2
`npm install framer-motion`

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Lotto Forecast API Development With Nestjs Framework.

.1 `nest new api`

.2 `npm i --save helmet`
Register helmet middleware in main.ts.

.3 Register CORS middleware in main.ts.

.4 `npm i --save @nestjs/throttler`
Register and apply rate-limiting guard in app.module.ts.

.5 `npm i --save @nestjs/config`
Create .env file in the root directory.
Create a file(configuration) and load all enviroment variables from .env.
Register ConfigModule in app.module.ts and use (configuration) file as value to (load) key.

.6 `npm install --save @nestjs/swagger`
Configure Swagger in main.ts file

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
