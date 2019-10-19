import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const opName = 'ListFloorPlanTables';
export const graphQlOp = gql`
  query ${opName} {
    listFloorPlanTables {
      id table_number
      floor_plan {id name}
    }
  }
`;

export const queryWrapper = (key = 'data', options = {}) => graphql(graphQlOp, {
  name: key,
  ...options
});

export default queryWrapper;
