import * as React from 'react';
import MaterialIcon from 'material-icons-react';

import Button from 'shared/buttons/Button';
import styles from 'stylesheets/settings/variables/_colors.scss';

export const PopoutButton = ({
  onClick = () => undefined,
  buttonStyle = 'menu-dark popout__button',
  size = 'sm',
  text,
  children,
  iconName = 'keyboard_arrow_down',
  iconColor = styles.whiteBase
  }) => (
  <Button
    buttonStyle={buttonStyle}
    size={size}
    onClick={onClick}
  >
    {text ? text : children}
    <MaterialIcon
      icon={iconName}
      color={iconColor}
    />
  </Button>

);

export default PopoutButton;
