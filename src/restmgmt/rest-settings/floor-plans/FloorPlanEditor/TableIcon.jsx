import React, { Component } from 'react';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';
import SVG from 'react-inlinesvg';

import TableConflictIcon from 'restmgmt/rsvplist/TableConflictIcon';
import TableUpcomingIcon from 'restmgmt/rsvplist/TableUpcomingIcon';

function getIconForTableProps(table_shape, table_size) {
	return require(`assets/images/icons/tables/${table_shape}-${table_size}.svg`);
}

function rotateTable(table_rotation) {
	const transform = `rotate(${table_rotation}deg)`;

	return {
		transform,
		WebkitTransform: transform,
		display: 'block'
	};
}

export default class TableIcon extends Component {
	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		const {
			table_number,
			table_shape,
			table_size,
			table_rotation = 0,
			isTableNumberVisible = true,
			isConflicted = false,
			isUpcoming = false,
		} = this.props;

		const tableIcon = getIconForTableProps(table_shape, table_size);

		return (
			<div>
				<SVG
					style={rotateTable(table_rotation)}
					src={tableIcon}
					alt="Table"
				/>
				{isTableNumberVisible && (
					<span className="rest-floor-create__table-number">
						{isConflicted && (<TableConflictIcon />)}
						{isUpcoming && (<TableUpcomingIcon />)}
						{table_number}
					</span>
				)}
			</div>
		);
	}
}
