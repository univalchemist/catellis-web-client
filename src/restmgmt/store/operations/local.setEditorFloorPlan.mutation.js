import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'SetEditorFloorPlan';
export const graphQlOp = gql`
  mutation ${opName}(
    $input: FloorPlanInput!
  ) {
    setEditorFloorPlan(
      input: $input
    ) @client
  }
`;

export const queryWrapper = (key = 'mutate', options = {}) => graphql(graphQlOp, {
  name: key,
  ...options
});

export default queryWrapper;
