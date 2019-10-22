import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const graphQlOp = gql`
  query GetCustomerQuery($id: ID!) {
    getCustomer(id: $id) {
      id, name, phone_number, email, tags
    }
  }
`;

export const queryWrapper = (key = 'data', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
