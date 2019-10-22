import React from 'react';
import MaterialIcon from 'material-icons-react';

import Button from './Button';
import styles from 'stylesheets/settings/variables/_colors.scss';

export const MaterialIconButton = ({
  onClick = () => undefined,
  buttonStyle = 'modal',
  size,
  iconName = 'warning',
  iconColor = styles.grayDark
}) => (
  <Button
    buttonStyle={buttonStyle}
    size={size}
    onClick={onClick}
  >
    <MaterialIcon
      icon={iconName}
      color={iconColor}
    />
  </Button>
);

export default MaterialIconButton;
