import * as React from 'react';
import { Fragment as Frag } from 'react';

import RestHeader from 'shared/restaurant/header/RestHeader';
import Clock from 'restmgmt/shared/Clock';

class Header extends React.Component {
  render() {
    return (
      <Frag>
        <RestHeader
          label={() => (<Clock />)}
          title={() => "Restaurant Settings"}
          actionsList={[]}
        />
      </Frag>
    );
  }
}

export default Header;
