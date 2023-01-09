# Troubleshooting

Common errors and their solutions

## Project won't start because of `Error occurred while proxying request localhost:8080/graphql ...`?

-   Run `yarn workspace @app/db prisma generate`.
-   Run `yarn g:dev-server` to check if the server starts up without any errors.
-   Ensure you have [nvm](https://github.com/nvm-sh/nvm) installed and/or follow [this guide](https://stackoverflow.com/questions/11284634/upgrade-node-js-to-the-latest-version-on-mac-os) to upgrade your node to LTS.
-   Open a fresh terminal and run `yarn g:dev-project`.

## `Subject/type may not be empty` error when trying to commit for the first time?

-   Format your commit message as `addition(scope): what addition you made` where addition can be `fix`, `feature`, `refactor`, etc. `(scope)` can be `(global)`, `(frontend)`, `(backend)`, `(fullstack)`, `(docs)`. Your message should be a string of all lowercase letters that isn't sentence-case, start-case, pascal-case, or upper-case.

## `Can't reach database server at localhost:3003` error when trying to log in or register?

-   Verify that Docker is running.
-   Run `yarn g:start-db` to start db.
-   Run `yarn g:dev-project`.

## Still can't log in or register and the server exits with code 0 in the terminal?

-   Check your node version by running `yarn node -v` and verify it's [Node LTS](https://nodejs.org/en/about/releases/).
-   Run `yarn workspace @app/server prisma generate`.
-   Run `yarn g:dev-project`.

## Can't log in or register and the error `public.User does not exist in the current database` shows?

-   Run `yarn workspace @app/server prisma generate`.
-   Run `yarn g:start-db` to start db.
-   Run `docker-compose down && docker volume prune && docker container prune && docker image prune` to clear current db and all docker images. Alternatively, you could run `docker system prune`
-   Run `yarn g:start-db` to start db again.
-   Run `yarn workspace @app/server prisma db push --preview-feature` to sync the db with the schema.
-   Run `yarn g:dev-project`.
