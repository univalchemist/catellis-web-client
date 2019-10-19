import * as React from 'react';
import { Fragment as Frag } from 'react';
import * as moment from 'moment';
import MaterialIcon from 'material-icons-react';
import { compose } from 'react-apollo';
import Datetime from 'react-datetime';
import * as _get from 'lodash.get';

import { Button } from 'shared/buttons';
import getActiveDateWrapper from 'restmgmt/store/operations/local.getActiveDate.query';
import setActiveDateWrapper from 'restmgmt/store/operations/local.setActiveDate.mutation';

class DateTabber extends React.Component {
  state = {
    isDatePickerVisible: false
  };

  getActiveDate = () => {
    let activeDate = _get(
      this.props,
      'getActiveDate.restMgmtState.activeDate',
      moment().toISOString()
    );

    return activeDate;
  }

  getActiveDateAsMoment = () => {
    return moment(this.getActiveDate());
  }

  executeSetActiveDate = async (activeDateMoment) => {
    const result = await this.props.setActiveDate({
      variables: {
        activeDate: activeDateMoment.toISOString()
      }
    });

    return result;
  }

  onClickBefore = async () => {
    await this.executeSetActiveDate(
      this.getActiveDateAsMoment().subtract(1, 'days')
    );
  }

  onClickAfter = async () => {
    await this.executeSetActiveDate(
      this.getActiveDateAsMoment().add(1, 'days')
    );
  }

  onClickToggleDatePickerVisible = () => {
    this.setState(
      ({isDatePickerVisible}) => ({isDatePickerVisible: !isDatePickerVisible})
    )
  }

  onSelectDate = async (dateMoment) => {
    await this.executeSetActiveDate(dateMoment);
    this.onClickToggleDatePickerVisible();
  }

  render() {
    const dateFormatString = this.getActiveDateAsMoment().get('month') === 4
      ? 'dddd, MMM D'
      : 'dddd, MMM. D';

    return (
      <Frag>
        <Button
          buttonStyle="menu-light date-buttons"
          size="sm"
          onClick={() => this.onClickBefore()}
        >
          <MaterialIcon
            icon="navigate_before"
            size="small"
            invert
          />
        </Button>
        <span
          onClick={() => this.onClickToggleDatePickerVisible()}
          className="clickable date-trigger"
        >
          {this.getActiveDateAsMoment().format(dateFormatString)}
        </span>
        <Button
          buttonStyle="menu-light date-buttons"
          size="sm"
          onClick={() => this.onClickAfter()}
        >
          <MaterialIcon icon="navigate_next" invert size="small" />
        </Button>
        <span className="date-container">
          <Datetime
            dateFormat="YYYY-MM-DD"
            value={this.getActiveDateAsMoment()}
            timeFormat={false}
            closeOnSelect={true}
            disableOnClickOutside={false}
            input={false}
            open={this.state.isDatePickerVisible}
            onChange={dateMoment => this.onSelectDate(dateMoment)}
          />
        </span>
      </Frag>
    );
  }
}

export default compose(
  getActiveDateWrapper('getActiveDate'),
  setActiveDateWrapper('setActiveDate'),
)(DateTabber);
