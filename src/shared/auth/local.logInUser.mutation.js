import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const graphQlOp = gql`
  mutation logInUser($id: ID!, $email: String!, $token: String!) {
    logInUser(id: $id, email: $email, token: $token) @client
  }
`;

const localLogInUserMutationWrapper = (key = 'logInUser') => graphql(graphQlOp, {name: key});

export default localLogInUserMutationWrapper;
