import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'ListTableReservations';
export const graphQlOp = gql`
  query ${opName}(
    $scheduled_range_start_at: String,
    $scheduled_range_end_at: String
  ) {
    listReservations(
      category: "upcoming,waitlist,seated,complete",
      scheduled_range_start_at: $scheduled_range_start_at,
      scheduled_range_end_at: $scheduled_range_end_at
    ) {
      id scheduled_start_at scheduled_end_at party_size party_notes reservation_status employee
      customer { id name phone_number }
      restaurant { id timezone_name }
      floor_plan_table { id table_number }
    }

    # listFloorPlanTables {
    #   id table_number
    #   floor_plan {id name}
    # }
  }
`;

export const queryWrapper = (key = 'data', options = {}) => graphql(graphQlOp, {
  name: key,
  ...options
});

export default queryWrapper;
