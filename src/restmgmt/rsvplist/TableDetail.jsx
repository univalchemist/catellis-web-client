import React, { Component, Fragment } from 'react';

import AsideHeaderClose from 'restmgmt/shared/AsideHeaderClose';
import GetFloorPlanTableQuery from './GetFloorPlanTableQuery';
import TableDetailSection from './TableDetailSection';
import SetFloorPlanSelectedTableMutation from 'restmgmt/shared/SetFloorPlanSelectedTableMutation';
import GetFloorPlanStateQuery from 'restmgmt/shared/GetFloorPlanStateQuery';

class TableDetail extends Component {
  componentDidMount() {
    const {
      floorPlanTable,
      onUpdateSelectedTable,
      selectedTableId,
    } = this.props;

    if (selectedTableId !== floorPlanTable.id) {
      onUpdateSelectedTable(floorPlanTable.id);
    }
  }

  render() {
    const {
      floorPlanTable,
      onClose,
      onUpdateSelectedTable,
    } = this.props;

    return (
      <Fragment>
        <AsideHeaderClose
          ariaLabel='back-to-all-reservations'
          text={`Table ${floorPlanTable.table_number}`}
          onClickClose={() => {
            onUpdateSelectedTable(null);

            onClose();
          }}
        />
        <TableDetailSection
          floorPlanTable={floorPlanTable}
        />
      </Fragment>
    );
  }
}

const QueriedTableDetail = ({tableId, onClose}) => (
	<SetFloorPlanSelectedTableMutation>
		{({mutation: onUpdateSelectedTable}) => (
			<GetFloorPlanStateQuery>
				{({data: floorPlanState}) => (
          <GetFloorPlanTableQuery tableId={tableId}>
            {({data: floorPlanTable}) => (
              <TableDetail
                floorPlanTable={floorPlanTable}
                onClose={onClose}
                onUpdateSelectedTable={onUpdateSelectedTable}
                selectedTableId={floorPlanState.selectedTableId}
              />
            )}
          </GetFloorPlanTableQuery>
        )}
      </GetFloorPlanStateQuery>
    )}
  </SetFloorPlanSelectedTableMutation>
);

export default QueriedTableDetail;
