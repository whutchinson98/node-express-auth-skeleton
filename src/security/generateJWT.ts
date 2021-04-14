import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const {addRefreshToken,
  checkForRefreshToken,
  updateRefreshToken} = require('./jwtManager');

/*
 Creates the accessToken and refreshToken
*/
const signTokens = (id:string) => {
  const token = jwt.sign({id: id},
      process.env.ACCESS_TOKEN_SECRET!,
      {expiresIn: process.env.ACCESS_TOKEN_TIME || '1800s'});

  const refreshToken = jwt.sign({id: token as string},
                       process.env.REFRESH_TOKEN_SECRET!,
                       {expiresIn: process.env.REFRESH_TOKEN_TIME || '240s'});

  return {
    token,
    refreshToken,
  };
};

/*
 Creates then places the accessToken and refreshToken for a given userId
*/
const generateAuthJWT = (id: string) => {
  const tokens = signTokens(id);

  addRefreshToken(tokens.refreshToken, tokens.token, id);

  return tokens;
};

/*
  Refreshes the token
*/
const refreshTokens = async (refreshToken: string, id: string) => {
  if (checkForRefreshToken(id, refreshToken)) {
    const tokens = signTokens(id);

    const success = await updateRefreshToken(id,
        tokens.refreshToken,
        tokens.token);

    return success ? {error: false, token: tokens.refreshToken}:
    {error: true, message: 'Issue updating tokens'};
  } else {
    return {
      error: true,
      message: 'Invalid refreshToken',
    };
  }
};

export {generateAuthJWT, refreshTokens};
