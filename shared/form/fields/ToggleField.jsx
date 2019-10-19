import * as React from 'react';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';
import Toggle from 'react-toggle'

import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

export const ToggleField = ({
  label,
  labelRequired
}) => {

  return (
    <Field
      name="online"
      type="checkbox"
      component="input"
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;

        return (
          <Frag>
            <Toggle
              className={isError ? 'input--error' : ''}
            />
            <Label required={labelRequired}>{label}</Label>
            <FormError meta={meta} />
          </Frag>
        );
      }}
    </Field>
  );
};

export default ToggleField;
