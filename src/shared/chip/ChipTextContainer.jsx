import * as React from 'react';
import * as classNames from 'classnames';

export const ChipTextContainer = ({
  children
}) => {
  const classes = classNames({
    'chip__text-container': true
  });

  return (
    <div className={classes}>
      {children}
    </div>
  );
};
