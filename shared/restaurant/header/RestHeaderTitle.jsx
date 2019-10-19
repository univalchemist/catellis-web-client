import React from 'react';
import * as classNames from 'classnames';

class RestHeaderTitle extends React.Component {
  render() {
    const {
      label,
      title,
      actionsList
    } = this.props;

    const actionsListLength = (actionsList && actionsList.length) || 0;

    const classes = classNames({
      'rest-header__middle': true,
      [`rest-header__middle--${actionsListLength}`]: true
    });

    return (
      <div className={classes}>
        <p className="text--white text--small margin-bottom--4">
          <b>
            {label()}
          </b>
        </p>
        <h4 className="text--white margin-reset--bottom">
          {title()}
        </h4>
      </div>
    );
  }
}

export default RestHeaderTitle;
