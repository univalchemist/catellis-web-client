import * as React from 'react';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';
import { compose } from 'react-apollo';

import listFloorPlanTablesWrapper from 'restmgmt/rsvplist/api.listFloorPlanTables.query';
import {
  required,
  composeValidators,
} from 'shared/form/validators';
import {
  PartySizeField,
  PartyNotesField,
  ReservationDateField,
  UnrestrictedReservationTimeField,
  EmployeeField,
  OverrideTurnTimeField,
  // TableSelectField,
} from 'shared/reservation/fields';
import LoadingIndicator from 'shared/loading-indicator';
import { TagsField } from 'shared/form/fields';

const ReservationFormSegment = ({restaurant, onChange, floorPlanTables}) => {
  if (floorPlanTables.loading) {
    return (<LoadingIndicator />);
  }

  return (
    <Frag>
      <div>
        <ReservationDateField onChange={onChange}/>
      </div>
      <div>
        <PartySizeField
          maxGuests={200}
          minGuests={1}
        />
      </div>
      <div>
        <UnrestrictedReservationTimeField
          startTime={restaurant.rest_open_at}
          endTime={restaurant.rest_close_at}
        />
      </div>
      <div>
        <label>Reservation Status</label>
        <Field
          name="reservation_status"
          component="select"
          validate={composeValidators(required)}
        >
          <option value="">Select One</option>
          <option value="not_confirmed">Not Confirmed</option>
          <option value="confirmed">Confirmed</option>
          <option value="left_message">Left Message</option>
          <option value="no_answer">No Answer</option>
          <option value="wrong_number">Wrong Number</option>
          <option value="canceled_guest">Canceled (Guest)</option>
          <option value="canceled_restaurant">Canceled (Restaurant)</option>
          <option value="complete">Complete</option>
          <option value="waitlist">Waitlist</option>
          <option value="seated">Seated</option>
        </Field>
      </div>
      {/*
        NOTE: temporarily disabling this as it's confusing when multiple
          ReservationPlans are configured.
      */}
      {/* <div>
        <TableSelectField
          tables={floorPlanTables.listFloorPlanTables}
        />
      </div> */}
      <div>
        <PartyNotesField />
      </div>
      <div>
        <OverrideTurnTimeField />
      </div>
      <div>
        <EmployeeField labelRequired={true}/>
      </div>
      <div>
        <TagsField />
      </div>
    </Frag>
  );
};

export default compose(
  listFloorPlanTablesWrapper(
    'floorPlanTables',
  ),
)(ReservationFormSegment);
