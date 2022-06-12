# Server

## Env

We load our environment using [dotenv-cli](https://www.npmjs.com/package/dotenv-cli). The TL;DR is that if you want to override an environment variable, create a `.env.local` file within the `/server` directory. Our .gitignore SHOULD always ignore this file, but it never hurts to double check.

You may be thinking, "Why would I want to override the default environment variables?" A typical use case is where you want to use some real API key to prototype your changes, but you definitely don't want to commit a real API key to the repo :smiley:. For more information on cascading environment variables, read [this](https://github.com/entropitor/dotenv-cli#cascading-env-variables) and the corresponding [issue](https://github.com/entropitor/dotenv-cli/issues/37).

## Workflow

### Adding a feature

```bash
# for new features
yarn workspace @app/server add-feat yourFeatureNameHere

# for sub features
yarn workspace @app/server add-feat yourFeatureNameHere parentFeatureName
```

After running the above, the corresponding folders and files are added inside of the features folder.

## Design Notes

-   All resolvers assume that authentication of the user has occurred at a prior level
-   [Connections spec for relay](https://relay.dev/graphql/connections.htm#)
> In order to indicate to Relay that we want to perform pagination over this connection, we need to mark the field with the @connection directive. We must also provide a static unique identifier for this connection, known as the key. We recommend the following naming convention for the connection key: `<fragment_name>_<field_name>`.

## Development Notes

-   Files in the `features/` folder must container a file named `resolvers.(ts|js)` and export export `export const resolvers = {...}`. There are some special cases too. For example, `type-parsers` exports a `resolvers` variable too for custom scalars, but generally you should not need to do this.
-   Uncaught errors should be thrown almost never. We don't want to blow up the whole query because the user didn't have permissions for 1 field. However, we should always be throwing errors if there are insufficient permissions for create, update, or delete operations.

## Security

We try our best to follow all OWASP best practices. The cheatsheets in the sidebar at this [link](https://cheatsheetseries.owasp.org/index.html) in particular when they apply to our use case.

# Future Optimizations

-   [Take a look here to optimize queries](https://stackoverflow.com/a/59871178/15437092)
    -   [graphql-parse-resolve-info](https://www.npmjs.com/package/graphql-parse-resolve-info)
    -   [join monster](https://www.npmjs.com/package/join-monster) (just another reference, not going to use -- probably)
-   [Batching queries using data loader](https://github.com/graphql/dataloader)

