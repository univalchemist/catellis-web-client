import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'EditFloorPlan';
export const graphQlOp = gql`
  mutation ${opName}(
    $input: FloorPlanInput!
  ) {
    editFloorPlan(
      input: $input
    ) {
      id name
      floor_plan_tables {
        id x y table_number table_shape table_size min_covers max_covers table_type table_rotation _destroy
      }
    }
  }
`;

export const queryWrapper = (key = 'mutate', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
