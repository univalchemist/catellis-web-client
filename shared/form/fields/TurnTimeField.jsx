import * as React from 'react';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';
import { FieldArray } from 'react-final-form-arrays'

export const TurnTimeField = ({
  label = `Turn Time`,
  labelRequired,
  fieldNum
}) => {
  return (
    <Field
      name={`turn_time_${fieldNum}`}
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;
        return (
          <Frag>
            <input
              {...input}
              placeholder="H:MM"
              className={isError ? 'input--error' : ''}
            />
            <FormError meta={meta} />
          </Frag>
        );
      }}
    </Field>
  );
};

export default TurnTimeField;
