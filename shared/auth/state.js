
export const defaultState = {
  authStatus: {
    __typename: 'AuthStatus',
    authToken: localStorage.getItem('AUTH_TOKEN'),
    isLoggedIn: false,
    user: null
  }
};
