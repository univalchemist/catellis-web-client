import React from 'react';
import MaterialIcon from 'material-icons-react';

import styles from 'stylesheets/settings/variables/_colors.scss';

const TableConflictIcon = ({size = 12}) => (
  <MaterialIcon
    icon="error"
    size={size}
    color={styles.redBase}
  />
);

export default TableConflictIcon;
