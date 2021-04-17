import app from '../../src/index';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
const request = supertest(app);
const {signToken} = require('../helper.tests');

describe('Refresh Route', () => {
  test('200 OK', async () => {
    const response = await request.put('/auth/refreshtoken')
        .withCredentials()
        .set('cookie', `auth=${(global as any).authCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.token).toBeTruthy();
  });

  test('401 No User present', async () => {
    const response = await request.put('/auth/refreshtoken')
        .withCredentials()
        .set('cookie', `auth=${jwt.sign({id: signToken({wrong: true})},
        process.env.REFRESH_TOKEN_SECRET as string,
        {expiresIn: process.env.REFRESH_TOKEN_TIME})}`);

    expect(response.status).toBe(401);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('Need user id and refresh token');
  });

  test('400 Error in Refreshing Token', async () => {
    const response = await request.put('/auth/refreshtoken')
        .withCredentials()
        .set('cookie', `auth=${jwt.sign({id: signToken({id: 'badID'})},
        process.env.REFRESH_TOKEN_SECRET as string,
        {expiresIn: process.env.REFRESH_TOKEN_TIME})}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('Invalid refreshToken');
  });
});
