import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import {JwtManager} from '../definitions/jwtManager';

const generateAuthJWT = (id: string) => {
  const token = jwt.sign({id: id},
      process.env.ACCESS_TOKEN_SECRET!,
      {expiresIn: process.env.ACCESS_TOKEN_TIME || '1800s'});

  const refreshToken = jwt.sign({id: id},
                       process.env.REFRESH_TOKEN_SECRET!,
                       {expiresIn: process.env.REFRESH_TOKEN_TIME || '240s'});

  return {
    token,
    refreshToken,
  };
};

/*
  Refreshes the token
*/
const refreshToken = (jwtManager: JwtManager,
    refreshToken: string,
    id: string) => {
  // refresh the token
  // if refresh token exists
  if ((refreshToken) && (refreshToken in jwtManager.getTokenList())) {
    const token = jwt.sign({id: id},
                           process.env.ACCESS_TOKEN_SECRET!,
                           {expiresIn: process.env.ACCESS_TOKEN_TIME});

    jwtManager.updateTokenList(token, refreshToken);

    return {
      error: false,
      token: token,
    };
  } else {
    return {
      error: true,
      message: 'Invalid refreshToken',
    };
  }
};

export {generateAuthJWT, refreshToken};
