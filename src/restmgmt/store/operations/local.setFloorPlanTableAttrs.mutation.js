import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'SetFloorPlanTableAttrs';
export const graphQlOp = gql`
  mutation ${opName}(
    $id: ID!,
    $x: Int,
    $y: Int,
    $table_reservation_status: String,
    $table_number: String,
    $table_type: String,
    $table_rotation: String,
    $min_covers: Int,
    $max_covers: Int,
  ) {
    setFloorPlanTableAttrs(
      id: $id,
      y: $y,
      x: $x,
      table_reservation_status: $table_reservation_status,
      table_number: $table_number,
      table_type: $table_type,
      table_rotation: $table_rotation,
      min_covers: $min_covers,
      max_covers: $max_covers,
    ) @client
  }
`;

export const queryWrapper = (key = 'mutate', options = {}) => graphql(graphQlOp, {
  name: key,
  ...options
});

export default queryWrapper;
