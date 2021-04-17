const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const bcrypt = require('bcrypt');
const {generateAuthJWT} = require('../src/security/generateJWT');

const initializeDatabase = async () => {
  process.env = {
    ACCESS_TOKEN_SECRET: 'ABC',
    ACCESS_TOKEN_TIME: '1800s',
    REFRESH_TOKEN_SECRET: 'ABCD',
    REFRESH_TOKEN_TIME: '2400s',
    ADMIN_PRIVATE_KEY: 'abcd123',
    BCRYPT_SALT_ROUNDS: 10,
  };

  const user = new User({
    username: 'will',
    password: bcrypt.hashSync('password',
        bcrypt.genSaltSync(10)),
  });

  await user.save();

  const tokens = generateAuthJWT(user.id);

  global.authCookie = tokens.refreshToken;
  global.user = user;
};


global.beforeEach(async (done) => {
  // setup stuff here
  await mongoose.connect(global.__MONGO_URI__,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
      async (err) => {
        await initializeDatabase();
        if (err) {
          console.error(err);
          process.exit(1);
        }
        done();
      });
});

global.afterEach(async () => {
  await mongoose.disconnect();
});

