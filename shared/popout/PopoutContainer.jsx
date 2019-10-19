import React, { Component } from 'react';
import * as classNames from 'classnames';

export class PopoutContainer extends Component {
  state = {
    isOpen: false,
  };

  handleOnClick = () => {
    this.setState((prevState, props) => (
      {
        ...prevState,
        isOpen: !prevState.isOpen
      }
    ));
  }

  render() {
    const {
      button,
      content
    } = this.props;

    const classes = classNames({
      'popout__container': true,
    });

    return (
      <div className={classes}>
        {button(this.handleOnClick)}
        {content(this.state.isOpen, this.handleOnClick)}
      </div>
    );
  }
}

export default PopoutContainer;
