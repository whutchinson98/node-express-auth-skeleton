import {Response} from 'express';
import {Request} from '../definitions/request';
import bcrypt from 'bcrypt';
const User = require('../models/user.model');
require('dotenv').config();

const createUser = async (req: Request, res: Response) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: true,
      message: 'Username and Password are required',
    });
  }

  const saltRounds = process.env.BCRYPT_SALT_ROUNDS ?
    parseInt(process.env.BCRYPT_SALT_ROUNDS) : 10;

  const user = new User({
    username,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(
        (saltRounds as number),
    )),
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: true,
      message: 'Error saving user. See logs',
    });
  }

  return res.json({
    error: false,
    user: user,
  });
};

const editUser = async (req: Request, res: Response) => {
  const {username, password, id} = req.body;

  if (!username || !password || ! id) {
    return res.status(400).json({
      error: true,
      message: 'Username and Password are required',
    });
  }

  const saltRounds = process.env.BCRYPT_SALT_ROUNDS ?
    process.env.BCRYPT_SALT_ROUNDS : 10;

  try {
    const user = await User.findByIdAndUpdate(id, {
      username: username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(
          (saltRounds as number),
      )),
    });
    return res.json({
      error: false,
      user: user,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: true,
      message: 'Error saving user. See logs',
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const {id} = req.body;

  if (!id) {
    return res.status(400).json({
      message: 'Id is required to delete User',
      error: true,
    });
  }

  const result = await User.findByIdAndDelete(id);

  if (!result) {
    return res.status(400).json({
      message: `No user found with id ${id}`,
      error: true,
    });
  }
  return res.json({
    message: 'User deleted',
    error: false,
  });
};

module.exports = {
  createUser,
  editUser,
  deleteUser,
};