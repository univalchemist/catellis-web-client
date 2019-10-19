import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'GetCurrentShiftNote';
export const graphQlOp = gql`
  query ${opName}(
    $shift_start_at: String!,
    $shift_end_at: String!
  ) {
    getCurrentShiftNote(
      shift_start_at: $shift_start_at,
      shift_end_at: $shift_end_at
    ) {
      id, note
    }
  }
`;

export const queryWrapper = (key = 'data', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
