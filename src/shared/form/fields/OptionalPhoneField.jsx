import * as React from 'react';
import { Fragment as Frag } from 'react';
import { Field } from 'react-final-form';

import { PhoneInput } from 'shared/form/inputs';
import {
  optional,
  phoneNumber,
  composeValidators
} from 'shared/form/validators';
import { FormError } from 'shared/form/FormError';
import { Label } from 'shared/form/label/Label';

export const OptionalPhoneField = ({
  label = `Customer's Phone Number`,
  labelRequired
}) => {

  return (
    <Field
      name="phone_number"
      parse={value => value.replace(/\D/g, '')}
      validate={composeValidators(optional(phoneNumber))}
    >
      {({ input, meta }) => {
        const isError = meta.error && meta.touched;

        return (
          <Frag>
            <Label required={labelRequired}>{label}</Label>
            <PhoneInput
              {...input}
              type="tel"
              placeholder="123-456-7890"
              className={isError ? 'input--error' : ''}
            />
            <FormError meta={meta} />
          </Frag>
        );
      }}
    </Field>
  );
};

export default OptionalPhoneField;
