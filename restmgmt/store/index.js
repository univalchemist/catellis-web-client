import * as moment from 'moment';

export const defaultState = {
  restMgmtState: {
    __typename: 'RestMgmtState',
    id: "1",
    activeDate: moment().toISOString(),
    floorPlanState: {
      __typename: 'FloorPlanState',
      id: "1",
      selectedFloorPlanId: null,
      selectedTableId: null,
      selectedReservationPlanId: null,
    }
  }
};
