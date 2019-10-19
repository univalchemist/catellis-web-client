import React from 'react';

import RestHeaderMenuAction from 'shared/restaurant/header/RestHeaderMenuAction';
import RestHeaderTitle from 'shared/restaurant/header/RestHeaderTitle';
import RestHeaderActionList from 'shared/restaurant/header/RestHeaderActionList';

class RestHeader extends React.Component {

  render() {
    const { actionsList } = this.props;

    return (
      <header role="banner" className="rest-header">
        <RestHeaderMenuAction />
        <RestHeaderTitle {...this.props} />
        <RestHeaderActionList actionsList={actionsList} />
      </header>
    );
  }
}

export default RestHeader;
