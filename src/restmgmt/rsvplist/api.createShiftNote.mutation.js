import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const graphQlOp = gql`
  mutation CreateShiftNoteMutation(
    $note: String!,
    $shift_start_at: String!
  ) {
    createShiftNote(
      note: $note,
      shift_start_at: $shift_start_at
    ) {
      id note
    }
  }
`;

export const queryWrapper = (key = 'data', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
