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
    process.env.BCRYPT_SALT_ROUNDS : 10;

  const user = new User({
    username,
    password: bcrypt.hash(password, bcrypt.genSaltSync(
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
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: true,
      message: 'Username and Password are required',
    });
  }

  if (!req.user || !req.user.id) {
    return res.status(400).json({
      message: 'No valid User or Id to logout with.',
      error: true,
    });
  }

  const {user} = req.user;
  const {id} = user;

  const saltRounds = process.env.BCRYPT_SALT_ROUNDS ?
    process.env.BCRYPT_SALT_ROUNDS : 10;

  try {
    await User.findByIdAndUpdate(id, {
      username: username,
      password: bcrypt.hash(password, bcrypt.genSaltSync(
          (saltRounds as number),
      )),
    });
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

const deleteUser = async (req: Request, res: Response) => {
  const {id} = req.body;

  if (!id) {
    return res.status(400).json({
      message: 'Id is required to delete User',
      error: true,
    });
  }

  const result = await User.deleteOne({_id: id}).exec();

  if (result.deletedCount) {
    return res.status(400).json({
      message: `No user found with id ${id}`,
      error: true,
    });
  }
};

module.exports = {
  createUser,
  editUser,
  deleteUser,
};
