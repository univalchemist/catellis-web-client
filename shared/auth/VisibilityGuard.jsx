import * as React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

import meQueryWrapper from 'shared/auth/api.me.query';

// FIXME: Ideally, this component would be smart enough to render
//  multiple children.

export const VisibilityGuard = ({ me, children, isGuestViz }) => {
  const isAuthenticated = !!me.meUser;
  const isVisible = isGuestViz ? !isAuthenticated : isAuthenticated;

  // As HOC:
  return (
    isVisible ? (
      React.Children.only(children)
    ) : (
      false
    )
  );

  // Example with render props:
  // return (
  //   isAuthenticated ? (
  //     React.Children.only(render({}))
  //   ) : (
  //     false
  //   )
  // );

  // Example use of render props:
  //<VisibilityGuard render={() => (
  //  <li><Logout /></li>
  //)}/>
};

export default meQueryWrapper()(VisibilityGuard);
