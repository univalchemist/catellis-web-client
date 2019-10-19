import * as React from 'react';

export const LoadingIndicator = () => {
  return (
    <div className="loading-indicator">
      <ul className="loading-indicator__icons">
        <li className="loading-indicator__icon--1 loading-indicator__icon"></li>
        <li className="loading-indicator__icon--2 loading-indicator__icon"></li>
        <li className="loading-indicator__icon--3 loading-indicator__icon"></li>
        <li className="loading-indicator__icon--4 loading-indicator__icon"></li>
        <li className="loading-indicator__icon--5 loading-indicator__icon"></li>
        <li className="loading-indicator__icon--6 loading-indicator__icon"></li>
        <li className="loading-indicator__icon--7 loading-indicator__icon"></li>
        <li className="loading-indicator__icon--8 loading-indicator__icon"></li>
        <li className="loading-indicator__icon--9 loading-indicator__icon"></li>
        <li className="loading-indicator__icon--10 loading-indicator__icon"></li>
        <li className="loading-indicator__icon--11 loading-indicator__icon"></li>
        <li className="loading-indicator__icon--12 loading-indicator__icon"></li>
      </ul>
      <p className="loading-indicator__text">
        <small><b>Loading</b></small>
      </p>
    </div>
  );
};

export default LoadingIndicator;
