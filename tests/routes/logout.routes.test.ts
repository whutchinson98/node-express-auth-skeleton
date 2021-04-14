import app from '../../src/index';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
const request = supertest(app);

const signToken = (tokenContents: any):string => {
  return jwt.sign(tokenContents, process.env.ACCESS_TOKEN_SECRET as string,
      {expiresIn: process.env.ACCESS_TOKEN_TIME});
};

describe('Logout Route', () => {
  test('200 OK', async () => {
    const response = await request.get('/logout')
        .withCredentials()
        .set('cookie', `auth=${(global as any).authCookie}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBeTruthy();
    expect(response.body.error).toBeFalsy();
  });

  test('400 No User', async () => {
    const response = await request.get('/logout')
        .withCredentials()
        .set('cookie', `auth=${jwt.sign({id: signToken({wrong: true})},
            process.env.REFRESH_TOKEN_SECRET as string,
            {expiresIn: process.env.REFRESH_TOKEN_TIME})}`);

    expect(response.status).toBe(400);
    expect(response.body.message)
        .toEqual('No valid User or Id to logout with.');
    expect(response.body.error).toBeTruthy();
  });
});

