const RefreshToken = require('../models/refreshToken.model');

/*
  Checks if a given refresh token for a user exists and is valid
*/
const checkForRefreshToken = async (userId: string, refreshToken: string) => {
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
const updateRefreshToken = async (userId: string,
    refreshToken: string,
    token: string) => {
  try {
    const userTokens = await RefreshToken.findOne({userId: userId});

    if(!userTokens){
      console.log("No match found");
      return false;
    }

    userTokens.accessToken = token;
    userTokens.refreshToken = refreshToken;

    await userTokens.save();
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};


/*
 Adds a new refresh token object to the database for the user
*/
const addRefreshToken = async (refreshToken: string,
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
    console.log(err);
    return false;
  }

  return true;
};

/*
  Removes the tokens for a given user to log them out
*/
const removeUsersTokens = async (id: string) => {
  try {
    await RefreshToken.deleteMany({userId: id}).exec();
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};

module.exports = {
  checkForRefreshToken,
  updateRefreshToken,
  addRefreshToken,
  removeUsersTokens,
};
