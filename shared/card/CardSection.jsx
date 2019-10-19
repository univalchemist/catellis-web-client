import * as React from 'react';
import { FadeInAnimation } from 'shared/animations';

export const CardSection = ({
  title,
  intro,
  children
}) => {
  return (
    <FadeInAnimation>
      <h5 className="margin-bottom--8">{title}</h5>
      <p className="text--gray-med margin-bottom--24">
        {intro()}
      </p>
      {children}
    </FadeInAnimation>
  );
};

export default CardSection;
