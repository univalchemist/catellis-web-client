import * as React from 'react';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';

import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

export const ReservationConfirmationNotesField = ({
  label = `Reservation Details`,
  labelRequired
}) => {
  return (
    <Field
      name="email_confirmation_notes"
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;

        return (
          <Frag>
            <Label required={labelRequired}>{label}</Label>
            <textarea
              {...input}
              className={isError ? 'input--error' : ''}
            >
            </textarea>
            <FormError meta={meta} />
          </Frag>
        );
      }}
    </Field>
  );
};

export default ReservationConfirmationNotesField;
