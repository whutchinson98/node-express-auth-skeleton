# Usage

This repo is meant to a starter template for an authentication system.
It provides you with 3 calls that can be expanded on to incorporate other databases and steps in
authentication process. Currently the login does not verify the user is valid and creates an 'id'
from the combination of the username and password that is send into the login request.

### POST: `/login`
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

### PUT: `/refreshtoken`
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

### GET: `/logout`
Usage:
- Deletes the user's RefreshToken object from the database

Returns:
    {
        error: boolean,
        message: string
    }


### Error Formatting:
Responses all contain an error boolean and if there is an error there will be a message in the response body

    {
        error: boolean,
        message: string
    }
