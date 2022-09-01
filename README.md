# Hotel API

A Nest.js REST API that allows users to create reservations for hotel suites.

## Language, Framework, Tools

- [TypeScript](https://www.typescriptlang.org/) (Strongly-typed Language)
- [Node.js](https://nodejs.org/) (JavaScript Runtime environment)
- [Nest.js](https://nestjs.com/) (Node.js framework)
- [Prisma](https://www.prisma.io/) (ORM for Node.js and TypeScript)
- [SQLite](https://www.sqlite.org/) (Embedded Database Engine)  

## Installation

1. Clone this repo
   
   ```
   git clone git@github.com:HaR15/hotel-api.git
   ```

2. On the command line, `cd` into the project folder
3. If you don't have Node.js `v12.22.0` or greater installed on your machine, install from https://nodejs.org/en/download/
3. Install npm packages: 

    ```
    npm install
    ```

## Compile

To compile the project, run:

```
npm run build
```

## Run

To run the project, run:

```
npm run start
```

The app should now be running on http://localhost:3000

## Swagger Spec

To view the Swagger Spec after running the app, go to http://localhost:3001

## Tests

To run the tests, run:

```
npm run test
```

To run with test coverage:

```
npx jest --coverage
```
