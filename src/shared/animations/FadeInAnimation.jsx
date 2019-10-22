import * as React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const FadeInAnimation = ({
  children
}) => {

  return (
    <ReactCSSTransitionGroup
      transitionName="fade-in"
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={0}
      transitionLeaveTimeout={0}>
      {children}
    </ReactCSSTransitionGroup>
  );
};

export default FadeInAnimation;
