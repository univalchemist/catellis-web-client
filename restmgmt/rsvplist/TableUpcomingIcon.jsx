import React from 'react';
import MaterialIcon from 'material-icons-react';

import styles from 'stylesheets/settings/variables/_colors.scss';

const TableUpcomingIcon = ({size = 12}) => (
  <MaterialIcon
    icon="event"
    size={size}
    color={styles.grayBase}
  />
);

export default TableUpcomingIcon;
