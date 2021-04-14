const mongoose = require('mongoose');
const {generateAuthJWT} = require('../src/security/generateJWT');

const initializeDatabase = () => {
    process.env = {
        ACCESS_TOKEN_SECRET: 'ABC',
        ACCESS_TOKEN_TIME: '1800s',
        REFRESH_TOKEN_SECRET: 'ABCD',
        REFRESH_TOKEN_TIME: '2400s',
        ADMIN_PRIVATE_KEY: 'abcd123'
    };

    const tokens = generateAuthJWT('123');

    global.authCookie = tokens.refreshToken;
};


global.beforeEach(async (done) => {
    //setup stuff here
    await mongoose.connect(global.__MONGO_URI__,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        },
        async (err) => {
            initializeDatabase();
            if (err) {
                console.error(err);
                process.exit(1);
            }
          done();
    });
});

global.afterEach(async () => {
  await mongoose.disconnect();
})

