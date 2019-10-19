import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'react-apollo';
import { debounce } from 'throttle-debounce';

import ReservationsList from 'restmgmt/rsvplist/ReservationsList';
import ReservationsListSidebarFooter from 'restmgmt/rsvplist/ReservationsListSidebarFooter';

class ReservationsListSidebar extends Component {
  state = {
    search_text: ''
  };

  updateSearchText = debounce(300, (value) => {
    this.setState({search_text: value});
  });

  render() {
    return (
      <Fragment>
        <header
          className="rest-page__aside__header"
          aria-label="search-for-a-reservation"
        >
          <input
            type="search"
            className="input--search"
            placeholder="Search for a reservation"
            onChange={(evt) => this.updateSearchText(evt.target.value)}
          />
        </header>
        <ReservationsList
          search_text={this.state.search_text}
          category={this.props.match.params.category}
          headerName={this.props.match.params.category}
        />
        <ReservationsListSidebarFooter />
      </Fragment>
    );
  }
}

export default compose(
  withRouter
)(ReservationsListSidebar);
