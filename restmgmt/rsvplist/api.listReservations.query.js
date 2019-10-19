import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'ListReservations';
export const graphQlOp = gql`
  query ${opName}(
    $search_text: String,
    $category: String,
    $scheduled_range_start_at: String,
    $scheduled_range_end_at: String,
    $floor_plan_table_id: ID
  ) {
    listReservations(
      search_text: $search_text,
      category: $category,
      scheduled_range_start_at: $scheduled_range_start_at,
      scheduled_range_end_at: $scheduled_range_end_at,
      floor_plan_table_id: $floor_plan_table_id
    ) {
      id scheduled_start_at scheduled_end_at party_size party_notes tags reservation_status employee
      table_conflicted
      customer { id name phone_number tags}
      restaurant { id timezone_name }
      floor_plan_table { id table_number }
    }
  }
`;

export const queryWrapper = (key = 'reservations', options = {}) => graphql(graphQlOp, {
  name: key,
  ...options
});

export default queryWrapper;
