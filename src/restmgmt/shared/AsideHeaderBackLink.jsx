import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'react-apollo';

import { AsideHeaderBack } from 'restmgmt/shared/AsideHeaderBack';

export const AsideHeaderBackLink = ({
  linkTo,
  ariaLabel = 'link',
  history
}) => {
  return (
    <AsideHeaderBack
      ariaLabel={ariaLabel}
      onClickBack={() => history.push(linkTo)}
    />
  );
};

export default compose(
  withRouter
)(AsideHeaderBackLink);
