#!/bin/sh

echo "Building the project..."

yarn build \
&& npm prune --production \
&& yarn cache clean \
&& yarn autoclean --force