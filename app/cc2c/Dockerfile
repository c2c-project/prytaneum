FROM node:lts as dev

WORKDIR /usr/monorepo
# Copy all files from the root of the project
COPY . .
# Install dependencies
RUN yarn install

EXPOSE 3000
CMD ["yarn", "g:dev-cc2c"]