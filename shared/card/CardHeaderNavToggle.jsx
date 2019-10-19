import * as React from 'react';
import { ToggleField } from 'shared/form/fields/ToggleField';

export const CardHeaderNavToggle = ({
  itemTitle,
  position,
  children
}) => {

  return (
    <li className={`card__header-nav__item ${position}`}>
      <ToggleField
        label={itemTitle}
      />
    </li>
  );
};

export default CardHeaderNavToggle;
