import React from 'react';
import gql from 'graphql-tag';

import LoadingQuery from 'shared/apollo/LoadingQuery';

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

const ListCustomerQuery = ({children}) => (
  <LoadingQuery query={graphQlOp}>
    {({data}) => {
      const customers = data.listCustomers;
      return children({
        customers
      });
    }}
  </LoadingQuery>
);

export default ListCustomerQuery;
