# Prytaneum

## Setup

-   Install [Node](https://nodejs.org/en/download/)
-   Install [Docker/Docker Compose](https://docs.docker.com/compose/install/)
-   Install [Yarn v3](https://yarnpkg.com/getting-started)

## Quick Start

1. Use Node LTS (14.x at the time of writing)
2. `yarn install`
3. `yarn g:dev-project`
4. `http://localhost:8080/login` in your browser.

## Basics

Before getting into common development workflows, lets first go over the building blocks to the development workflow

### Updating Prisma Types

Go into `app/server/prisma/schema.prisma`, change as needed, then run the command `yarn workspace @app/server generate`

## Development Workflows

### Backend

At a high level, the backend consists of a graphql server and postgresql database.

-   The database itself is managed via docker and the `db/` folder. Notably the db is not a yarn workspace.
-   The graphql server is managed via the `@app/server` workspace.

## Quirks/FAQ/Help

-   If you add a "scoped" script e.g. `g:<some script>` and it doesn't work, try running `yarn install` then attempt to run the script again.
-   Make sure you're using LTS version of node. See [nvm lts](https://github.com/nvm-sh/nvm#long-term-support) and the `.nvmrc` file at the root of the project. It's also helpful to take a look at the [nodejs releases](https://nodejs.org/en/about/releases/)
    -   To check which version of node the project is using (there may be multiple versions of node on your computer) run `yarn node --version`.
-   When using Windows it is STRONGLY RECOMMENDED to use WSL in order to avoid various issues. When using wsl for development, you may encounter issues accessing the web app via localhost. This issue should be fixed temporarily by restarting WSL with `wsl --shutdown`, and should be permanently fixed by turning off [Windows 10 Fast Startup](https://www.tenforums.com/tutorials/4189-turn-off-fast-startup-windows-10-a.html).
-   The `.env.local` files can be used to locally overwrite environment variables. NOTE: For this to work the path for the env files must be loaded in scripts/env.ts.

## Helpful Docs for learning

-   [Prisma's database modeling guide](https://www.prisma.io/dataguide)

## Available Scripts

`g:commit`: Add a commit using the `commitlint` prompt.
`g:codegen`: Generate files using graphql codegen.
`g:dev-server`: Start the server with NODE_ENV=development.
`g:start-server`: Start the server with NODE_ENV=production.
`g:dev-client`: Start the client with NODE_ENV=development.
`g:start-client`: Start the client with NODE_ENV=production.
`g:client-relay`: Generate `relay` type defs on the client.
`g:start-db`: Start the database using `docker` and `docker-compose`. See `db/start-db.sh`.
`g:start-proxy`: Start the proxy that sits in front of the client and server.
`g:dev-project`: Start the database, server, client, and proxy with NODE_ENV=development.
`g:start-project`: Start the database, server, client, and proxy with NODE_ENV=production.

## Possible Errors

-   Project won't start because of `Error occurred while proxying request localhost:8080/graphql ...`?

    -   Run `yarn workspace @app/db prisma generate`.
    -   Run `yarn g:dev-server` to check if the server starts up without any errors.
    -   Ensure you have [nvm](https://github.com/nvm-sh/nvm) installed and/or follow [this guide](https://stackoverflow.com/questions/11284634/upgrade-node-js-to-the-latest-version-on-mac-os) to upgrade your node to LTS (currently v14.x).
    -   Open a fresh terminal and run `yarn g:dev-project`.

-   `Subject/type may not be empty` error when trying to commit for the first time?

    -   Format your commit message as `addition(scope): what addition you made` where addition can be `fix`, `feature`, `refactor`, etc. `(scope)` can be `(global)`, `(frontend)`, `(backend)`, `(fullstack)`, `(docs)`. Your message should be a string of all lowercase letters that isn't sentence-case, start-case, pascal-case, or upper-case.

-   `Can't reach database server at localhost:3003` error when trying to log in or register?

    -   Verify that Docker is running.
    -   Run `yarn g:start-db` to start db.
    -   Run `yarn g:dev-project`.

-   Still can't log in or register and the server exits with code 0 in the terminal?

    -   Check your node version by running `node -v` and ensure that it's v14.17.1.
        -   Otherwise, change the node version by running `nvm install 14.17.1` and `nvm use 14.17.1`.
    -   Run `yarn workspace @app/server prisma generate`.
    -   Run `yarn g:dev-project`.

-   Can't log in or register and the error `public.User does not exist in the current database` shows?
    -   Run `yarn workspace @app/server prisma generate`.
    -   Run `yarn g:start-db` to start db.
    -   Run `docker-compose down && docker volume prune && docker container prune && docker image prune` to clear current db and all docker images. You could also run `docker system prune`
    -   Run `yarn g:start-db` to start db again.
    -   Run `yarn workspace @app/server prisma db push --preview-feature` to sync the db with the schema.
    -   Run `yarn g:dev-project`.
