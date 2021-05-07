import {RefreshToken} from '../models/refreshToken.model';
import * as logger from '../utils/logger';

/**
 * Checks if a given refresh token for a user exists and is valid
 * @param{string} userId
 * @param{string} refreshToken
 * @return{Promise<boolean>} whether or not the given refresh token exists
*/
export const checkForRefreshToken = async (userId: string,
    refreshToken: string):Promise<boolean> => {
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

/**
 * Updates the users refresh token and token
 * @param{string} userId
 * @param{string} refreshToken
 * @param{string} token
 * @return{Promise<string>} message as to whether or not updating was
 * successful
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
    logger.logDebug('User token saved');
  } catch (err) {
    logger.logError(err);
    return 'error occurred saving token';
  }
  return 'success';
};


/**
 * Adds a new refresh token object to the database for the user
 * @param{string} refreshToken
 * @param{string} token
 * @param{string} userId
 * @return{Promise<boolean>} whether or not adding refresh token was successful
*/
export const addRefreshToken = async (refreshToken: string,
    token: string,
    userId: string):Promise<boolean> => {
  const userToken = new RefreshToken({
    userId: userId,
    accessToken: token,
    refreshToken: refreshToken,
  });

  try {
    await userToken.save();
    logger.logDebug('User token saved');
  } catch (err) {
    logger.logError(err);
    return false;
  }

  return true;
};

/**
 * Removes the tokens for a given user to log them out
 * @param{string} id
 * @return{Promise<boolean>} whether deleting user token was successful
*/
export const removeUsersTokens = async (id: string):Promise<boolean> => {
  try {
    const result = await RefreshToken.deleteMany({userId: id}).exec();

    if (!result) {
      logger.logError(`Error deleting refresh token ${id}`);
      return false;
    }

    logger.logDebug('RefreshToken deleted');
    return (result?.deletedCount || 0) > 0;
  } catch (err) {
    logger.logError(err);
    return false;
  }
};

