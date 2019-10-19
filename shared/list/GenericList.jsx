import React, { Component } from 'react';
import { DefaultNoResults } from 'shared/no-results/NoResults';

class GenericList extends Component {
	render() {
		const {
			list,
      children: renderItem,
      className,
      noResultsText = "No results to display."
		} = this.props;

    if (list.length === 0) {
      return (
        <DefaultNoResults text={noResultsText} />
      );
    }

		return (
			<ul className={className}>
        {list.map(item => renderItem(item))}
      </ul>
		);
	}
}
export default GenericList;
