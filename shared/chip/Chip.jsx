import * as React from 'react';
import * as classNames from 'classnames';

export const Chip = ({
  size = 'md',
  children
}) => {
  const classes = classNames({
    'chip': true,
    [`chip--${size}`]: true,
  });

  return (
    <div className={classes}>
      {children}
    </div>
  );
};
