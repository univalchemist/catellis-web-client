import * as React from 'react';

export const CardHeaderNavList = ({
  children
}) => {

  return (
    <ul className="card__header-nav__list">
      {children}
    </ul>
  );
};

export default CardHeaderNavList;
