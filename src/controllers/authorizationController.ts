import {Response} from 'express';
import {IRequest} from '../definitions/IRequest';
import {generateAuthJWT, refreshTokens} from '../security/generateJWT';
import {authenticate} from '../security/authenticationManager';
import {removeUsersTokens} from '../security/jwtManager';
import * as logger from '../utils/logger';

const login = async (req: IRequest, res: Response) => {
  const {user, password} = req.body;

  if (!user || !password) {
    logger.logDebug('No username or password');
    return res.status(400).json(
        {
          error: true,
          message: 'user and password fields required.',
        });
  }

  const isAuth = await authenticate(user, password);

  if (isAuth === '') {
    logger.logDebug('User is not authenticated');
    return res.status(401).json({
      error: true,
      message: 'Invalid user or password',
    });
  }

  // Generate and return the tokens
  const tokens = await generateAuthJWT(isAuth);

  res.cookie('auth', tokens.refreshToken);

  logger.logDebug('User authenticated and cookie set');
  return res.status(200).json({error: false, token: tokens.refreshToken});
};

const logout = async (req: IRequest, res: Response) => {
  if (!req.user || !req.user.id) {
    return res.status(400).json({
      message: 'No valid User or Id to logout with.',
      error: true,
    });
  }

  const {id} = req.user;

  const result = await removeUsersTokens(id);

  if (!result) {
    return res.status(400).json(
        {
          message: 'Error occurred removing users tokens. See Logs',
          error: true,
        });
  }

  res.clearCookie('auth');

  return res.status(200).json({message: 'Logout Successful', error: false});
};

const refreshToken = async (req: IRequest, res: Response) => {
  const {id} = req.user;
  const {refreshToken} = req.refreshToken ? req : req.body;

  if (!id || !refreshToken) {
    return res.status(401).json({
      message: 'Need user id and refresh token',
      error: true,
    });
  }

  const result = await refreshTokens(refreshToken, id);

  if (result.error) {
    return res.status(400).json({
      message: result.message,
      error: true,
    });
  }

  res.cookie('auth', result.token);

  return res.status(200).json({error: false, token: result.token});
};

module.exports = {
  login,
  logout,
  refreshToken,
};
