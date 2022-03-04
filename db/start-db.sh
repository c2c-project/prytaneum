#!/bin/sh

set -e

export POSTGRES_PASSWORD=postgrespassword
export POSTGRES_HOST=localhost
export POSTGRES_PORT=3003
export POSTGRES_USER=postgres
export DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT"

docker-compose -f db/docker-compose.yml up -d