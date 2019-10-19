import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const graphQlOp = gql`
  mutation EditShiftNoteMutation(
    $id: ID!,
    $note: String!
  ) {
    editShiftNote(
      id: $id,
      note: $note
    ) {
      id note
    }
  }
`;

export const queryWrapper = (key = 'data', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
