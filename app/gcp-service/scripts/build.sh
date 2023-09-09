#!/bin/sh

# Makes it so that the script exist if any command fails 
# https://intoli.com/blog/exit-on-errors-in-bash-scripts/
set -e

# Check if all necessary commands are installed
if ! [ -x "$(command -v yarn)" ]; then
  echo 'Error: yarn is not installed.' >&2
  exit 1
fi

if ! [ -x "$(command -v rsync)" ]; then
  echo 'Error: rsync is not installed.' >&2
  exit 1
fi

# Start building since we know the commands are installed
printf "Starting build... \n"

printf "Transpiling typescript files...\n"
# Step 1. build the project
yarn tsc -p tsconfig.prod.json
printf "Successfully built typescript files!\n"

printf "Build completed!\n"

