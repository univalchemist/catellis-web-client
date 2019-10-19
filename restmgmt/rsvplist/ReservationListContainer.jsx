import { Component } from 'react';

export class ReservationListContainer extends Component {
  state = {
    childComponents: {},
    activeCount: 0,
    totalCount: 0,
  };

  onExpandedUpdate = (childKey, isExpanded) => {
    this.setState(
      (prevState, currentProps) => {
        const newState = {
          ...prevState,
          childComponents: {
            ...prevState.childComponents,
            [childKey]: isExpanded
          }
        };

        newState.activeCount = Object.keys(newState.childComponents)
          .map(key => newState.childComponents[key])
          .reduce((sum, currComp) => currComp ? sum + 1 : sum);

        newState.totalCount = Object.keys(newState.childComponents).length;

        return newState;
      }
    );
  }

  getChildIsExpanded = (childKey) => {
    return this.state.childComponents[childKey] === true;
  }

  render() {
    return this.props.children({
      activeCount: this.state.activeCount,
      totalCount: this.state.totalCount,
      onExpandedUpdate: this.onExpandedUpdate,
      getChildIsExpanded: this.getChildIsExpanded,
    });
  }
}

export default ReservationListContainer;
