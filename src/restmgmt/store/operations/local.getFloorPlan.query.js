import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'GetFloorPlan';
export const graphQlOp = gql`
  query ${opName}($id: ID!) {
    getFloorPlan(id: $id) @client {
      id name
      floor_plan_tables {
        id x y table_reservation_status table_number table_shape table_size min_covers max_covers table_type table_rotation _destroy
      }
    }
  }
`;

export const queryWrapper = (key = 'data', options = {}) => graphql(graphQlOp, {
  name: key,
  ...options
});

export default queryWrapper;
