import gql from 'graphql-tag';

export const listDailyReservationPlansOpName = 'ListDailyReservationPlans';
export const listDailyReservationPlansGql = gql`
  query ${listDailyReservationPlansOpName}(
    $search_start_at: String!,
    $search_end_at: String
  ) {
    listDailyReservationPlans(
      search_start_at: $search_start_at,
      search_end_at: $search_end_at,
    ) {
      id effective_at
      reservation_plans {
        id
        name
        priority
        repeat
        effective_time_start_at
        effective_time_end_at
        cust_reservable_end_at
        cust_reservable_start_at
        floor_plans {
          id
          name
          floor_plan_tables {
            id
            table_number
            x
            y
            table_shape
            table_size 
            min_covers
            max_covers
            table_type
            table_rotation
          }
        }
      }
    }
  }
`;

export const getReservationPlanGql = gql`
  query GetDailyReservationPlan(
    $id: ID!,
  ) {
    getReservationPlan(
      id: $id,
    ) {
      id
      name
      priority
      repeat
      effective_date_start_at
      effective_date_end_at
      effective_time_start_at
      effective_time_end_at
      cust_reservable_end_at
      cust_reservable_start_at
      active_weekday_0
      active_weekday_1
      active_weekday_2
      active_weekday_3
      active_weekday_4
      active_weekday_5
      active_weekday_6
      reservation_plan_floor_plans {
        id
        floor_plan {
          id
          name
        }
      }
    }
  }
`;

export const destroyReservationPlanGql = gql`
  mutation DestroyReservationPlan(
    $id: ID!
  ) {
    destroyReservationPlan(
      id: $id
    ) {
      id
    }
  }
`;

export const editReservationPlanGql = gql`
  mutation EditReservationPlanMutation(
    $input: ReservationPlanInput!
  ) {
    editReservationPlan(
      input: $input
    ) {
      id
      name
      priority
      repeat
      effective_date_start_at
      effective_date_end_at
      effective_time_start_at
      effective_time_end_at
      cust_reservable_end_at
      cust_reservable_start_at
      active_weekday_0
      active_weekday_1
      active_weekday_2
      active_weekday_3
      active_weekday_4
      active_weekday_5
      active_weekday_6
      reservation_plan_floor_plans {
        id
        floor_plan {
          id
          name
        }
      }
    }
  }
`;

export const createReservationPlanGql = gql`
  mutation CreateReservationPlanMutation(
    $input: ReservationPlanInput!
  ) {
    createReservationPlan(
      input: $input
    ) {
      id
      name
      priority
      repeat
      effective_date_start_at
      effective_date_end_at
      effective_time_start_at
      effective_time_end_at
      cust_reservable_end_at
      cust_reservable_start_at
      active_weekday_0
      active_weekday_1
      active_weekday_2
      active_weekday_3
      active_weekday_4
      active_weekday_5
      active_weekday_6
      reservation_plan_floor_plans {
        id
        floor_plan {
          id
          name
        }
      }
    }
  }
`;
