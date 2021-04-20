# node-express-auth-skeleton

Basic Node Express Skeleton with Refresh Tokens using JWT.

### Setup
Create a .env file in the root directory with the following variables
| Variable               | Description                                       |
| ---------------------- |:-------------------------------------------------:|
| DB\_URL                | The MongoDB connection string                     |
| ACCESS\_TOKEN\_SECRET  | The secret for the access token                   |
| ACESS\_TOKEN\_TIME     | The lifetime for the access token                 |
| REFRESH\_TOKEN\_SECRET | The secret for the refresh token                  |
| REFRESH\_TOKEN\_TIME   | The lifetime for the refresh token                |
| ADMIN\_PRIVATE\_KEY    | Admin private key if sent in body authorizes call |
| BCRYPT\_SALT\_ROUNDS   | Number of salt rounds used for bcrypt             |
| LOG\_LEVEL             | Sets the log level for the api                    |

### Commands

#### NPM

**Install Dependencies:**

`npm install`

**Lint:**

`npm run lint`

**Lint Fix:**

`npm run lint:fix`

**Test:**

`npm run test`

**Test with Coverage:**

`npm run test:coverage`

**Build:**

`npm run build`

**Build & Deploy:**

`npm run build:dev`

**Deploy:**
`npm run start`


#### Docker

**Build Docker Image:**

`docker build -t node-express-auth-skeleton .`

**Deploy Docker Image:**

`docker run -p 8080:8080 --env-file ./env.list node-express-auth-skeleton:latest`
