const mongoose = require('mongoose');

global.beforeAll(async (done) => {
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

