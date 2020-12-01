# DEV
FROM node:14-alpine as base-stage
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN apk update \
&& apk add --no-cache git\
&& yarn install --frozen-lockfile && yarn cache clean
EXPOSE 3000

# BUILD
FROM base-stage as build-stage
COPY . .
RUN yarn build \
    && npm prune --production \
    && yarn cache clean \
    && yarn autoclean --force

# PROD
FROM nginx:1.18.0-alpine as production-stage
WORKDIR /usr/app
COPY --from=BUILD_IMAGE /usr/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]