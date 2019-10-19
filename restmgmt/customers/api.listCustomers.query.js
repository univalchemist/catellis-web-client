import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'ListCustomers';
export const graphQlOp = gql`
  query ${opName}(
    $search_text: String
  ) {
    listCustomers(
      search_text: $search_text
    ) {
      id, name, phone_number, email, tags
    }
  }
`;

export const queryWrapper = (key = 'customers', options = {}) => graphql(graphQlOp, {
  name: key,
  ...options
});

export default queryWrapper;
