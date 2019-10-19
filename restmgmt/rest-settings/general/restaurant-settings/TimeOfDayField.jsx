import React, { Fragment } from 'react';
import { Field } from 'react-final-form';
import * as moment from 'moment-timezone';

import timeRangeBuilder from 'shared/time/time-range-builder';
import {
  required,
  composeValidators
} from 'shared/form/validators';
import { Label } from 'shared/form/label/Label';
import { FormError } from 'shared/form/FormError';

export const TimeOfDayField = ({
  label = `Time of Day`,
  labelRequired,
  fieldName = `time`,
  minTime = moment('00:00:00', 'h:mm:ss'),
  maxTime = moment('23:58:00', 'h:mm:ss'),
  timeStep = 15
}) => {
  const timeSlots = timeRangeBuilder(minTime, maxTime, timeStep);

  return (
    <Field
      name={fieldName}
      validate={composeValidators(required)}
      format={value => {
        const newValue = moment(value).tz('UTC').format('h:mm a');
        return newValue;
      }}
      parse={value => {
        // Calculate 00:00, 2000-01-01 at UTC
        const baseMoment = moment('2000-01-01').tz('UTC').startOf('day');

        // Parse the input.
        const utcValue = moment(value, 'h:mm a');

        // Get the hours and minutes from that conversion.
        const hours = utcValue.hours();
        const minutes = utcValue.minutes();

        // Adjust the base moment.
        baseMoment.add(hours, 'hours');
        baseMoment.add(minutes, 'minutes');

        // Finally, convert back to ISO8601
        return baseMoment.toISOString();
      }}
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;

        return (
          <Fragment>
            <Label required={labelRequired}>{label}</Label>
            <select
              {...input}
              className={isError ? 'input--error' : ''}
            >
              <option>Select One</option>
              {timeSlots.map(timeSlot => {
                const timeAsString = timeSlot.format('h:mm a');

                return (
                  <option value={timeAsString} key={timeAsString}>{timeAsString}</option>
                );
              })}
            </select>
            <FormError meta={meta} />
          </Fragment>
        );
      }}
    </Field>
  );
};

export default TimeOfDayField;
