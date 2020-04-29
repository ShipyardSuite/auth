![GitHub last commit (branch)](https://img.shields.io/github/last-commit/shipyardsuite/auth/develop?color=3cafe2&style=flat-square)
![Docker Image Version (latest by date)](https://img.shields.io/docker/v/shipyardsuite/auth?color=3cafe2&sort=date&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/shipyardsuite/auth?color=3cafe2&style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/shipyardsuite/auth?color=3cafe2&style=flat-square)
![Maintenance](https://img.shields.io/maintenance/yes/2020?color=3cafe2&style=flat-square)
![GitHub](https://img.shields.io/github/license/shipyardsuite/auth?color=3cafe2&style=flat-square)

# auth

Shipyard Authentification service

---

## Environment variables

| Name                  | Type     | Default | Description                       |
| --------------------- | -------- | ------- | --------------------------------- |
| **SERVICE_NAME:**     | `String` | auth    | Microservice name.                |
| **SERVICE_PORT:**     | `Number` | 3002    | Microservice port.                |
| **DATABASE_URL:**     | `String` |         | Database url.                     |

## API

| Type | URL             | Body                                        | Query               | Response              | Description                                             |
| ---- | ----------------| ------------------------------------------- | ------------------- | --------------------- | ------------------------------------------------------- |
| GET  | `/api/status`   |                                             |                     | **online**: `boolean` | Testing service connection.                             |
| POST | `/api/login`    | `email`: **String**, `password`: **String** |                     |                       | Login user and return a user-session token.             |
| GET  | `/api/verify`   |                                             | **token**: `String` |                       | Verify a user by checking if the given token exist.     |
| GET  | `/api/token`    |                                             | **token**: `String` |                       | Verify a user by checking if the given token can login. |
| POST | `/api/register` | `email`: **String**, `password`: **String** |                     |                       | Register a new user and return the registered email.    |

## Usage

**LOCAL**: create a `.env` file, with the specified variables and run `docker-compose up -d --build`.

## License

This project is released under the [Apache version 2](LICENSE) license.

