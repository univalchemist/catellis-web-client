import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'GetFloorPlanState';
export const graphQlOp = gql`
  query ${opName} {
    restMgmtState @client {
      id
      floorPlanState {
        id
        selectedFloorPlanId
        selectedTableId
        selectedReservationPlanId
      }
    }
  }
`;

export const queryWrapper = (key = 'data', options = {}) => graphql(graphQlOp, {
  name: key,
  ...options
});

export default queryWrapper;
