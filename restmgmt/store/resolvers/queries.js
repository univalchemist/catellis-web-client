import gql from 'graphql-tag';

export const getFloorPlanTable = (
  _,
  {id},
  {cache}
) => {
  const typeId = `FloorPlanTable:${id}`;
  const query = gql`
    fragment floorPlanTable on FloorPlanTable {
      id x y table_number table_shape table_size min_covers max_covers table_type table_rotation
    }
  `;

  const data = cache.readFragment({
    id: typeId,
    fragment: query
  });

  return data;
};

export const getFloorPlan = (
  _,
  {id},
  {cache}
) => {
  // const floorPlanState = cache.readFragment({
  //   id: `FloorPlanState:1`,
  //   fragment: gql`
  //     fragment floorPlanState on FloorPlanState {
  //       selectedFloorPlanId
  //     }
  //   `
  // });

  const typeId = `FloorPlan:${id}`;
  // const typeId = `FloorPlan:${floorPlanState.selectedFloorPlanId}`;
  const query = gql`
    fragment floorPlanTable on FloorPlanTable {
      id name
      floor_plan_tables {
        id x y table_number table_shape table_size min_covers max_covers table_type table_rotation _destroy
      }
    }
  `;

  const data = cache.readFragment({
    id: typeId,
    fragment: query
  });

  return data;
};

export const getEditorFloorPlan = (
  _,
  args,
  {cache}
) => {
  const typeId = `FloorPlanState:1`;
  const query = gql`
    fragment editorFloorPlan on FloorPlanState {
      editorFloorPlan {
        id name
        floor_plan_tables {id table_number}
      }
    }
  `;

  const data = cache.readFragment({
    id: typeId,
    fragment: query
  });

  return data;
};
