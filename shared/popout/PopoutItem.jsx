import React from 'react';
import * as classNames from 'classnames';
import MaterialIcon from 'material-icons-react';

import styles from 'stylesheets/settings/variables/_colors.scss';

export const PopoutItem = ({
  children,
  text,
  isActive = false,
  onClick = () => undefined
}) => {
  const classes = classNames({
    'popout__item': true,
    'is-active': isActive,
    'clickable': true,
  });

  return (
    <li
      className={classes}
      onClick={onClick}
    >
      <span className="margin-right--64">{text || children}</span>
      {isActive && (
        <MaterialIcon
          icon="check_circle"
          invert size="small"
          color={styles.greenBase}
        />
      )}
    </li>
  );
};

export default PopoutItem;
