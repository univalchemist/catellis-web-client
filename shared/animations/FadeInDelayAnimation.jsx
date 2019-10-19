import * as React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const FadeInDelayAnimation = ({
  children
}) => {

  return (
    <ReactCSSTransitionGroup
      transitionName="fade-in-delay"
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={0}
      transitionLeaveTimeout={0}>
      {children}
    </ReactCSSTransitionGroup>
  );
};

export default FadeInDelayAnimation;
