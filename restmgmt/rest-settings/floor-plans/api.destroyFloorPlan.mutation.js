import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'DestroyFloorPlan';
export const graphQlOp = gql`
  mutation ${opName}(
    $id: ID!
  ) {
    destroyFloorPlan(
      id: $id
    ) {
      id
    }
  }
`;

export const queryWrapper = (key = 'mutate', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
