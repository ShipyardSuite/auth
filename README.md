# auth
Shipyard Authentification service

---

## Environmental variables required to run this service

- **SERVICE_NAME:** Name of microservice
- **SERVICE_PORT:** The port of the service to run at.
- **DATABASE_URL:** URL for Database.

## Usage
Start by running `docker-compose up -d` after environment variables have been defined.

- **LOGIN** page can be found at `/auth/login`
- **REGISTER** page can be found at `/auth/register`

## API

| Type | URL                  | Body                                        | Query               | Description                                          |
| ---- | -------------------- | ------------------------------------------- | ------------------- | ---------------------------------------------------- |
| GET  | `/auth/api/test`     |                                             |                     | Testing database connection of the service.          |
| POST | `/auth/api/login`    | `email`: **String**, `password`: **String** |                     | Login user and return a user-session token.          |
| GET  | `/auth/api/logout`   |                                             | `token`: **String** | Logout user and delete the users session.            |
| GET  | `/auth/api/verify`   |                                             | `token`: **String** | Verify a user by checking if the given token exist.  |
| POST | `/auth/api/register` | `email`: **String**, `password`: **String** |                     | Register a new user and return the registered email. |

## License
This project is released under the [Apache version 2](LICENSE) license.

