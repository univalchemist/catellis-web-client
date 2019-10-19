import * as React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const ModalAnimation = ({
  children
}) => {

  return (
    <ReactCSSTransitionGroup
      transitionName="modal__state"
      transitionEnterTimeout={10}
      transitionLeaveTimeout={300}>
      {children}
    </ReactCSSTransitionGroup>
  );
};

export default ModalAnimation;
