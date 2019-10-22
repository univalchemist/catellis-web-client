import React from 'react';
import * as classNames from 'classnames';

export const Badge = ({
  text,
  alertStyle = 'error',
}) => {
  const classes = classNames({
    'alert--no-shadow': true,
    [`alert--${alertStyle}`]: true,
  });

  return (
    <div className={classes}>
      <p className="margin--reset text--center text--white">{text}</p>
    </div>
  );
};

export default Badge;
