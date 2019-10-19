import React from 'react';

import { listDailyReservationPlansGql } from 'shared/gql/reservation-plans';
import { LoadingQuery } from 'shared/apollo';

const ListDailyReservationPlansQuery = ({
  searchStart,
  searchEnd,
  children,
}) => (
  <LoadingQuery
    query={listDailyReservationPlansGql}
    variables={{
      search_start_at: searchStart.toISOString(),
      search_end_at: searchEnd.toISOString(),
    }}
  >
    {({data}) => {
      return children({data: data.listDailyReservationPlans});
    }}
  </LoadingQuery>
);

export default ListDailyReservationPlansQuery;
