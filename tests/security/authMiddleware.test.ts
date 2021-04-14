const auth = require('../../src/security/authMiddleware');

const request = {
  headers: {

  },
  body: {
    token: '',
  },
  user: {
  },
  query: {
  },
};

const response = {
  send: function() {},
  json: function(body: any) {
    return body;
  },
  status: function(s) {
    this.statusCode = s;
    return this;
  },
  statusCode: 0,
};

describe('Auth Middleware', () => {
  it('Returns Successfully', async () => {
    request.body.token = (global as any).authCookie;

    await new Promise((resolve) => {
      auth(request, response, (err) => {
        if (!err) {
          resolve(response);
        }
      });
    });

    expect(Object.keys(request.user).length).toBeGreaterThan(0);
  });
});
