import * as React from 'react';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';

import {
  required,
  composeValidators,
  onlyDigits
} from 'shared/form/validators';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

export const MaxPartySizeField = ({
  label = `Maximum Online Party Size`,
  labelRequired
}) => {

  return (
    <Field
      name="max_party_size"
      parse={value => value ? parseInt(value, 10) : ""}
      validate={composeValidators(required, onlyDigits)}
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

export default MaxPartySizeField;
