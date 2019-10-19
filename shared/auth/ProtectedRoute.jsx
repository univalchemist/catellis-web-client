import * as React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

import meQueryWrapper from 'shared/auth/api.me.query';

export const ProtectedRoute = ({ me, component: Component, layout: Layout, ...rest }) => {
  const isAuthenticated = !!me.meUser;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default meQueryWrapper()(ProtectedRoute);
