import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const graphQlOp = gql`
  mutation DestroyCustomer(
    $id: ID!
  ) {
    destroyCustomer(
      id: $id
    ) {
      id
    }
  }
`;

export const queryWrapper = (key = 'mutate', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
