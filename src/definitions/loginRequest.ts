import {Request} from 'express';

// TODO Add in UserRequest model to separate the differences
export interface LoginRequest extends Request {
  body: {
    user: string,
    password: string,
    username: string,
  }
};
