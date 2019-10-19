import * as React from 'react';
import { compose } from 'react-apollo';
import * as moment from 'moment-timezone';

import getCurrentRestaurantQueryWrapper from 'restmgmt/rest-settings/api.getCurrentRestaurant.query';

class Clock extends React.Component {
  state = {
    currentTimeMoment: moment()
  };
  intervalId = null;

  componentWillMount() {
    this.intervalId = setInterval(
      () => {
        if (!this.getIsLoading()) {
          const timezoneMoment = moment.tz(
            this.getRestaurant().timezone_name
          );

          this.setState({currentTimeMoment: timezoneMoment});
        }
      },
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getIsLoading = () => {
    return this.props.restaurant.loading;
  }

  getRestaurant = () => {
    return this.props.restaurant.getCurrentRestaurant;
  }

  render() {
    if (this.getIsLoading()) {
      return 'Loading...';
    }

    return this.state.currentTimeMoment.format('h:mm a');
  }
}

export default compose(
  getCurrentRestaurantQueryWrapper('restaurant')
)(Clock);
