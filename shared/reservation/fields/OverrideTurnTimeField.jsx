import React, { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';

import {
  required,
  composeValidators,
} from 'shared/form/validators';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

export const OverrideTurnTimeField = ({
  label = `Override Turn Time`,
  fieldName = 'overrideTurnTime',
  labelRequired,
  selectableTimeSlots = [],
  isLoading = false,
  hasReservationDate = true,
}) => {
  return (
    <Field
      name="override_turn_time"
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;

        return (
          <Frag>
            <Label required={labelRequired}>{label}</Label>
            <input
              {...input}
              type="int"
              className={isError ? 'input--error' : ''}
              required="true"
            />
            <FormError meta={meta} />
          </Frag>
        );
      }}
    </Field>
  );
};

export default OverrideTurnTimeField;
