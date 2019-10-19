import React from 'react';
import * as classNames from 'classnames';

import MaterialIcon from 'material-icons-react';

import styles  from 'stylesheets/settings/variables/_colors.scss'

export const RestSectionBlankState = ({
  title,
  description,
  icon,
  sectionDark = false
}) => {
  const classes = classNames({
    'rest-page__section--blank': true,
    'rest-page__section--blank--dark': sectionDark,
  });

  return (
    <div className={classes}>
      <MaterialIcon icon={icon} size="120px" color={sectionDark ? styles.whiteBase : styles.grayBase} />
      <h4 className="rest-page__section--blank__title">{title}</h4>
      <p className="rest-page__section--blank__description">{description}</p>
    </div>
  );
};

export default RestSectionBlankState;
