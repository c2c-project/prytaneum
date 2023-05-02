FROM node:16.16.0 as dev

ARG WM_VERSION=v2022.02.14.00
RUN wget https://github.com/facebook/watchman/releases/download/$WM_VERSION/watchman-$WM_VERSION-linux.zip && \
    unzip watchman-$WM_VERSION-linux.zip && \
    cd watchman-$WM_VERSION-linux && \
    mkdir -p /usr/local/{bin,lib} /usr/local/var/run/watchman && \
    cp bin/* /usr/local/bin && \
    cp lib/* /usr/local/lib && \
    chmod 755 /usr/local/bin/watchman && \
    chmod 2777 /usr/local/var/run/watchman && \
    cd .. && \
    rm -fr watchman-$WM_VERSION-linux.zip watchman-$WM_VERSION-linux

WORKDIR /usr/monorepo
# Copy all files from the root of the project
COPY . .
# Install dependencies
RUN yarn install

EXPOSE 8080
CMD ["yarn", "g:dev-docker"]