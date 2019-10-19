import * as React from 'react';
import { Link } from 'react-router-dom';

import CustomerCreateReservation from 'marketing/CustomerCreateReservation';

const Home = () => {
  return (
    <div>
      <div className="customer-reservation-creation__container">
        <div className="customer-reservation-creation__left">
          <div className="customer-reservation-creation__bg-image"></div>
        </div>
        <div className="customer-reservation-creation__right">
          <div className="customer-reservation-creation__right-table">
            <nav className="customer-reservation-creation__right-nav">
              <Link to="/rm">Restaurant Login</Link>
            </nav>
            <CustomerCreateReservation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
