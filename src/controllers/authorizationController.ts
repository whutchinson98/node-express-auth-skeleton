import {Response} from 'express';
import {Request} from '../definitions/request';
import {generateAuthJWT, refreshTokens} from '../security/generateJWT';
import {LoginRequest} from '../definitions/loginRequest';
const {removeUsersTokens} = require('../security/jwtManager');

const login = async (req: LoginRequest, res: Response) => {
  const {user, password} = req.body;

  if (!user || !password) {
    return res.status(400).json(
        {
          error: true,
          message: 'user and password fields required.',
        });
  }

  // Authenticate that user credentials are valid
  const id = user + password;

  // Generate and return the tokens
  const tokens = generateAuthJWT(id);

  res.cookie('auth', tokens.refreshToken);

  return res.status(200).json({error: false, token: tokens.refreshToken});
};

const logout = async (req: Request, res: Response) => {
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
          message: 'Error occured removing users tokens. See Logs',
          error: true,
        });
  }

  res.clearCookie('auth');

  return res.status(200).json({message: 'Logout Successful', error: false});
};

const refreshToken = async (req: Request, res: Response) => {
  const {id} = req.user;
  const {refreshToken} = req.body;

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
