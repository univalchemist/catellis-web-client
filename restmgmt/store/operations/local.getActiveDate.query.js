import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'GetActiveDate';
export const graphQlOp = gql`
  query ${opName} {
    restMgmtState @client {
      id activeDate
    }
  }
`;

export const queryWrapper = (key = 'data', options = {}) => graphql(graphQlOp, {
  name: key,
  ...options
});

export default queryWrapper;
