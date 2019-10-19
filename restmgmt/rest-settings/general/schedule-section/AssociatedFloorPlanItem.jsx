import React from 'react';

import { MaterialIconButton } from 'shared/buttons';

const AssociatedFloorPlanItem = ({floorPlan, onDestroy}) => (
  <tr className="table__row">
    <td width="85%">
      {floorPlan.name}
    </td>
    <td width="15%">
      <MaterialIconButton
        iconName="delete"
        className="text--right"
        onClick={onDestroy}
      />
    </td>
  </tr>
);

export default AssociatedFloorPlanItem;
