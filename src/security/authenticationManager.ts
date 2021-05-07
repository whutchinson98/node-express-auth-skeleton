import {User} from '../models/user.model';
import bcrypt from 'bcrypt';
import * as logger from '../utils/logger';

/**
 * @param {string} username
 * @param {string} password
 * @return {Promise<boolean>} whether the password is valid for the user
 */
export const authenticate = async (username: string, password: string)
:Promise<string> => {
  const user = await User.findOne({username: username});

  if (!user) {
    return '';
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return '';
  }

  return user.id;
};

/**
 * @param {string} username
 * @return {Promise<boolean>} whether the user exists or not
*/
export const checkUserExists = async (username: string)
:Promise<string> => {
  try {
    const user = await User.findOne({username: username});

    if (user) {
      return 'User was found with that username';
    }
    return '';
  } catch (err) {
    logger.logError(err);
    return 'Error occurred looking for user';
  }
};
