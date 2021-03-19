import {TokenListEntry} from '../definitions/tokenListEntry';

/**
* Manages the token list for refresh tokens
*/
export default class JwtManager {
  private tokenList: Map<String, TokenListEntry>;

  /**
  * Initializes the tokenList
  */
  constructor() {
    console.log('JWT Manager Intialized');
    this.tokenList = new Map<String, TokenListEntry>();
  }

  /*
    Gets the token list
  */
  getTokenList = () => {
    return this.tokenList;
  }

  /*
    Updates a given refresh token in the token list with the new token
  */
  updateTokenList = (token: String, refreshToken: String) => {
    this.tokenList.set(refreshToken, {
      token,
      refreshToken,
    });
  };
};
