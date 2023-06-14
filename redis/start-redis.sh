#!/bin/sh

set -e

./redis/stop-redis.sh

export REDIS_HOST=redis-server
export REDIS_PORT=6379
export REDIS_USERNAME=default
export REDIS_PASSWORD=redispassword

docker-compose -f redis/docker-compose.yml up -d --remove-orphans