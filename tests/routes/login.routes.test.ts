import app from '../../src/index';
import supertest from 'supertest';
const request = supertest(app);

describe('Login Route', () => {
  test('200 OK', async () => {
    const response = await request.post('/login').send({
      user: 'Will',
      password: 'password',
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  test('400 No User', async () => {
    const response = await request.post('/login').send({
      password: 'password',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('user and password fields required.');
  });

  test('400 No Password', async () => {
    const response = await request.post('/login').send({
      user: 'Will',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('user and password fields required.');
  });
});

