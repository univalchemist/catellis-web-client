import React from 'react';
import { compose } from 'react-apollo';

import { MaterialIconButton } from 'shared/buttons';
import setFloorPlanTableAttrsWrapper from 'restmgmt/store/operations/local.setFloorPlanTableAttrs.mutation';

function calculateUpdatedRotation(origRotation, adjustment) {
  return ((origRotation + adjustment) + 360) % 360;
}

export const TableRotateButton = ({
  floorPlanTable,
  direction,
  onUpdate,
}) => {
  const isClockwise =  direction !== 'counterclockwise';
  let iconName = isClockwise ? 'rotate_right' : 'rotate_left';
  const onClick = isClockwise
    ? () => onUpdate({
      table_rotation: calculateUpdatedRotation(floorPlanTable.table_rotation, -90)
    })
    : () => onUpdate({
      table_rotation: calculateUpdatedRotation(floorPlanTable.table_rotation, 90)
    });

  return (
    <MaterialIconButton
      size="fl"
      buttonStyle="primary"
      iconName={iconName}
      onClick={onClick}
    />
  );
}

export default compose(
  setFloorPlanTableAttrsWrapper(
    'setFloorPlanTableAttrs',
    {
      props: ({setFloorPlanTableAttrs, ownProps: {floorPlanTable}}) => ({
        onUpdate: (attrs) => {
          const opQ = setFloorPlanTableAttrs({
            variables: {
              table_rotation: attrs.table_rotation,
              id: floorPlanTable.id
            }
          });

          return opQ;
        }
      }),
    }
  ),
)(TableRotateButton);
