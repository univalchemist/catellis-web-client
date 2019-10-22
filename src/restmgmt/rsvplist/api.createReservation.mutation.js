import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const graphQlOp = gql`
  mutation CreateReservationMutation(
    $customer_id: ID!,
    $party_size: Int!,
    $party_notes: String,
    $scheduled_start_at: String!,
    $reservation_status: String!,
    $floor_plan_table_id: ID,
    $employee: String,
    $tags: String
  ) {
    createReservation(
      customer_id: $customer_id,
      party_size: $party_size,
      party_notes: $party_notes,
      scheduled_start_at: $scheduled_start_at,
      reservation_status: $reservation_status,
      floor_plan_table_id: $floor_plan_table_id,
      employee: $employee,
      tags: $tags
    ) {
      id scheduled_start_at party_size party_notes employee
      customer { name phone_number email tags}
      floor_plan_table { id table_number }
      tags
    }
  }
`;

export const queryWrapper = (key = 'data', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
