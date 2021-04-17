const auth = require('../../src/security/authMiddleware');

let request;
let response;
beforeEach(() => {
  request = {
    headers: {
    },
    body: {
      token: '',
    },
    user: {
    },
    query: {
    },
    url: '',
  };

  response = {
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
});

describe('Auth Middleware', () => {
  it('Returns Successfully For Non Admin', async () => {
    request.body.token = (global as any).authCookie;

    request.url = '/notAdmin/';

    await new Promise((resolve) => {
      auth(request, response, (err) => {
        if (!err) {
          resolve(response);
        }
      });
    });

    expect(Object.keys(request.user).length).toEqual(3);
  });

  it('Returns Successfully For Non Admin Using Admin Key', async () => {
    request.body.token = (global as any).authCookie;

    request.url = '/notAdmin/';

    await new Promise((resolve) => {
      auth(request, response, (err) => {
        if (!err) {
          resolve(response);
        }
      });
    });

    expect(Object.keys(request.user).length).toEqual(3);
  });

  it('Returns Successfully For Admin', async () => {
    request.body.token = (global as any).authCookie;

    request.url = '/notAdmin/';

    request.headers['privatekey'] = process.env.ADMIN_PRIVATE_KEY;

    await new Promise((resolve) => {
      auth(request, response, (err) => {
        if (!err) {
          resolve(response);
        }
      });
    });

    expect(Object.keys(request.user).length).toEqual(0);
  });
});
