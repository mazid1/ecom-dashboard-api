# ecom-dashboard-api

Web API built with [Nest](https://github.com/nestjs/nest) framework. It talks to a Mongodb server for data management.

## Installation

```bash
$ pnpm install
```

## Running the app

### Required environment variables

Create a `.env` file at the root directory of the project and provide your desired values of thies variables. Jwt expiration time is in seconds.

```.env
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_DATABASE=
MONGO_URI=
JWT_ACCESS_TOKEN_SECRET=
JWT_ACCESS_TOKEN_EXPIRATION_TIME=
JWT_REFRESH_TOKEN_SECRET=
JWT_REFRESH_TOKEN_EXPIRATION_TIME=
```

### Run local Mongodb server inside Docker container

```bash
# docker command
docker-compose up

# using pnpm
pnpm run up
```

### Run the API server

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# test coverage
$ pnpm run test:cov
```
