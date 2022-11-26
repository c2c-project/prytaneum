FROM node:16.16.0
WORKDIR /usr/monorepo
# Copy all files from the root of the project
COPY . .
# Install dependencies
RUN yarn install
# Install watchman peer dependency
COPY --from=icalialabs/watchman:4-alpine3.4 /usr/local/bin/watchman* /usr/local/bin/
RUN mkdir -p /usr/local/var/run/watchman \
 && touch /usr/local/var/run/watchman/.not-empty

EXPOSE 8080
CMD ["yarn", "g:dev-docker"]