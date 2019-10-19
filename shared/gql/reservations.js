import gql from 'graphql-tag';

export const createReservationGuestCustomerOpName = 'CreateReservationGuestCustomerMutation';
export const createReservationGuestCustomerGql = gql`
  mutation ${createReservationGuestCustomerOpName}(
    $restaurant_id: ID!,
    $name: String!,
    $phone_number: String!,
    $email: String,
    $party_size: Int!,
    $party_notes: String,
    $scheduled_start_at: String!,
    $tags: String,
    $employee: String,
  ) {
    createReservationGuestCustomer(
      restaurant_id: $restaurant_id,
      name: $name,
      phone_number: $phone_number,
      email: $email,
      party_size: $party_size,
      party_notes: $party_notes,
      scheduled_start_at: $scheduled_start_at,
      tags: $tags,
      employee: $employee,
    ) {
      reservation { id scheduled_start_at party_size employee }
      customer { id name phone_number tags email}
    }
  }
`;

export const getReservationOpName = 'GetReservationQuery';
export const getReservationGql = gql`
  query ${getReservationOpName}($id: ID!) {
    getReservation(id: $id) {
      id scheduled_start_at scheduled_end_at party_size reservation_status party_notes tags employee override_turn_time
      table_conflicted
      customer {id, name, phone_number, email, tags}
      restaurant { id timezone_name rest_open_at rest_close_at }
      floor_plan_table { id table_number }
    }
  }
`;
