const User = require('../models/user.model');
import bcrypt from 'bcrypt';

/**
 * @param {string} username
 * @param {string} password
 * @return {boolean} whether the password is valid for the user
 */
export const authenticate = async (username: string, password: string)
:Promise<string> => {
  const user = await User.findOne({username: username});

  if (!user) {
    return '';
  }

  if (!bcrypt.compare(password, user.password)) {
    return '';
  }

  return user.id;
};
