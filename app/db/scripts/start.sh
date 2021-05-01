#! /bin/bash


# super simple startup script that is copy and pasted from https://hub.docker.com/_/postgres/
docker run --name some-postgres -p "3003:5432" -e POSTGRES_PASSWORD=postgrespassword -d postgres