import React from 'react';
import * as classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { PopoutList } from 'shared/popout/PopoutList';

class Popout extends React.Component {
  render() {
    const {
      isInverse = false,
      children,
      isOpen = false,
    } = this.props;

    const classes = classNames({
      'popout': true,
      'popout--inverse': isInverse
    });

    if (!isOpen) {
      return null;
    }

    return (
      // TODO: This is not accessibility friendly
      <ReactCSSTransitionGroup
        transitionName="popout__animation"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnter={false}
        transitionLeave={false}>
        <figure className={classes}>
          <PopoutList>
            {children}
          </PopoutList>
        </figure>
      </ReactCSSTransitionGroup>
    );
  }
}

export default Popout;
