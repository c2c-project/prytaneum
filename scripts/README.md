# Scripts

Description of all the scripts inside of this directory

## `insert.sh`
Should only ever be used for development purposes.  

**NOTE:** Must run `chmod +x path/to/insert.sh` if you are running the script for the first time

## `generate.ts`
Should only ever be used for development purposes

## Commmon Workflow
1. Modify some database table via hasura 
2. Modify `generate.ts` to appropriately generate dummy data for given table, while following the same format as the other generators
3. Run `generate.ts` via script in package.json to update the data directory csv's
4. Commit your work (`git add path/to/hasura` `git commit -m <relevant commit message here>`)
