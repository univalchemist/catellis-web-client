import * as React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const FadeInZoomAnimation = ({
  children
}) => {

  return (
    <ReactCSSTransitionGroup
      transitionName="fade-in-zoom"
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={0}
      transitionLeaveTimeout={0}>
      {children}
    </ReactCSSTransitionGroup>
  );
};

export default FadeInZoomAnimation;
