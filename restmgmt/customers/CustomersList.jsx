import * as React from 'react';
import { compose } from 'react-apollo';
import { NavLink } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import styles from 'stylesheets/settings/variables/_colors.scss';

import { Avatar } from 'shared/avatar/Avatar';
import { Chip } from 'shared/chip/Chip';
import { ChipTextContainer } from 'shared/chip/ChipTextContainer';
import { ChipTitle } from 'shared/chip/ChipTitle';
import { ChipDescription } from 'shared/chip/ChipDescription';
import { FadeInAnimation } from 'shared/animations';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';
import format from 'shared/formatters/phone-number';
import customersQueryWrapper from 'restmgmt/customers/api.listCustomers.query';

function customerTags(tag) {
  if (tag && tag.trim().length > 0) {
    return (
      <MaterialIcon icon="local_offer" size={12} color={styles.blueBase}/>
    );
  }

  return null;
}

class CustomersList extends React.Component {
  render() {
    const { loading = false, listCustomers: customers } = this.props.customers;

    if (loading || !customers) {
      return (<LoadingIndicator />);
    }

    if (customers.length === 0) {
      // FIXME: This needs a better component.
      return (
        <p className="rest-page__aside__no-search-results">No customers matched your search.</p>
      );
    }

    return (
      <FadeInAnimation>
        <ul className="rest-page__aside__body rest-page__aside__body--pad-sm chip__list--100vh">
          {customers.map(customer => (
            <li className="chip__list__item" key={customer.id}>
              <NavLink
                to={`/rm/customers/${customer.id}`}
                activeClassName="active"
              >
                <Chip size="lg">
                  <Avatar size="lg" avatarText={customer.name} />
                  <ChipTextContainer>
                    <ChipTitle text={customer.name} tag={customerTags(customer.tags)} />
                    <ChipDescription text={format(customer.phone_number) || 'No phone number'} />
                  </ChipTextContainer>
                </Chip>
              </NavLink>
            </li>
          ))}
        </ul>
    </FadeInAnimation>
    );
  }
}

export default compose(
  customersQueryWrapper(
    'customers',
    {
      options: ({search_text}) => ({
        variables: {
          search_text
        }
      })
    }
  )
)(CustomersList);
