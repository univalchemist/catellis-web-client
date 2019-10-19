import * as React from 'react';
import MaterialIcon from 'material-icons-react';

import { AsideHeader } from 'restmgmt/shared/AsideHeader';
import { FadeInDelayAnimation } from 'shared/animations';
import styles from 'stylesheets/settings/variables/_colors.scss'

export const AsideHeaderBack = ({
  onClickBack,
  ariaLabel = 'back',
}) => {
  return (
    <AsideHeader ariaLabel={ariaLabel}>
      <FadeInDelayAnimation>
        <a
          onClick={onClickBack}
          className="clickable rest-page__aside__back-link"
        >
          <MaterialIcon icon="navigate_before" color={styles.blueBase} />
          Back
        </a>
      </FadeInDelayAnimation>
    </AsideHeader>
  );
};

export default AsideHeaderBack;
