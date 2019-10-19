import * as React from 'react';


export const AsideHeader = ({
  ariaLabel = 'link',
  children
}) => {
  return (
    <header
      className="rest-page__aside__header"
      aria-label={ariaLabel}
    >
      {children}
    </header>
  );
};

export default AsideHeader;
