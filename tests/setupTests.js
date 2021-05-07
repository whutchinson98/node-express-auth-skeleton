const mongoose = require('mongoose');
const {createUser} = require('./helper.tests');

const initializeDatabase = async () => {
  process.env = {
    ACCESS_TOKEN_SECRET: 'ABC',
    ACCESS_TOKEN_TIME: '1800s',
    REFRESH_TOKEN_SECRET: 'ABCD',
    REFRESH_TOKEN_TIME: '2400s',
    ADMIN_PRIVATE_KEY: 'abcd123',
    BCRYPT_SALT_ROUNDS: 10,
  };

  const {user, tokens} = await createUser();

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

