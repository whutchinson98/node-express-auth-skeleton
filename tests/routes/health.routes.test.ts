import app from '../../src/index';
import supertest from 'supertest';
const request = supertest(app);

describe('Health Route', () => {
  test('Misc 200 OK', async () => {
    const response = await request.get('/health/misc');

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Healthy');
    expect(response.body.error).toBeFalsy();
  });

  test('Connections 200 OK', async () => {
    const response = await request.get('/health/connections');

    expect(response.status).toBe(200);
    expect(response.body.mongoose).toEqual('CONNECTED');
    expect(response.body.error).toBeFalsy();
  });
});
