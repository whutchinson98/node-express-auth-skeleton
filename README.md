# node-express-auth-skeleton

Basic Node Express Skeleton with JWT

### To Run

`docker build -t node-express-auth-skeleton .`

`docker run -p 8080:8080 --env.file ./env.list node-express-auth-skeleton:latest`

### Calls

PUT `/login` - Given valid user and password combo it returns the authorization token as well as an 'auth' cookie
