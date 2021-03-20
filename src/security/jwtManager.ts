const RefreshToken = require('../models/refreshToken.model');

/*
  Checks if a given refresh token for a user exists and is valid
*/
const checkForRefreshToken = async (userId: String, refreshToken: String) => {
  const userToken = await RefreshToken.findOne({userId: userId});

  if (!userToken) {
    console.log(`No token for ${userId} found`);
    return false;
  }

  if (refreshToken.toString() !== userToken.refreshToken.toString()) {
    console.log('Refresh tokens does not match what is in the database');
    return false;
  }

  return true;
};

/*
 Updates the users refresh token and token
*/
const updateRefreshToken = async (userId: String,
    refreshToken: String,
    token: String) => {
  try {
    await RefreshToken.findOneAndUpdate({userId: userId,
      refreshToken: refreshToken,
      accessToken: token},
    {$set: {
      refreshToken: refreshToken,
      accessToken: token,
    }});
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};


/*
 Adds a new refresh token object to the database for the user
*/
const addRefreshToken = async (refreshToken: String,
    token: String,
    userId: String) => {
  const userToken = new RefreshToken({
    userId: userId,
    accessToken: token,
    refreshToken: refreshToken,
  });

  try {
    await userToken.save();
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
};

exports = {
  checkForRefreshToken,
  updateRefreshToken,
  addRefreshToken,
};
