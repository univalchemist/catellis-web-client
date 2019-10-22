import * as React from 'react';
import * as classNames from 'classnames';

import * as sizes from './grid-sizes';

const GridCol = ({
  s = sizes.SMALL,
  m = sizes.MEDIUM,
  l = sizes.LARGE,
  sOmega = false,
  mOmega = false,
  lOmega = false,
  sOffset,
  mOffset,
  lOffset,
  children,
  className
}) => {
  const classes = classNames({
    [`columns-${s}__s`]: true,
    [`columns-${m}__m`]: true,
    [`columns-${l}__l`]: true,
    'grid-col-omega-s': sOmega,
    'grid-col-omega-m': mOmega,
    'grid-col-omega-l': lOmega,
    [`offset-${sOffset}__s`]: !!sOffset,
    [`offset-${mOffset}__m`]: !!mOffset,
    [`offset-${lOffset}__l`]: !!lOffset,
    [className]: true
  });

  return (
    <div className={classes}>{children}</div>
  );
};

export default GridCol;
