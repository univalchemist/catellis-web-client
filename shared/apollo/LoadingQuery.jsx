import React from 'react';
import { Query } from 'react-apollo';

import GenericError from 'shared/generic-error/GenericError';
import LoadingIndicator from 'shared/loading-indicator';

const LoadingQuery = ({children, ...props}) => (
  <Query {...props}>
    {({loading, error, data}) => {
      if (loading) return (<LoadingIndicator />);

      if (error) {
        console.error(error);
        return (<GenericError />);
      }

      return children({
        data
      });
    }}
  </Query>
);

export default LoadingQuery;
