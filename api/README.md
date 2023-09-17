# Lotto Forecast API Development With Nestjs Framework.

## Descriptions

It is a RESTFull API, which uses current results to search for patterns in passed results.
passed results ware stored in mongoDb database which contains 24 games collections with over 50,000 entries,
1 collection to store numbers of years which the is being played and 1 collection to store users information.

## Functional Requirements.

1. Users should be able to register and sign-in as user or admin.
2. Users should be able to register and sign-in with email and password or with SSO.
3. Admin users should be able to insert many documents at once or insert one at a time.
4. Admin should be able to perform CRUD operations on any collections.
5. Send messages to users to confirm their emails or for information purpose.
6. Users should be able to search for patterns using last two events or last three events.
7. Users should be able to search for patterns manually or automatically.
8. Users should be able to reset their passwords.
9. Users should be able to search for numbers in an event at a specific positions.

   ```

   ```

## Non Functional Requirements

1. Scalability.
2. Flexibility.
3. Secure.
4. Decoupled.
5. DRY.
6. SOLID.
7. Automation Test.

## Implementations Details

### Generate new nestjs app .1

#### Descriptions

Nestjs is a Nodejs framework for creating scalable api.

### Installation.

i. `nest new api`

### Install helmet middleware .2

#### Descriptions

Helmet helps secure Express apps by setting HTTP response headers.  
 i. `npm i --save helmet`
ii. Register helmet middleware globally in main.ts.

### Use CORS .3

#### Descriptions

Cross-origin resource sharing (CORS) is a mechanism that allows resources to be requested from another domain.
Register CORS middleware in main.ts using app.enableCors(CorsOptions).

### Install Rate Limiting .4

#### Descriptions

Protect app from brute-force attacks
i. `npm i --save @nestjs/throttler`
ii. Register and apply rate-limiting guard in app.module.ts globally.

### Use OpenAPI specifications .5

#### Descriptions

OpenAPI specification is a format used to describe RESTful APIs which shows implemention details of the API.
i.`npm install --save @nestjs/swagger`
ii. Configure and initialize Swagger in main.ts file.

### Install nestjs/config .6

#### Descriptions

It is use to organize and load environment variables.
i. `npm i --save @nestjs/config`
ii. Create .env file in the root directory.
iii. Create a file(configuration) and load all enviroment variables from .env.
iv. Register ConfigModule in app.module.ts and use (configuration) file as value to (load) key.
v. Use ConfigService.get(envName) to have access to env variable.

### Tesing .7

#### Descriptions

Automation is use to streamline and accelerate the testing process, reduce human intervention, and improve the accuracy and repeatability of tests.

#### Automock

It is used during unit testing to automatically mock all class providers.
i. `npm i -D @automock/jest`

### Event Emitter

#### Descriptions

It used to subscribe and listens to events in an application.
i. `npm i --save @nestjs/event-emitter`
ii. Add EventEmitterModule to the AppModule and run the forRoot(options?) method.

### Create games

`nest g resource games`
Create RepoService And SearchService

.8
`nest g resource three-weeks`
Query API with 3 weeks pass results.
Create Dto(Data Tranfer Object),service, controller and Interface.

.9
`nest g resource two-weeks`
Create (twoWeeks) folder : Query API with 2 weeks pass results.
Create Dto(Data Tranfer Object), controller and Interface.

.10
`nest g resource repo`

.11
`npm i @nestjs/mongoose mongoose`
Register MongooseModule in the app module
Regiser MongooseModule in gamesModule using feature method

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
