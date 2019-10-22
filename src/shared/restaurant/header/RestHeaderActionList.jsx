import React from 'react';

class RestHeaderActionList extends React.Component {
  render() {
    const { actionsList } = this.props;

    return (
      <div className="rest-header__right">
        <ul className="action__list">
          {actionsList.map((actionButton, idx) => (
            <li className="action__item" key={idx}>
              {actionButton}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default RestHeaderActionList;
