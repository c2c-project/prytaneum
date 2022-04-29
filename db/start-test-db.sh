#!/bin/sh

set -e

./db/stop-db.sh

export POSTGRES_PASSWORD=postgrespassword
export POSTGRES_HOST=localhost
export POSTGRES_PORT=3003
export POSTGRES_USER=postgres
export POSTGRES_DB=tests
export DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB"

docker-compose -f db/docker-compose.yml up -d