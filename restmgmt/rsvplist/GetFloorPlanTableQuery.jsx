import React from 'react';

import { getFloorPlanTableGql } from 'shared/gql/floor-plan-tables';
import { LoadingQuery } from 'shared/apollo';

const GetFloorPlanTableQuery = ({tableId, children}) => (
  <LoadingQuery
    query={getFloorPlanTableGql}
    variables={{
      id: tableId
    }}
  >
    {({data: {getFloorPlanTable: floorPlanTable}}) => {
      return children({data: floorPlanTable});
    }}
  </LoadingQuery>
);

export default GetFloorPlanTableQuery;
