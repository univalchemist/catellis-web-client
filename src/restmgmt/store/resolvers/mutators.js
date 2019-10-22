// TODO: These mutators need to be reviewed, cleaned up, with consolidated
//  logic used where possible. There's too much redundancy currently.

import * as uuid from 'uuidv4';
import gql from 'graphql-tag';
import * as _remove from 'lodash.remove';
import uuidv4 from 'uuidv4';

import { graphQlOp } from 'restmgmt/store/operations/local.getFloorPlanState.query';
import { getFloorPlan } from 'restmgmt/store/resolvers/queries';

export const setActiveDate = (
  _,
  {activeDate},
  {cache}
) => {
  const data = {
    restMgmtState: {
      __typename: 'RestMgmtState',
      id: "1",
      activeDate: activeDate
    }
  };
  cache.writeData({ data });

  return data;
};

export const setFloorPlanTableAttrs = (
  _,
  newAttrs,
  {cache}
) => {
  const data = {
    id: `FloorPlanTable:${newAttrs.id}`,
    data: {...newAttrs}
  }

  cache.writeData(data);

  return data;
};

export const updateFloorPlan = (
  _,
  {input},
  {cache}
) => {
  const data = {
    id: `FloorPlan:${input.id}`,
    data: {...input}
  }

  cache.writeData(data);

  return data;
};

export const addFloorPlanTable = (
  _,
  {input},
  {cache}
) => {
  const {restMgmtState} = cache.readQuery({query: graphQlOp})

  let selectedFloorPlan = getFloorPlan(
    undefined,
    {id: restMgmtState.floorPlanState.selectedFloorPlanId},
    {cache}
  );

  const newTableId = uuid();
  const data = {
    ...selectedFloorPlan,
    floor_plan_tables: [
      ...selectedFloorPlan.floor_plan_tables,
      {
        ...input,
        __typename: 'FloorPlanTable',
        id: newTableId,
        _destroy: false
      }
    ]
  }

  const typeId = `FloorPlan:${selectedFloorPlan.id}`;
  const query = gql`
    fragment floorPlanTable on FloorPlanTable {
      id name
      floor_plan_tables {
        id x y table_number table_shape table_size min_covers max_covers table_type table_rotation _destroy
      }
    }
  `;

  // cache.writeQuery({
  //   query: graphQlOp,
  //   data
  // });
  // cache.writeData({data});
  cache.writeFragment({
    fragment: query,
    id: typeId,
    data: data
  })

  selectedFloorPlan = cache.readFragment({
    id: typeId,
    fragment: query
  });

  return data;
};

export const setFloorPlanSelectedTable = (
  _,
  {id},
  {cache}
) => {
  // const {restMgmtState} = cache.readQuery({query: graphQlOp})
  // if (id === restMgmtState.floorPlanState.selectedTableId) {
  //   id = null;
  // }

  const data = {
    id: `FloorPlanState:1`,
    data: {
      selectedTableId: id
    }
  }

  cache.writeData(data);

  return data;
};

export const removeFloorPlanTable = (
  _,
  {id},
  {cache}
) => {
  const {restMgmtState} = cache.readQuery({query: graphQlOp})

  let selectedFloorPlan = getFloorPlan(
    undefined,
    {id: restMgmtState.floorPlanState.selectedFloorPlanId},
    {cache}
  );

  let typeId = `FloorPlanTable:${id}`;
  let query = gql`
    fragment floorPlanTable on FloorPlanTable {
      id x y table_number table_shape table_size min_covers max_covers table_type table_rotation
    }
  `;

  const floorPlanTable = cache.readFragment({
    id: typeId,
    fragment: query
  });

  let purgedTables = [...selectedFloorPlan.floor_plan_tables];
  _remove(
    purgedTables,
    (candidateTable) => {
      return candidateTable.id === floorPlanTable.id
    }
  );
  if (uuidv4.is(floorPlanTable.id)) {
    // New table, just remove from array.
  } else {
    // Existing (persisted) table, must mark with `_destroy:true`.
    purgedTables = [
      ...purgedTables,
      {
        ...floorPlanTable,
        _destroy: true
      }
    ]
  }

  let data = {
    ...selectedFloorPlan,
    floor_plan_tables: [...purgedTables]
  }

  typeId = `FloorPlan:${selectedFloorPlan.id}`;
  query = gql`
    fragment floorPlanTable on FloorPlanTable {
      id name
      floor_plan_tables {
        id x y table_number table_shape table_size min_covers max_covers table_type table_rotation _destroy
      }
    }
  `;

  cache.writeFragment({
    fragment: query,
    id: typeId,
    data: data
  })

  const currentSelectedTableId = restMgmtState.floorPlanState.selectedTableId;
  data = {
    id: `FloorPlanState:1`,
    data: {
      selectedTableId: currentSelectedTableId === floorPlanTable.id ? null : currentSelectedTableId
    }
  }
  cache.writeData(data);

  return data;
};

export const setEditorFloorPlan = (
  _,
  {input},
  {cache}
) => {
  const model = {
    id: `FloorPlan:${input.id}`,
    data: {...input}
  }

  cache.writeData(model);

  const data = {
    id: `FloorPlanState:1`,
    data: {
      selectedFloorPlanId: input.id,
      // selectedTableId: null
    }
  }

  cache.writeData(data);

  return data;
};

export const setSelectedReservationPlanFloorPlan = (
  _,
  {floorPlanId, reservationPlanId},
  {cache}
) => {
  const data = {
    id: `FloorPlanState:1`,
    data: {
      selectedFloorPlanId: floorPlanId,
      selectedReservationPlanId: reservationPlanId,
      // selectedTableId: null
    }
  }

  cache.writeData(data);

  return data;
};
