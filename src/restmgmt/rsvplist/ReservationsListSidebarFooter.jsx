import * as React from 'react';

import MaterialIcon from 'material-icons-react';

import { Button } from 'shared/buttons';
import { NavLink } from 'react-router-dom';

class ReservationsListSidebarFooter extends React.Component {

  render() {
    return (
      <footer className="rest-page__aside__footer">
        <nav aria-label="reservation-list-navigation">
          <ul className="list">
            <li className="item">
              <NavLink
                className="link"
                to={`/rm/rsvp_list/upcoming`}
                activeClassName="active"
              >
                <Button buttonStyle="modal" size="sm">
                  <MaterialIcon icon="event" color="inherit" />
                  Upcoming
                </Button>
              </NavLink>
            </li>
            <li className="item">
              <NavLink
                className="link"
                to={`/rm/rsvp_list/seated`}
                activeClassName="active"
              >
                <Button buttonStyle="modal" size="sm">
                  <MaterialIcon icon="event_seat" color="inherit" />
                  Seated
                </Button>
              </NavLink>
            </li>
            <li className="item">
              <NavLink
                className="link"
                to={`/rm/rsvp_list/create`}
                activeClassName="active"
              >
                <Button buttonStyle="modal" size="sm">
                  <MaterialIcon icon="date_range" color="inherit" />
                  Create
                </Button>
              </NavLink>
            </li>
          </ul>
        </nav>
      </footer>
    );
  }
}

export default ReservationsListSidebarFooter
