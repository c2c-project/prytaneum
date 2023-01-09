---
sidebar_position: 1
---

# Prerequisites

Before you try to run the project, please make sure to download and install the following:

1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [Docker](https://docs.docker.com/get-docker/)
    1. Install [Docker Compose](https://docs.docker.com/compose/install/)
3. Install [yarn](https://yarnpkg.com/getting-started/install). We use version 3.x currently.
    1. Specifically, make sure to [set up vscode correctly](https://yarnpkg.com/getting-started/editor-sdks#vscode).
4. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
5. Install [watchman](https://facebook.github.io/watchman/docs/install.html)
6. Allow execution of scripts in the `db/` folder `chmod +x db/*.sh`. As always make sure to read scripts downloaded from strangers on the internet before executing them 😄

You're all set 🎉🎉🎉.

Run `yarn install` and `yarn g:dev-project` to start it up!

## Windows

-   When using Windows it is STRONGLY RECOMMENDED to use WSL in order to avoid various issues. When using wsl for development, you may encounter issues accessing the web app via localhost. This issue should be fixed temporarily by restarting WSL with `wsl --shutdown`, and should be permanently fixed by turning off [Windows 10 Fast Startup](https://www.tenforums.com/tutorials/4189-turn-off-fast-startup-windows-10-a.html).
