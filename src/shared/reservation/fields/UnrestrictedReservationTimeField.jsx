import React from 'react';
import * as moment from 'moment-timezone';

import timeRangeBuilder from 'shared/time/time-range-builder';
import ReservationTimeField from './ReservationTimeField';

export const UnrestrictedReservationTimeField = ({
  label = `Reservation Time`,
  fieldName = 'reservationTime',
  labelRequired,
  startTime = '10:00',
  endTime = '22:00'
}) => {
  const startTimeHours = moment(
    moment.tz(startTime, 'UTC').format('h:mm a'),
    'h:mm a'
  );
  const endTimeHours = moment(
    moment.tz(endTime, 'UTC').format('h:mm a'),
    'h:mm a'
  );
  const selectableTimeSlots = timeRangeBuilder(startTimeHours, endTimeHours, 15);

  return (
    <ReservationTimeField
      label={label}
      fieldName={fieldName}
      labelRequired={labelRequired}
      selectableTimeSlots={selectableTimeSlots}
    />
  );
};

export default UnrestrictedReservationTimeField;
