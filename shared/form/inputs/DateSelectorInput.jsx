import * as React from 'react';
import Datetime from 'react-datetime';

// Details on styling these inputs can be found here:
// https://github.com/YouCanBookMe/react-datetime#customize-the-input-appearance

export const DateSelectorInput = ({
  input,
  dateFormat = "dddd, MMMM D, YYYY",
  isValidDate = () => true,
  ...rest
}) => {
  return (
    <Datetime
      {...input}
      dateFormat={dateFormat}
      timeFormat={false}
      closeOnSelect={true}
      inputProps={{readOnly: true}}
      isValidDate={isValidDate}
    />
  );
};

export default DateSelectorInput;
