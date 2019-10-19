import * as React from 'react';
import * as classNames from 'classnames';

import MaterialIcon from 'material-icons-react';
import { NavLink } from 'react-router-dom';

export const RestHeaderMenuLink = ({
  url,
  text,
  icon
}) => {
  const classes = classNames({
    'rest-header__expanded-menu__link': true
  });

  return (
    <NavLink className={classes} to={url} activeClassName="active">
      <MaterialIcon icon={icon} invert />
      {text}
    </NavLink>
  );
};
