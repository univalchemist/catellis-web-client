import React from 'react';
import * as classNames from 'classnames';

export const PopoutList = ({
  children
}) => {
  const classes = classNames({
    'popout__list': true,
  });

  return (
    <ul className={classes}>
      {children}
    </ul>
  );
};

export default PopoutList;
