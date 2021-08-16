FROM node:14

WORKDIR /usr/src/app

# Set up ENV VARS
ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./

# Install production dependencies.
RUN yarn install --production=true

COPY . .

# Build production app
RUN yarn build

RUN yarn add --dev @types/node

# Start production app
CMD yarn start
