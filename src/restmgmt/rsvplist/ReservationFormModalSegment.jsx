import * as React from 'react';
import {Fragment as Frag} from 'react';
import {compose} from 'react-apollo';

import listFloorPlanTablesWrapper from 'restmgmt/rsvplist/api.listFloorPlanTables.query';
import {
    PartySizeField,
    EmployeeField,
} from 'shared/reservation/fields';
import LoadingIndicator from 'shared/loading-indicator';

const ReservationFormSegment = ({restaurant, onChange, floorPlanTables}) => {
    if (floorPlanTables.loading) {
        return (<LoadingIndicator/>);
    }

    return (
        <Frag>
            <div>
                <PartySizeField
                    maxGuests={200}
                    minGuests={1}
                    labelRequired={true}
                />
            </div>
            <div>
                <EmployeeField labelRequired={true}/>
            </div>
        </Frag>
    );
};

export default compose(
    listFloorPlanTablesWrapper(
        'floorPlanTables',
    ),
)(ReservationFormSegment);
