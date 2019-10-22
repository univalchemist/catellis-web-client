import * as React from 'react';
import Datetime from 'react-datetime';

export const TimeSelectorInput = ({input, ...rest}) => {
  return (
    <Datetime
      {...input}
      dateFormat={false}
      timeFormat="h:mm a"
      timeConstraints={TimeSelectorInput.timeConstraints}
    />
  );
};
TimeSelectorInput.timeConstraints = {minutes: {min: 0, max: 59, step: 5}};

export default TimeSelectorInput;
