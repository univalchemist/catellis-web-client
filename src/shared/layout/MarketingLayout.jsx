import React from 'react'
import BodyClassName from 'react-body-classname';

const MarketingLayout = (props) => (
  <BodyClassName className="background--gray-light">
      {props.children}
  </BodyClassName>
)

export default MarketingLayout
