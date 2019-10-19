import * as React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const FadeUpAnimation = ({
  children
}) => {

  return (
    <ReactCSSTransitionGroup
      transitionName="fade-up"
      transitionAppear={true}
      transitionAppearTimeout={800}
      transitionEnterTimeout={0}
      transitionLeaveTimeout={0}>
      {children}
    </ReactCSSTransitionGroup>
  );
};

export default FadeUpAnimation;
