# Scripts

Documentation for all scripts in each respective `package.json` file.

## Project Root

All scripts at the root directory are prefixed with `g:` for global.

-   `g:commit`: Add a commit using the `commitlint` prompt.
-   `g:codegen`: Generate files using graphql codegen.
-   `g:dev-server`: Start the server with NODE_ENV=development.
-   `g:start-server`: Start the server with NODE_ENV=production.
-   `g:dev-client`: Start the client with NODE_ENV=development.
-   `g:start-client`: Start the client with NODE_ENV=production.
-   `g:client-relay`: Generate `relay` type defs on the client.
-   `g:start-db`: Start the database using `docker` and `docker-compose`. See `db/start-db.sh`.
-   `g:start-test-db`: Starts a test specific database using `docker` and `docker-compose`. See `db/start-test-db.sh`.
-   `g:stop-db`: Stops the currently running database. See `db/stop-db.sh`.
-   `g:start-proxy`: Start the proxy that sits in front of the client and server.
-   `g:dev-project`: Start the database, server, client, and proxy with NODE_ENV=development.
-   `g:start-project`: Start the database, server, client, and proxy with NODE_ENV=production.

## Client

Prefix scripts with

```bash
yarn workspace @app/client
```

-   `start`: Start the client with NODE_ENV=production
-   `dev`: Start the client with NODE_ENV=development
-   `info`: See [`next info`](https://nextjs.org/docs/api-reference/cli#info)
-   `build`: Build the client.
-   `relay`: Start the relay compiler in watch mode.
-   `typecheck`: Check that all types are correct.
-   `lint`: Lint the client.

## E2E

Prefix scripts with

```bash
yarn workspace @app/e2e
```

-   `pretest`: Starts up the project and seeds the DB in preperation to run the playwright tests.
-   `test`: Runs playwright tests.
-   `test:ci`: Runs playwright tests with the environment variable set to `CI=1` so the configuration can be set to run on the CI/CD pipeline.
-   `debug`: Runs playwright tests in headed mode, allowing for playwright to open browsers locally to monitor tests as they execute.
-   `allure:generate-report`: Takes the test results under the folder `app/e2e/allure-results` and generates a report at `app/e2e/allure-report`.
-   `allure:open-report`: Generates and opens an allure report in the browser.

## Server

Prefix scripts with

```bash
yarn workspace @app/server
```

-   `start`: Start the client with NODE_ENV=production
-   `dev`: Start the client with NODE_ENV=development
-   `build`: Build the server.
-   `add-feat`: Helper script that uses the `templates/` folder to generate boilerplate for a new feature folder.

```bash
yarn workspace @app/server add-feat somNewFeature # will add feature/some-new-feature with the appropriate files
```

-   `typecheck`: Check that all types are correct.
-   `prod`: Only used in prod for running the application
-   `generate`: Generate prisma types. Only necessary to run when the database has been or is being modified and when running the project for the first time.
-   `lint`: Lint the server.
-   `prisma-db-push`: Pushes the current prisma schema to the DB.
-   `prisma-db-seed`: Seeds the DB using the file `app/server/prisma/seed.ts`.
-   `test:prisma-db-push`: Pushes the current schema with the `NODE_ENV=test`.
-   `test:unit`: Runs unit tests using jest with the `NODE_ENV=test`.
-   `test:integration`: Runs integration tests using jest with the `NODE_ENV=test`
-   `test:ci`: Runs all server tests after ensuring the test DB is running. Used for CI/CD pipeline.
