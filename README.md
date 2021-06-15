# Prytaneum

## Setup

-   Install [Node](https://nodejs.org/en/download/)
-   Install [Docker/Docker Compose](https://docs.docker.com/compose/install/)
-   Install [Yarn v2](https://yarnpkg.com/getting-started)

## Quick Start

1. Use Node LTS (14.x at the time of writing)
2. `yarn install`
3. `yarn g:dev-project`
4. `http://localhost:8080/login` in your browser.

## Basics

Before getting into common development workflows, lets first go over the building blocks to the development workflow

### Updating Prisma Types

Go into `app/db/prisma/schema.prisma`, change as needed, then run the command `yarn g:update-prisma-types`

## Development Workflows

### Backend

At a high level, the backend consists of a graphql server and postgresql database.

-   The database itself is managed via the `@app/db` workspace.
-   The graphql server is managed via the `@app/server` workspace.

There's a few complexities to take note of:

1. [Prisma](https://www.prisma.io/) generates types for us based on our database schema defined in `@app/db/prisma/schema.prisma`, which end up going inside of the `@app/prisma` workspace. The `@app/prisma` workspace is necessary due to a limitation of prisma when working with yarn 2 pnp ([relevant github issue](https://github.com/prisma/prisma/issues/1439#issuecomment-790471739))
2. Since we use Prisma to both manage our migrations and query our database, it makes logical sense for the migrations and `schema.prisma` file to reside in the `@app/db` workspace. `@app/db` updates and depends on `@app/prisma`. Likewise, `@app/server` depends on, but does not update, `@app/prisma`. Updating the schema in `@app/db` will lead to an update in `@app/prisma` and then finally `@app/server`. If you are working the backend, this is important to understand.

## Quirks/FAQ/Help

-   If you add a "scoped" script e.g. `g:<some script>` and it doesn't work, try running `yarn install` then attempt to run the script again.
-   Use latest LTS version of node -- node 16 doesn't work with prisma https://github.com/prisma/prisma/issues/6682 -- I already upgraded, but it seems teh fix didn't work

## Helpful Docs for learning

-   [Prisma's database modeling guide](https://www.prisma.io/dataguide)

## Available Scripts

## Possible Errors

- Project won't start because of `Error occurred while proxying request localhost:8080/graphql ...`?
    - Run `yarn workspace @app/db prisma generate`.
    - Run `yarn g:dev-server` to check if the server starts up without any errors.
    - Ensure you have [nvm](https://github.com/nvm-sh/nvm) installed and/or follow [this guide](https://stackoverflow.com/questions/11284634/upgrade-node-js-to-the-latest-version-on-mac-os) to upgrade your node to LTS (currently v14.x).
    - Open a fresh terminal and run `yarn g:dev-project`.

- `Subject/type may not be empty` error when trying to commit for the first time?
    - Format your commit message as `addition(scope): what addition you made` where addition can be `fix`, `feature`, `refactor`, etc. `(scope)` can be `(global)`, `(frontend)`, `(backend)`, `(fullstack)`, `(docs)`. Your message should be a string of all lowercase letters that isn't sentence-case, start-case, pascal-case, or upper-case.
