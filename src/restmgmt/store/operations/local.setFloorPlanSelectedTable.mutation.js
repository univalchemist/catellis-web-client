import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'SetFloorPlanSelectedTable';
export const graphQlOp = gql`
  mutation ${opName}(
    $id: ID!,
  ) {
    setFloorPlanSelectedTable(
      id: $id,
    ) @client
  }
`;

export const queryWrapper = (key = 'mutate', options = {}) => graphql(graphQlOp, {
  name: key,
  ...options
});

export default queryWrapper;
