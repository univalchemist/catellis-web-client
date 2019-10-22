import * as React from 'react';
import * as classNames from 'classnames';

export const Card = ({
  size = 'md',
  cardShadow = false,
  cardOverflow = false,
  cardScroll = false,
  cardDark = false,
  heightFull = false,
  children
}) => {
  const classes = classNames({
    'card': true,
    [`card--${size}`]: true,
    'card--shadow': cardShadow,
    'card--overflow': cardOverflow,
    'card--overflow-scroll': cardScroll,
    'card--dark': cardDark,
    'height--fl': heightFull
  });

  return (
    <div className={classes}>{children}</div>
  );
};

export default Card;
