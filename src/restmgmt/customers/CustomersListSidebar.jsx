import * as React from 'react';
import { compose } from 'react-apollo';

import CustomersList from 'restmgmt/customers/CustomersList';
import { debounce } from 'throttle-debounce';

class CustomersListSidebar extends React.Component {
  state = {
    search_text: ''
  };

  updateSearchText = debounce(300, (value) => {
    this.setState({search_text: value});
  });

  render() {
    return (
      <div>
        <header
          className="rest-page__aside__header"
          aria-label="search-for-a-customer">
          <input
            type="search"
            className="input--search"
            placeholder="Lookup by name or phone number"
            onChange={(evt) => this.updateSearchText(evt.target.value)}
          />
        </header>
        <CustomersList
          search_text={this.state.search_text}
        />
      </div>
    );
  }
}

export default compose()(CustomersListSidebar)
