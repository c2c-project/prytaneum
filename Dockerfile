FROM node:14.15.4 as base

RUN apt-get update && apt-get install --no-install-recommends --yes openssl

WORKDIR /usr/src/app

COPY *.json .
COPY yarn.lock .
COPY scripts ./scripts
COPY app ./app
COPY . .
# COPY app/client/*.json ./app/client/
# COPY app/server/*.json ./app/server/

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV SERVER_PORT 3002
ENV CLIENT_PORT 3000

# Install production dependencies
# RUN yarn install --production

# Install all dependencies
# RUN yarn install --pure-lockfile

RUN yarn workspaces focus -A

# Copy source files
# COPY app/client ./app/client/
# COPY app/server ./app/server/

# Build
WORKDIR /usr/src/app/app/client
RUN yarn build

WORKDIR /usr/src/app/app/server
RUN yarn build

# WORKDIR /usr/src/app/app/db
# RUN yarn generate
# RUN yarn g:update-prisma-types

WORKDIR /usr/src/app
CMD ["yarn", "g:start-project"]