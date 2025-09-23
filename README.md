# Prytaneum

Prytaneum is a comprehensive platform built as a monorepo using Yarn workspaces, featuring multiple interconnected services for a complete application ecosystem.

## Project Structure

This monorepo is organized into the following main directories:

### Core Applications (`app/`)

-   **`cc2c/`** - CC2C application (Next.js)
-   **`client/`** - Main client application (Next.js with Relay)
-   **`server/`** - Backend GraphQL server (Node.js/TypeScript)
-   **`proxy/`** - API proxy service
-   **`moderation-algo/`** - Python-based content moderation algorithm

### Supporting Services

-   **`gcp-service/`** - Google Cloud Platform integration service
-   **`docs/`** - Documentation site (Docusaurus)
-   **`e2e/`** - End-to-end tests (Playwright)

### Infrastructure & Configuration

-   **`db/`** - Database setup and management scripts
-   **`docker/`** - Docker configurations for different services
-   **`k8s/`** - Kubernetes deployment configurations
-   **`redis/`** - Redis setup and management scripts
-   **`scripts/`** - Development and utility scripts
-   **`test/`** - Additional testing utilities

### Configuration Files

-   **`custom/`** - Custom code generation plugins
-   **`codegen.yml`** - GraphQL code generation configuration
-   **`commitlint.config.js`** - Commit message linting rules

## Available Scripts

The project uses Yarn workspaces with global scripts prefixed with `g:`:

### Development

-   **`yarn g:dev`** - Start full development environment (client, server, proxy, moderation-algo, relay, GraphQL codegen, database, Redis)
-   **`yarn g:dev-docker`** - Start development environment without local DB/Redis (assumes Docker containers)
-   **`yarn g:dev-test`** - Start minimal environment for e2e testing
-   **`yarn g:dev-cc2c`** - Start CC2C application with Prisma setup

### Database & Redis

-   **`yarn g:start-db`** / **`yarn g:stop-db`** - Start/stop local database
-   **`yarn g:start-test-db`** / **`yarn g:start-test-db-ci`** - Start test database
-   **`yarn g:start-redis`** / **`yarn g:stop-redis`** / **`yarn g:start-redis-ci`** - Redis management

### Code Generation

-   **`yarn g:codegen`** - Generate GraphQL types and operations
-   **`yarn g:husky`** - Install Git hooks
-   **`yarn g:commit`** - Interactive commit with conventional commits

## Getting Started

1. **Prerequisites**: Node.js, Yarn, Docker, Python (for moderation-algo)

2. **Setup**:

    ```bash
    yarn install
    yarn g:husky  # Install Git hooks
    ```

3. **Start Development Environment**:

    ```bash
    yarn g:dev  # Full local setup
    # or
    yarn g:dev-docker  # With Docker containers
    ```

4. **Database Setup**:
    ```bash
    yarn g:start-db
    yarn workspace @app/server prisma-db-push
    ```

## Documentation

For detailed documentation, visit: https://c2c-project.github.io/prytaneum/

## Contributing

See [CONTRIBUTING.md](contributing.md) for development guidelines and workflow.
