import {Request, Response} from 'express';
import {generateAuthJWT} from '../security/generateJWT';

const login = async (req: Request, res: Response) => {
  // Authenticate that user credentials are valid
  const id = req.body.user + req.body.password;

  // Generate and return the tokens
  const tokens = generateAuthJWT(id);

  res.cookie('auth', tokens.refreshToken);

  return res.status(200).json({refreshToken: tokens.refreshToken});
};

export {
  login,
};
