const mongoose = require('mongoose');

global.beforeAll(async (done) => {
    process.env = {
        ACCESS_TOKEN_SECRET: 'ABC',
        ACCESS_TOKEN_TIME: '1800s',
        REFRESH_TOKEN_SECRET: 'ABCD',
        REFRESH_TOKEN_TIME: '2400s',
        ADMIN_PRIVATE_KEY: 'abcd123'
    };

    //setup stuff here
    await mongoose.connect(global.__MONGO_URI__,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        },
        async (err) => {
            //await initializeDatabase();
            if (err) {
                console.error(err);
                process.exit(1);
            }

        done();
    });
});

