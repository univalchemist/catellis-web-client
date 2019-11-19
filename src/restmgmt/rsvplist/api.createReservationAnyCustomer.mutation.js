import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const graphQlOp = gql`
  mutation CreateReservationAnyCustomerMutation(
    $restaurant_id: ID!,
    $floor_plan_table_id: ID!,
    $name: String!,
    $phone_number: String!,
    $email: String,
    $party_size: Int!,
    $party_notes: String,
    $scheduled_start_at: String!,
    $seated_at: String!,
    $tags: String,
    $employee: String,
  ) {
    createReservationAnyCustomer(
      restaurant_id: $restaurant_id,
      floor_plan_table_id: $floor_plan_table_id,
      name: $name,
      phone_number: $phone_number,
      email: $email,
      party_size: $party_size,
      party_notes: $party_notes,
      scheduled_start_at: $scheduled_start_at,
      seated_at: $seated_at,
      tags: $tags,
      employee: $employee,
    ) {
      reservation { id scheduled_start_at party_size employee }
      customer { id name phone_number tags email}
    }
  }
`;

export const queryWrapper = (key = 'data', options) => graphql(graphQlOp, {name: key, ...options});

export default queryWrapper;
