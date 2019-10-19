import React from 'react';
import BodyClassName from 'react-body-classname';

export const RestaurantMgmtBodyWrapper = ({children}) => (
  <BodyClassName className="background--black-alt-2">
    {children}
  </BodyClassName>
)

export default RestaurantMgmtBodyWrapper
