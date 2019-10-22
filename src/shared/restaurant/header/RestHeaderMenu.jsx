import React from 'react';

import LogoutLink from 'shared/auth/LogoutLink';
import { Avatar } from 'shared/avatar/Avatar';
import { Chip } from 'shared/chip/Chip';
import { ChipTextContainer } from 'shared/chip/ChipTextContainer';
import { ChipTitle } from 'shared/chip/ChipTitle';
import { ChipDescription } from 'shared/chip/ChipDescription';
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';
import { RestHeaderMenuLink } from 'shared/restaurant/header/RestHeaderMenuLink';
import meQueryWrapper from 'shared/auth/api.me.query';
import ActiveDateCurrentRestaurantQuery from 'restmgmt/shared/ActiveDateCurrentRestaurantQuery';

const UserChip = (props) => {
  const { loading, meUser } = props.me || {loading: false, meUser: null};

  if (loading || !meUser) {
    return (<LoadingIndicator />);
  }

  return (
    <Chip size="lg">
      <Avatar size="lg" avatarText={meUser.name} />
      <ChipTextContainer>
        <ChipTitle text={meUser.name} invert="true" />
        <ChipDescription invert="true">
          <LogoutLink />
        </ChipDescription>
      </ChipTextContainer>
    </Chip>
  );
};

const CurrentRest = () => {

  return (
    <ActiveDateCurrentRestaurantQuery>
      {({restaurant}) => (
        <h4 className="margin-reset--bottom text--white">{restaurant.name}</h4>
      )}
    </ActiveDateCurrentRestaurantQuery>
  );
};

const WrappedUserChip = meQueryWrapper()(UserChip);

class RestHeaderMenu extends React.Component {

  render() {

    return (
      <div>
        <nav className={`rest-header__expanded-menu ${this.props.open ? 'rest-header__expanded-menu--open' : 'rest-header__expanded-menu--closed'}`}>
          <header
            className="rest-header__expanded-menu__header"
            aria-label="signed-in-restaurant"
          >
            <CurrentRest />
          </header>
          <div className="rest-header__expanded-menu__link-group">
            <label className="text--white">Manage Restaurant</label>
            <ul>
              <li
                onClick={this.props.menuToggle}
                className="rest-header__expanded-menu__link-item"
              >
                <RestHeaderMenuLink text="Manage Reservations" icon="restaurant" url="/rm/rsvp_list" />
              </li>
              <li
                onClick={this.props.menuToggle}
                className="rest-header__expanded-menu__link-item"
              >
                <RestHeaderMenuLink text="Reservations Grid" icon="grid_on" url="/rm/rsvp_grid" />
              </li>
              <li
                onClick={this.props.menuToggle}
                className="rest-header__expanded-menu__link-item"
              >
                <RestHeaderMenuLink text="Manage Customers" icon="people" url="/rm/customers" />
              </li>
              <li
                onClick={this.props.menuToggle}
                className="rest-header__expanded-menu__link-item"
              >
                <RestHeaderMenuLink text="Restaurant Settings" icon="settings" url="/rm/restaurant_settings/general" />
              </li>
            </ul>
          </div>
          <footer className="rest-header__expanded-menu__footer">
            <WrappedUserChip />
          </footer>
        </nav>
        <div
          className={`rest-header__expanded-menu-overlay ${this.props.open ? 'rest-header__expanded-menu-overlay--open' : 'rest-header__expanded-menu-overlay--closed'}`}
          onClick={this.props.menuToggle}
        />
      </div>
    );
  }
}

export default RestHeaderMenu;
