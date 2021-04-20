const RefreshToken = require('../models/refreshToken.model');
import * as logger from '../utils/logger';

/*
  Checks if a given refresh token for a user exists and is valid
*/
export const checkForRefreshToken = async (userId: string,
    refreshToken: string) => {
  const userToken = await RefreshToken.findOne({userId: userId});

  if (!userToken) {
    logger.logDebug(`No token for ${userId} found`);
    return false;
  }

  if (refreshToken.toString() !== userToken.refreshToken.toString()) {
    logger.logDebug('Refresh tokens does not match what is in the database');
    return false;
  }

  return true;
};

/*
 Updates the users refresh token and token
*/
export const updateRefreshToken = async (userId: string,
    refreshToken: string,
    token: string):Promise<string> => {
  try {
    const userTokens = await RefreshToken.findOne({userId: userId});

    if (!userTokens) {
      logger.logDebug('No user found with token');
      return 'No user found';
    }

    userTokens.accessToken = token;
    userTokens.refreshToken = refreshToken;

    await userTokens.save();
  } catch (err) {
    logger.logError(err);
    return 'error occurred saving token';
  }
  return 'success';
};


/*
 Adds a new refresh token object to the database for the user
*/
export const addRefreshToken = async (refreshToken: string,
    token: string,
    userId: string) => {
  const userToken = new RefreshToken({
    userId: userId,
    accessToken: token,
    refreshToken: refreshToken,
  });

  try {
    await userToken.save();
  } catch (err) {
    logger.logError(err);
    return false;
  }

  return true;
};

/*
  Removes the tokens for a given user to log them out
*/
export const removeUsersTokens = async (id: string) => {
  try {
    const result = await RefreshToken.deleteMany({userId: id}).exec();
    return result.deletedCount > 0;
  } catch (err) {
    logger.logError(err);
    return false;
  }
};

