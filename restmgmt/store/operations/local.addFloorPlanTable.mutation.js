import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'AddFloorPlanTable';
export const graphQlOp = gql`
  mutation ${opName}(
    $input: FloorPlanTableInput!
  ) {
    addFloorPlanTable(
      input: $input
    ) @client
  }
`;

export const queryWrapper = (key = 'mutate', options = {}) => graphql(graphQlOp, {
  name: key,
  ...options
});

export default queryWrapper;
