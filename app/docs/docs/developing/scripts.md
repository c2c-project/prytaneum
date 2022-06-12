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
-   `test:e2e`: Perform an e2e test.
-   `test:e2e:ci`: For CI use only.
-   `test:e2e:headed`: Runs test in headed mode, useful for debugging tests. [docs](https://playwright.dev/docs/debug#run-in-headed-mode)
-   `allure:generate-report`: Generate coverage stats.
-   `allure:report`: Open the web view of the report.

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
