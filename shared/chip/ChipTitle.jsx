import * as React from 'react';
import * as classNames from 'classnames';

export const ChipTitle = ({
  invert = false,
  text,
  tag
}: ChipTitleProps) => {
  const classes = classNames({
    'title': true,
    'text--white': invert
  });

  return (
    <p className={classes}>{text}  {tag}</p>
  );
};
