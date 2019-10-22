// FIXME: This is a placeholder component to test auth functionality.
//  It should be safe to remove once user session presentation is in the app.

import * as React from 'react';

import meQueryWrapper from 'shared/auth/api.me.query';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';

class Me extends React.Component {
  render() {
    const { loading, meUser } = this.props.me || {loading: false, meUser: null};

    if (loading || !meUser) {
      return (<LoadingIndicator />);
    }

    return (
      <div>
        <p>My user details:</p>
        <ul>
          <li>id: {meUser.id}</li>
          <li>email: {meUser.email}</li>
        </ul>
      </div>
    );
  }
}

export default meQueryWrapper()(Me);
