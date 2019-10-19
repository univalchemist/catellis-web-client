import * as React from 'react';
import * as classNames from 'classnames';

export const DefaultNoResults = ({
  text,
  isError = false
}) => {
  const classes = classNames({
    'text--red': isError,
  });

  return (
    <div className="rest-page__aside__no-search-results">
      <p className={classes}>{text}</p>
    </div>
  );
};

export default DefaultNoResults;
