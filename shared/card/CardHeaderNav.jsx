import * as React from 'react';

export const CardHeaderNav = ({
  children
}) => {

  return (
    <nav className="card__header-nav__container">
      {children}
    </nav>
  );
};

export default CardHeaderNav;
