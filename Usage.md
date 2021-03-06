# Usage

This repo is meant to a starter template for an authentication system.
It provides you with 3 calls that can be expanded on to incorporate other databases and steps in
authentication process. Currently the login does not verify the user is valid and creates an 'id'
from the combination of the username and password that is send into the login request.

## Auth Calls

### POST: `/auth/login`
Usage:
- Logs in the user and provides them with an auth cookie containing the refresh token as well as the refresh token returned
in the body

Request Body:
    {
      "user": string,
      "password": string
    }

Returns:
    {
      "error": boolean,
      "token": string
    }

    cookie[auth] - contains the refresh token for authenticated requests

### PUT: `/auth/refreshtoken`
Usage:
- Refreshes the users token and gives them an updated refresh token

Request Body:
    {
      "refreshToken": string
    }

Returns:
    {
      "error": boolean,
      "token": string
    }

    cookie[auth] - contains the refresh token for authenticated requests

### GET: `/auth/logout`
Usage:
- Deletes the user's RefreshToken object from the database and clears their auth cookie

Returns:
    {
      "error": boolean,
      "message": string
    }

## Admin Calls

To use the admin calls you must provide the privatekey in your request headers.
The privatekey is the `ADMIN_PRIVATE_KEY` in the environment variables.

### POST `/admin/create`
Usage:
- Creates a user given a username and password

Request Body:
    {
      "username": string,
      "password": string
    }

Returns:
    {
      "error": boolean,
      "user": user
    }

### PUT `/admin/edit`
Usage:
- Creates a user given a username and password

Request Body:
    {
      "id": string,
      "username": string,
      "password": string
    }

Returns:
    {
      "error": boolean,
      "user": user
    }

### PUT `/admin/remove`
Usage:
- Removes a specified user
Request Body:
    {
      "id": string
    }

Returns:
    {
      "error": boolean,
      "message": string
    }

## Health Calls

### GET `/health/misc`
Usage:
- Returns `Healthy` as a way to check if the service is still running

Returns:
    {
      "error": boolean,
      "message": string
    }

### GET `/health/connections`
Usage:
- Returns the Connection status of the mongoDB or any errors

Returns:
    {
      "error": boolean,
      "message": string,
      "mongoose": string
    }

## Error Formatting:
Responses all contain an error boolean and if there is an error there will be a message in the response body

    {
        "error": boolean,
        "message": string
    }
