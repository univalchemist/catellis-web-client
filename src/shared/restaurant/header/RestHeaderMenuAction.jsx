import React from 'react';

import MaterialIcon from 'material-icons-react';
import RestHeaderMenu from 'shared/restaurant/header/RestHeaderMenu';
import { Button } from 'shared/buttons';

class RestHeaderMenuAction extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.menuToggle = this.menuToggle.bind(this);
  }

  menuToggle = () => this.setState({
    open: !this.state.open
  });

  render() {
    return (
      <div className="rest-header__left">
        <Button
          buttonStyle="menu-light"
          size="md"
          onClick={this.menuToggle}
        >
          <MaterialIcon icon="menu" invert />
        </Button>
        <RestHeaderMenu
          open={this.state.open}
          menuToggle={this.menuToggle}
        />
      </div>
    );
  }
}

export default RestHeaderMenuAction;
