import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';

const query = gql`
  query MeQuery {
    meUser {
      id, email
    }
  }
`;

const graphQlWrapper = graphql(query);

class UserWelcome extends React.Component {
  render() {
    const { loading, meUser } = this.props.data || {loading: false, meUser: null};

    if (loading) {
      return (<LoadingIndicator />);
    }

    if (meUser == null) {
      return (
        <p>Welcome, guest!</p>
      );
    }

    return (
      <p>Welcome, {meUser.email}!</p>
    );
  }
}

export default graphQlWrapper(UserWelcome);
