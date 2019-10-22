import React, { Fragment } from 'react';
import { Field } from 'react-final-form';

import {
  required,
  composeValidators,
} from 'shared/form/validators';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

export const ReservationTimeField = ({
  label = `Reservation Time`,
  fieldName = 'reservationTime',
  labelRequired,
  selectableTimeSlots = [],
  isLoading = false,
  hasReservationDate = true,
}) => {
  return (
    <Field
      name={fieldName}
      validate={composeValidators(required)}
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;

        let fieldContent = null;

        if (isLoading) {
          fieldContent = (
            <p>Loading...</p>
          );
        } else if (!hasReservationDate) {
          fieldContent = (
            <select disabled>
              <option defaultValue>Select a reservation date</option>
            </select>
          );
        } else if (selectableTimeSlots.length > 0) {
          fieldContent = (
            <Fragment>
              <select
                {...input}
                className={isError ? 'input--error' : ''}
                >
                  <option>Select One</option>
                  {selectableTimeSlots.map(time => {
                    const timeAsString = time.format('h:mm a');

                    return (
                      <option value={timeAsString} key={timeAsString}>{timeAsString}</option>
                    );
                  })}
              </select>
              <FormError meta={meta} />
            </Fragment>
          );
        } else {
          fieldContent = (
            <select disabled>
              <option defaultValue>No times available.</option>
            </select>
          );
        }

        return (
          <Fragment>
            <Label required={labelRequired}>{label}</Label>
            {fieldContent}
          </Fragment>
        );
      }}
    </Field>
  );
};

export default ReservationTimeField;
