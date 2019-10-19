import * as React from 'react';
import MaskedTextInput from 'react-text-mask';

export const PHONE_MASK = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
export const PhoneInput = ({input, ...rest}) => {
  return (
    <MaskedTextInput
      {...input}
      mask={PHONE_MASK}
      placeholder="(844) 555-1234"
      guide={false}
      {...rest}
    />
  );
};

export default PhoneInput;
