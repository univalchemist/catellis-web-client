import gql from 'graphql-tag';

export const listAvailableReservationTimesOpName = 'ListAvailableReservationTimes';
export const listAvailableReservationTimesGql = gql`
  query ${listAvailableReservationTimesOpName}(
    $restaurant_id: ID!,
    $party_size: Int!,
    $search_start_at: String!,
    $search_end_at: String,
  ) {
    listAvailableReservationTimes(
      restaurant_id: $restaurant_id,
      party_size: $party_size,
      search_start_at: $search_start_at,
      search_end_at: $search_end_at,
    )
  }
`;
