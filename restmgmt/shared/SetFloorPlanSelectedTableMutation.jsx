import React from 'react';
import { Mutation } from 'react-apollo';

import { graphQlOp as setFloorPlanSelectedTableGql } from 'restmgmt/store/operations/local.setFloorPlanSelectedTable.mutation';

const SetFloorPlanSelectedTableMutation = ({children}) => (
  <Mutation mutation={setFloorPlanSelectedTableGql}>
    {(setFloorPlanSelectedTable) => {
      const mutation = (id) => {
        return setFloorPlanSelectedTable({
          variables: {
            id: id
          }
        });
      };

      return children({mutation});
    }}
  </Mutation>
);

export default SetFloorPlanSelectedTableMutation;
