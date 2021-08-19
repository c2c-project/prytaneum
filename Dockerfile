FROM node:14.15.4 as base-stage

RUN apt-get update
RUN yarn set version berry


# Build Stage
FROM base-stage as build-stage
WORKDIR /usr/src/app

COPY . .
# COPY *.json ./
# COPY yarn.lock .
# COPY scripts ./scripts
# COPY *.yml ./
# COPY app/client/*.json ./app/client/
# COPY app/server/*.json ./app/server/
# COPY . ./
# COPY app ./app

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV SERVER_PORT 3002
ENV CLIENT_PORT 3000

RUN yarn install

# Build
WORKDIR /usr/src/app/app/client
RUN yarn build

WORKDIR /usr/src/app/app/db
# RUN yarn generate
RUN yarn g:update-prisma-types

# Production Stage

FROM node:14.15.4 as production-stage

WORKDIR /usr/src/app
COPY --from=build-stage /usr/src/app ./

EXPOSE 8080
EXPOSE 3000
EXPOSE 3002

CMD ["yarn", "g:start-project"]
