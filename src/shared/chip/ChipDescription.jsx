import * as React from 'react';
import * as classNames from 'classnames';

export const ChipDescription = ({
  children,
  invert = false,
  text
}) => {
  const classes = classNames({
    'description': true,
    'text--white': invert
  });

  return (
    <p className={classes}>{text || children}</p>
  );
};
