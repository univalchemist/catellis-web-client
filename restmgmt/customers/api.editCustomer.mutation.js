import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const graphQlOp = gql`
  mutation EditCustomer(
    $id: ID!,
    $name: String,
    $phone_number: String,
    $email: String,
    $tags: String
  ) {
    editCustomer(
      id: $id,
      name: $name,
      phone_number: $phone_number,
      email: $email,
      tags: $tags
    ) {
      id, name, phone_number, email, tags
    }
  }
`;

export const queryWrapper = (key = 'data', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
