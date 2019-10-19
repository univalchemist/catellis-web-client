import React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import classNames from 'classnames';

import styles from 'stylesheets/settings/variables/_colors.scss';

function reservationTable(table) {
  if (table) {
    return table.table_number;
  } else {
    return "--";
  }
}

const ReservationTableStatus = ({history, reservation, onClick}) => {
  const isConflicted = (
    reservation.table_conflicted === true ||
    reservation.isConflicted === true
  );

  const classes = classNames({
    'rsvp-list__item--right': true,
    'clickable': true,
    'background--red-base': isConflicted,
    'background--gray-light': !isConflicted,
  });

  let tableStatusIcon;
  if (isConflicted) {
    tableStatusIcon = (
      <MaterialIcon icon="error" size={12} color={styles.whiteBase} />
    );
  } else {
    tableStatusIcon = (
      <MaterialIcon icon="event_seat" size={12} color={styles.grayAlt1} />
    );
  }

  // const onClick = () => {
  //   history.push(`/rm/rsvp_list/reservation/${reservation.id}/assign_table`);
  // };

  return (
    <div
      className={classes}
      onClick={onClick}
    >
      <ul className="res-table__status">
        <li className="margin-reset--bottom text--center">
          <h6 className={`margin-reset--bottom ${isConflicted ? 'text--white' : 'text--gray-med'}`}>
            {reservationTable(reservation.floor_plan_table)}
          </h6>
        </li>
        <li className="margin-reset--bottom text--center">
          {tableStatusIcon}
        </li>
      </ul>
    </div>
  );
};

export default compose(withRouter)(ReservationTableStatus);
