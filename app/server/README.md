# Prytaneum GraphQL server

## Workflow

### Adding a feature

```bash
# for new features
yarn workspace @app/server add-feat <name of feature here>

# for sub features
yarn workspace @app/server add-feat <name of feature here> <name of parent feature>
```

After running the above, the corresponding folders and files are added inside of the features folder.

## Design Notes

-   All resolvers assume that authentication of the user has occurred at a prior level
-   [Connections spec for relay](https://relay.dev/graphql/connections.htm#)
    > In order to indicate to Relay that we want to perform pagination over this connection, we need to mark the field with the @connection directive. We must also provide a static unique identifier for this connection, known as the key. We recommend the following naming convention for the connection key: <fragment*name>*<field_name>.

## Development Notes

-   Files in the `component/` folder name and export name sensitive ex. each resolver file must be named `resolvers.ts` and must export `export const resolvers = {...}`. This can be circumevented in special cases, ex. `type-parsers` export resolvers for custom scalars, but is generally discouraged.
-   Errors should be thrown sparingly -- we don't want to blow up the whole query because the user didn't have permissions for 1 field. However, we should always be throwing errors if there are insufficient permissions for create, update, or delete operations.

## Security

[make a todo checklist based off of this](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html) -- also take a look at the links at the bottom

# Optimizations Notes

-   [Take a look here to optimize queries](https://stackoverflow.com/a/59871178/15437092)
    -   [graphql-parse-resolve-info](https://www.npmjs.com/package/graphql-parse-resolve-info)
    -   [join monster](https://www.npmjs.com/package/join-monster) (just another reference, not going to use -- probably)
-   [Batching queries using data loader](https://github.com/graphql/dataloader)

## Scripts

### `dev`

-   Uses `--exit-child` because of this https://github.com/wclr/ts-node-dev/issues/69 (not sure what's causing it, could be mercurius, prisma, or fastify when using register)
