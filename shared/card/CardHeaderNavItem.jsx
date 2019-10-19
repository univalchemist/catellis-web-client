import * as React from 'react';
import { NavLink } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';

export const CardHeaderNavItem = ({
  itemTitle,
  itemIcon,
  itemUrl,
  position,
  children
}) => {

  return (
    <li className="card__header-nav__item">
      <NavLink
        className="card__header-nav__link"
        to={`${itemUrl}`}
        activeClassName="card__header-nav__link--active"
      >
        <MaterialIcon icon={itemIcon} color="inherit" />
        <span className="card__header-nav__link__text">{itemTitle}</span>
      </NavLink>
    </li>
  );
};

export default CardHeaderNavItem;
