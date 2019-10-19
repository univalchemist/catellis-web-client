import React from 'react';

import { graphQlOp as getFloorPlanStateGql } from 'restmgmt/store/operations/local.getFloorPlanState.query';
import { LoadingQuery } from 'shared/apollo';

const GetFloorPlanStateQuery = ({children}) => (
  <LoadingQuery query={getFloorPlanStateGql}>
    {({data}) => {
      return children({data: data.restMgmtState.floorPlanState});
    }}
  </LoadingQuery>
);

export default GetFloorPlanStateQuery;
