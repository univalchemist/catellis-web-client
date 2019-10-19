import React, { Component, Fragment } from 'react'

class FloorPlanLayout extends Component {
	render() {
		const {
			tables,
			tableRender
		} = this.props;

		const renderableTables = Object
			.keys(tables)
			.map(key => tables[key])
			.filter(table => !table._destroy);

		return (
			<Fragment>
				{renderableTables.map(table => tableRender(table))}
			</Fragment>
		)
	}
}

export default FloorPlanLayout;
