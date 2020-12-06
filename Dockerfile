# DEV
FROM node:14-alpine as base-stage
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN apk update \
&& apk add --no-cache git\
&& yarn install --frozen-lockfile
EXPOSE 3000

# BUILD
FROM base-stage as build-stage
COPY . .
RUN chmod +x scripts/*.sh
# RUN scripts/clean.sh
RUN scripts/build.sh

ARG NODE_ENV
ARG REACT_APPP_SERVER

ENV NODE_ENV = $NODE_ENV
ENV REACT_APPP_SERVER = $REACT_APPP_SERVER

# PROD
FROM nginx:1.18.0-alpine as prod-stage
WORKDIR /usr/app
COPY --from=build-stage /usr/app/build /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]