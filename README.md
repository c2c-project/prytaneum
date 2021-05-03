# Prytaneum

## Setup

-   Install [Node](https://nodejs.org/en/download/)
-   Install [Docker/Docker Compose](https://docs.docker.com/compose/install/)
-   Install [Yarn v2](https://yarnpkg.com/getting-started)

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

## Helpful Docs for learning

-   [Prisma's database modeling guide](https://www.prisma.io/dataguide)

## Available Scripts
