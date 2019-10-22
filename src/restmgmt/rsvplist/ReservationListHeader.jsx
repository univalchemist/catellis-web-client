import React from 'react';
import MaterialIcon from 'material-icons-react';

import {
  GridCol,
  GridRow
} from 'shared/layout/grid';
import styles from 'stylesheets/settings/variables/_colors.scss';

export const ReservationListHeader = ({
  text,
  onClick = () => undefined,
  reservations = [],
  isCollapseToggleVisible = false
}) => {
  const reservationsCount = reservations != null
    ? reservations.reduce((sum, rsvp) => sum + rsvp.party_size, 0)
    : 0;

  return (
    <header
      className="rest-page__aside__res-list-item__header"
      onClick={onClick}
    >
      <GridRow>
        <GridCol m={6} l={8}>
          <h4>{text}</h4>
        </GridCol>
        <GridCol m={3} l={4}>
          <ul className="rest-page__aside__res-list-item__header-list">
            <li className="rest-page__aside__res-list-item__header--count">
              <MaterialIcon icon="people" color={styles.greyAlt1} />
              <h6 className="margin--reset">{reservationsCount}</h6>
            </li>
            {isCollapseToggleVisible && (
              <li className="rest-page__aside__res-list-item__header--action">
                <MaterialIcon icon="keyboard_arrow_down" color={styles.greyAlt1} />
              </li>
            )}
          </ul>
        </GridCol>
      </GridRow>
    </header>
  );
};

export default ReservationListHeader;
