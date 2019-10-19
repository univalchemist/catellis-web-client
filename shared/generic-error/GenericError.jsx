import React, { Component } from 'react';
import NoResults from 'shared/no-results/NoResults';

class GenericError extends Component {
	render() {
		const {
			isError = true,
      text = "Oh no! We've encountered an error."
		} = this.props;

		return (
			<NoResults 
				isError={isError}
				text={text}
			/>
		);
	}
}

export default GenericError;
