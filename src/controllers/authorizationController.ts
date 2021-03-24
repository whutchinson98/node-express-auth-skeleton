import {Response} from 'express';
import {Request} from '../definitions/request';
import {generateAuthJWT} from '../security/generateJWT';
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

  return res.status(200).json({refreshToken: tokens.refreshToken});
};

const logout = async (req: Request, res: Response) => {
  const {id} = req.user;

  if (!id) {
    return res.status(400).json({
      message: 'No valid Id to logout with.',
      error: true,
    });
  }

  const result = await removeUsersTokens(id);

  if (!result) {
    return res.status(400).json(
        {
          message: 'Error occured removing users tokens. See Logs',
          error: true,
        });
  }

  return res.status(200).json({message: 'Logout Successful', error: false});
};
module.exports = {
  login,
  logout,
};
