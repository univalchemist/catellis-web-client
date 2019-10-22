import gql from 'graphql-tag';

export const listFloorPlansOpName = 'ListFloorPlans';
export const listFloorPlansGql = gql`
  query ${listFloorPlansOpName} {
    listFloorPlans {
      id name created_at
      floor_plan_tables {id max_covers}
    }
  }
`;
