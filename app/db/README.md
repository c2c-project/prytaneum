# db

This workspace handles everything to do with the Prytaneum PostgresQL database.

## Getting Started

1. Install [docker](https://docs.docker.com/get-started/#download-and-install-docker) and [docker-compose](https://docs.docker.com/compose/install/)
2. Run `yarn workspace @app/db start-db`
3. `yarn workspace @app/db prisma db push --preview-feature` or migrate -- refer [Useful Links](##useful-links) `Migrate or push?`

## Useful links

-   [Prisma CLI Docs](https://www.prisma.io/docs/reference/api-reference/command-reference)
-   [Migrate or push?](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push#choosing-db-push-or-prisma-migrate)

## Common Commands

### Start db
`yarn workspace @app/db start-db`

### Stop db
`yarn workspace @app/db stop-db`

### View db logs
Get the container id from running `docker ps`  
Run `docker logs <container id>`

### Wipe the current development database

```bash
# pwd=/path/to/app/db
docker-compose down && docker volume prune

# depending on your goals and for extra thoroughness, you can optionally run the following
docker container prune
docker image prune
```

> Refer to docker reference or type "docker container --help" or "docker image --help" for more info

### Initialize the current database

```bash
# pwd=/path/to/project/root or any workspace within the project
yarn workspace @app/db prisma migrate dev
#or
yarn workspace @app/db prisma db push --preview-feature
```

> read more about each command [here](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push/)  
> [Prisma CLI Docs](https://www.prisma.io/docs/reference/api-reference/command-reference)
