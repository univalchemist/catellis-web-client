import * as React from 'react';
import MaterialIcon from 'material-icons-react';

import { AsideHeader } from 'restmgmt/shared/AsideHeader';
import { FadeInDelayAnimation } from 'shared/animations';
import { Button } from 'shared/buttons';
import styles from 'stylesheets/settings/variables/_colors.scss'

export const AsideHeaderClose = ({
  onClickClose,
  ariaLabel = 'close',
  text = `Close`,
  rightBtn = false,
  rightBtnLabel = '',
  onClickRightBtn = undefined
}) => {
  return (
    <AsideHeader ariaLabel={ariaLabel}>
      <FadeInDelayAnimation>
        <a
          onClick={onClickClose}
          className="clickable rest-page__aside__back-link"
        >
          <MaterialIcon icon="clear" color={styles.blueBase} />
          <h5 className="title">{text}</h5>
        </a>
      </FadeInDelayAnimation>
      {rightBtn && (
          <Button
              buttonStyle="secondary"
              size="sm"
              disabled={false}
              onClick={onClickRightBtn}
          >
            {rightBtnLabel}
          </Button>
      )}

    </AsideHeader>
  );
};

export default AsideHeaderClose;
