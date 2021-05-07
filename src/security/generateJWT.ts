import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import {addRefreshToken,
  checkForRefreshToken,
  updateRefreshToken} from './jwtManager';
import * as logger from '../utils/logger';
import {ITokenListEntry} from '../definitions/ITokenListEntry';

/**
 * Creates the accessToken and refreshToken
 * @param{string} id
 * @return{ITokenListEntry} returns the token and refresh token
*/
const signTokens = (id:string):ITokenListEntry => {
  const token = jwt.sign({id: id},
      process.env.ACCESS_TOKEN_SECRET!,
      {expiresIn: process.env.ACCESS_TOKEN_TIME || '1800s'});

  const refreshToken = jwt.sign({id: token as string},
                       process.env.REFRESH_TOKEN_SECRET!,
                       {expiresIn: process.env.REFRESH_TOKEN_TIME || '240s'});

  logger.logDebug('Signed tokens');

  return {
    token,
    refreshToken,
  };
};

/**
 * Creates then places the accessToken and refreshToken for a given userId
 * @param{string} id
 * @return{Promise<ITokenListEntry>} returns the token and refresh token
*/
const generateAuthJWT = async (id: string):Promise<ITokenListEntry> => {
  const tokens = signTokens(id);

  await addRefreshToken(tokens.refreshToken, tokens.token, id);

  return tokens;
};

interface IRefreshTokensResponse {
  error:boolean;
  message?:string;
  token?:string
};

/**
 * Refreshes the token
 * @param{string} refreshToken
 * @param{string} id
 * @return{Promise<IRefreshTokensResponse>} returns an error
 * if the refresh tokens
 * were successful, a message if they were not
 * and the refresh token if they were
*/
const refreshTokens = async (refreshToken: string,
    id: string):Promise<IRefreshTokensResponse> => {
  if (await checkForRefreshToken(id, refreshToken)) {
    const tokens = signTokens(id);

    const tokenStatus = await updateRefreshToken(id,
        tokens.refreshToken,
        tokens.token);

    return tokenStatus === 'success' ?
      {error: false, token: tokens.refreshToken}:
      {error: true, message: tokenStatus};
  } else {
    logger.logDebug(`Invalid refresh token, token: ${refreshToken}, id: ${id}`);
    return {
      error: true,
      message: 'Invalid refreshToken',
    };
  }
};

export {generateAuthJWT, refreshTokens};
