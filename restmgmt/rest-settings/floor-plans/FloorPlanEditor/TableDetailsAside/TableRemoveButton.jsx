import React from 'react';
import { compose } from 'react-apollo';

import { MaterialIconButton } from 'shared/buttons';
import removeFloorPlanTableWrapper from 'restmgmt/store/operations/local.removeFloorPlanTable.mutation';

export const TableRemoveButton = ({
  onRemove,
}) => {
  return (
    <MaterialIconButton
      size="fl"
      buttonStyle="primary"
      iconName="delete"
      onClick={onRemove}
    />
  );
}

export default compose(
	removeFloorPlanTableWrapper(
		'removeFloorPlanTable',
		{
			props: ({removeFloorPlanTable, ownProps: {id}}) => ({
				onRemove: () => {
					const opQ = removeFloorPlanTable({
						variables: {
							id
						}
					});

					return opQ;
				}
			}),
		}
	),
)(TableRemoveButton);
