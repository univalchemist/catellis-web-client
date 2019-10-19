import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'react-apollo';

import { AsideHeaderBack } from 'restmgmt/shared/AsideHeaderBack';

export const AsideHeaderBackHistory = ({
  ariaLabel = 'link',
  history
}) => {
  return (
    <AsideHeaderBack
      ariaLabel={ariaLabel}
      onClickBack={() => history.goBack()}
    />
  );
};

export default compose(
  withRouter
)(AsideHeaderBackHistory);
