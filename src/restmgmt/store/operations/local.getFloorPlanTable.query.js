import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'GetFloorPlanTable';
export const graphQlOp = gql`
  query ${opName}($id: ID!) {
    getFloorPlanTable(id: $id) @client {
      id x y table_reservation_status table_number table_shape table_size min_covers max_covers table_type table_rotation
    }
  }
`;

export const queryWrapper = (key = 'data', options = {}) => graphql(graphQlOp, {
  name: key,
  ...options
});

export default queryWrapper;
