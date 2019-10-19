import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const graphQlOp = gql`
  query MeQuery {
    meUser {
      id, email, name
    }
  }
`;

const apiMeQueryWrapper = (key = 'me') => graphql(graphQlOp, {name: key});

export default apiMeQueryWrapper;
