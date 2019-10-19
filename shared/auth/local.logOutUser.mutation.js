import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const graphQlOp = gql`
  mutation logOutUser {
    logOutUser @client
  }
`;

const localLogOutUserMutationWrapper = (key = 'logOutUser') => graphql(graphQlOp, {name: key});

export default localLogOutUserMutationWrapper;
