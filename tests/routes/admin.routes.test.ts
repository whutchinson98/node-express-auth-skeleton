import app from '../../src/index';
import supertest from 'supertest';
const request = supertest(app);

describe('Admin Route', () => {
  test('Create User 200 OK', async () => {
    const response = await request.post('/admin/create').send({
      username: 'will2',
      password: 'password',
    }).set({'privatekey': process.env.ADMIN_PRIVATE_KEY});

    expect(response.status).toBe(200);
    expect(response.body.user).toBeTruthy();
    expect(response.body.error).toBeFalsy();
  });
  test('Create User 400 No username or password', async () => {
    const response = await request.post('/admin/create').send({
    }).set({'privatekey': process.env.ADMIN_PRIVATE_KEY});

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Username and Password are required');
    expect(response.body.error).toBeTruthy();
  });
  test('Create User 400 Error creating user', async () => {
    const response = await request.post('/admin/create').send({
      username: {badObject: []},
      password: 'bad',
    }).set({'privatekey': process.env.ADMIN_PRIVATE_KEY});

    expect(response.status).toBe(500);
    expect(response.body.message).toEqual('Error saving user. See logs');
    expect(response.body.error).toBeTruthy();
  });
  test('Edit User 200 OK', async () => {
    const response = await request.put('/admin/edit').send({
      username: 'will2',
      password: 'password',
      id: (global as any).user.id,
    }).set({'privatekey': process.env.ADMIN_PRIVATE_KEY});

    expect(response.status).toBe(200);
    expect(response.body.user._id).toBeTruthy();
    expect(response.body.error).toBeFalsy();
  });
  test('Edit User 400 No username or password', async () => {
    const response = await request.put('/admin/edit').send({
    }).set({'privatekey': process.env.ADMIN_PRIVATE_KEY});

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Username and Password are required');
    expect(response.body.error).toBeTruthy();
  });
  test('Edit User 400 Error saving user', async () => {
    const response = await request.put('/admin/edit').send({
      username: {badObject: []},
      password: 'bad',
      id: (global as any).user.id,
    }).set({'privatekey': process.env.ADMIN_PRIVATE_KEY});

    expect(response.status).toBe(500);
    expect(response.body.message).toEqual('Error saving user. See logs');
    expect(response.body.error).toBeTruthy();
  });
  test('Delete User 200 OK', async () => {
    const response = await request.put('/admin/remove').send({
      id: (global as any).user.id,
    }).set({'privatekey': process.env.ADMIN_PRIVATE_KEY});

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('User deleted');
    expect(response.body.error).toBeFalsy();
  });
  test('Delete User 400 No id', async () => {
    const response = await request.put('/admin/remove').send({
    }).set({'privatekey': process.env.ADMIN_PRIVATE_KEY});

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Id is required to delete User');
    expect(response.body.error).toBeTruthy();
  });
  test('Delete User 400 no user found with the given id', async () => {
    const response = await request.put('/admin/remove').send({
      id: '607a1998a295da17d8823ebe',
    }).set({'privatekey': process.env.ADMIN_PRIVATE_KEY});

    expect(response.status).toBe(400);
    expect(response.body.message)
        .toEqual('No user found with id 607a1998a295da17d8823ebe');
    expect(response.body.error).toBeTruthy();
  });
});
