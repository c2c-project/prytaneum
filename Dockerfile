FROM node:14.15.4 as base-stage

RUN apt-get update
RUN yarn set version berry


# Build Stage
FROM base-stage as build-stage
WORKDIR /usr/src/app

COPY . .

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

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV SERVER_PORT 3002
ENV CLIENT_PORT 3000

COPY --from=build-stage /usr/src/app ./
# COPY --from=build-stage /usr/src/app/*.json ./
# COPY --from=build-stage /usr/src/app/*.yml ./
# COPY --from=build-stage /usr/src/app/.pnp.cjs ./
# COPY --from=build-stage /usr/src/app/.env ./
# COPY --from=build-stage /usr/src/app/.yarn ./
# COPY --from=build-stage /usr/src/app/yarn.lock ./
# COPY --from=build-stage /usr/src/app/.dockerignore ./
# COPY --from=build-stage /usr/src/app/.nvmrc ./
# COPY --from=build-stage /usr/src/app/proxy.ts ./
# COPY --from=build-stage /usr/src/app/custom/ ./custom
# COPY --from=build-stage /usr/src/app/scripts ./scripts
# COPY --from=build-stage /usr/src/app/app/client/.next/ ./app/client/.next
# COPY --from=build-stage /usr/src/app/app/client/public/ ./app/client/public
# COPY --from=build-stage /usr/src/app/app/client/*.json ./app/client/
# COPY --from=build-stage /usr/src/app/app/client/schema.graphql ./app/client/
# COPY --from=build-stage /usr/src/app/app/server/ ./app/server
# COPY --from=build-stage /usr/src/app/app/db/ ./app/db
# COPY --from=build-stage /usr/src/app/app/prisma/ ./app/prisma

EXPOSE 8080
EXPOSE 3000
EXPOSE 3002

CMD ["yarn", "g:start-project"]
