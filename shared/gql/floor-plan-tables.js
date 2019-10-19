import gql from 'graphql-tag';

export const getFloorPlanTableOpName = 'GetFloorPlanTable';
export const getFloorPlanTableGql = gql`
  query ${getFloorPlanTableOpName}(
    $id: ID!
  ) {
    getFloorPlanTable(
      id: $id
    ){
      id
      table_number
    }
  }
`;
