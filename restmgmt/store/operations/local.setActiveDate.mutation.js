import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'SetActiveDate';
export const graphQlOp = gql`
  mutation ${opName}($activeDate: String!) {
    setActiveDate(activeDate: $activeDate) @client
  }
`;

export const queryWrapper = (key = 'data', options = {}) => graphql(graphQlOp, {
  name: key,
  ...options
});

export default queryWrapper;
