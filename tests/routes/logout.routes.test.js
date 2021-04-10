const app = require('../../src/index');
const supertest = require('supertest');
const request = supertest(app);
const jwt = require('jsonwebtoken');

describe('Logout Route', () => {
  test('200 OK', async () => {
    const response = await request.get('/logout')
        .withCredentials()
        .set('cookie', `auth=${global.authCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBeTruthy();
    expect(response.body.error).toBeFalsy();
  });

  test('400 No User', async () => {
    const response = await request.get('/logout')
        .withCredentials()
        .set('cookie', `auth=${jwt.sign({wrong: true},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: process.env.REFRESH_TOKEN_TIME})}`);

    expect(response.status).toBe(400);
    expect(response.body.message)
        .toEqual('No valid User or Id to logout with.');
    expect(response.body.error).toBeTruthy();
  });
});

