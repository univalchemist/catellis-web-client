import * as React from 'react';
import * as classNames from 'classnames';

import * as sizes from './grid-sizes';

const GridRow = ({
  children,
  className
}) => {
  let sCount = 0,
      mCount = 0,
      lCount = 0;
  const classes = classNames({
    'row': true,
    [className]: true
  });

  const mappedChildren = React.Children.map(children, (child) => {
    if (child == null) return;
    
    // If child sizing props are entirely gone, assume that this
    // child shouldn't be modified.
    const {s, m, l} = child.props;

    if (s == null && m == null && l == null) {
      return child;
    }

    sCount += s || sizes.SMALL;
    mCount += m || sizes.MEDIUM;
    lCount += l || sizes.LARGE;

    return React.cloneElement(child, {
      sOmega: sCount >= sizes.SMALL,
      mOmega: mCount >= sizes.MEDIUM,
      lOmega: lCount >= sizes.LARGE
    });
  });

  return (
    <div className={classes}>{mappedChildren}</div>
  );
};

export default GridRow;
