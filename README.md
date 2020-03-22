# auth

Shipyard Microservice

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
| GET  | `/api/logout`   |                                             | **token**: `String` |                       | Logout user and delete the users session.               |
| GET  | `/api/verify`   |                                             | **token**: `String` |                       | Verify a user by checking if the given token exist.     |
| GET  | `/api/token`    |                                             | **token**: `String` |                       | Verify a user by checking if the given token can login. |
| POST | `/api/register` | `email`: **String**, `password`: **String** |                     |                       | Register a new user and return the registered email.    |

## Usage

**LOCAL**: create a `.env` file, with the specified variables and run `docker-compose up -d --build`.

## License

This project is released under the [Apache version 2](LICENSE) license.

