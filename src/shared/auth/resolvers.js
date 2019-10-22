export const logInUser = (
  _,
  {user, token},
  {cache}
) => {
  const data = {
    authStatus: {
      __typename: 'AuthStatus',
      isLoggedIn: true,
      user: {
        ...user,
        __typename: 'User'
      }
    },
  };
  cache.writeData({ data });

  localStorage.setItem('AUTH_TOKEN', token);

  return data;
};

export const logOutUser = (
  _,
  __,
  {cache}
) => {
  const data = {
    authStatus: {
      __typename: 'AuthStatus',
      isLoggedIn: false,
      user: null
    },
  };
  cache.writeData({ data });

  localStorage.removeItem('AUTH_TOKEN');

  return data;
};
