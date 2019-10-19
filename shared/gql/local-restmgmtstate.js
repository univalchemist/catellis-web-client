import gql from 'graphql-tag';

export const setSelectedReservationPlanFloorPlanOpName = 'SetSelectedReservationPlanFloorPlan';
export const setSelectedReservationPlanFloorPlanGql = gql`
  mutation ${setSelectedReservationPlanFloorPlanOpName}(
    $floorPlanId: ID!,
    $reservationPlanId: ID!,
  ) {
    setSelectedReservationPlanFloorPlan(
      floorPlanId: $floorPlanId,
      reservationPlanId: $reservationPlanId,
    ) @client
  }
`;
