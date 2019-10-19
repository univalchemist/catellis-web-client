import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'react-apollo';

class LogoutLink extends React.Component {
  onClickLogout = () => {
    const {props: {history}} = this;

    history.push('/logout')
  }

  render() {
    return (
      <a
        className="clickable"
        onClick={this.onClickLogout}
      >Logout</a>
    );
  }
}

export default compose(
  withRouter,
)(LogoutLink);
