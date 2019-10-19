import React, { useState, useEffect, Fragment } from 'react';
import MaterialIcon from 'material-icons-react';

import styles from 'stylesheets/settings/variables/_colors.scss'

import { Button } from 'shared/buttons/Button';
import { NavLink } from 'react-router-dom';
import {HooksTest} from './shared/test';

export const SideNav = (props) => {
  const [classs, setClass] = useState("rest-page__page-nav");

  return (
    <nav className={classs}>
      <ul>
        <li className="rest-page__page-nav__link">
          <NavLink
            to="/rm/rsvp_list"
            activeClassName="active"
          >
            <Button buttonStyle="menu-dark">
              <MaterialIcon icon="restaurant" color={styles.whiteBase} />
            </Button>
          </NavLink>
        </li>
        <li className="rest-page__page-nav__link">
          <NavLink
            to="/rm/rsvp_grid"
            activeClassName="active"
          >
            <Button buttonStyle="menu-dark">
              <MaterialIcon icon="grid_on" color={styles.whiteBase} />
            </Button>
          </NavLink>
        </li>
        <li className="rest-page__page-nav__link">
          <NavLink
            to="/rm/customers"
            activeClassName="active"
          >
            <Button buttonStyle="menu-dark">
              <MaterialIcon icon="people" color={styles.whiteBase} />
            </Button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
