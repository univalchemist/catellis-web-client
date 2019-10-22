import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const graphQlOp = gql`
  mutation SignInUser(
    $email: String!,
    $password: String!
  ) {
    signInUser(
      email: $email,
      password: $password
    ) {
      token, user {id, email}
    }
  }
`;

const apiSignInMutationWrapper = (key = 'signIn') => graphql(graphQlOp, {name: key});

export default apiSignInMutationWrapper;
