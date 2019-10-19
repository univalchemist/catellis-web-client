import React, { Component } from 'react'
import classNames from 'classnames';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import TableIcon from './TableIcon'
import GetFloorPlanStateQuery from 'restmgmt/shared/GetFloorPlanStateQuery';
import SetFloorPlanSelectedTableMutation from 'restmgmt/shared/SetFloorPlanSelectedTableMutation';
import { 
  findCurrentReservation,
  findUpcomingReservations,
	hasTablesConflicts,
} from 'restmgmt/shared/reservation-filters';

function getStyles(props) {
	const { x, y, isDragging } = props
	const transform = `translate(${x-94}px, ${y-86}px)`

	if (props.isStamp) {
		return {};
	}

	return {
		position: 'absolute',
		transform,
		WebkitTransform: transform,
		// // IE fallback: hide the real node using CSS when dragging
		// // because IE will ignore our custom "empty image" drag preview.
		opacity: isDragging ? 0 : 1
	}
}

class StaticTableIcon extends Component {
	onClick = () => {
		if (this.props.isStamp) return;

		const currentUrl = this.props.location.pathname;
		const tableAssignMatch = /^(.+\/assign_table)/.exec(currentUrl);
		let targetUrl;
		if (tableAssignMatch) {
			// Go to table assignment

			// Figure out jump location.
			// const cleanedTableAssignUrl = tableAssignMatch[1];
			//
			// targetUrl = `${cleanedTableAssignUrl}/${this.props.id}`;
		} else {
			// Determine if already at table details.
			const isAtTableDetails = /^\/rm\/rsvp_list\/table\//.test(currentUrl);
			if (isAtTableDetails && this.props.isHighlighted) {
				// Go to upcoming.
				targetUrl = `/rm/rsvp_list/upcoming`;
			} else {
				// Go to table details.
				targetUrl = `/rm/rsvp_list/table/${this.props.id}`;
			}

			// Jump!
			this.props.history.push(targetUrl);
		}

		let newSelectedId = this.props.id;
		if (this.props.isHighlighted) {
			newSelectedId = null;
		}
		this.props.onUpdateSelectedTable(newSelectedId);
	}

	render() {
		const {
			table_number,
			table_size,
			table_shape,
			table_rotation,
			isHighlighted = false,
			reservations = []
		} = this.props;
    const currentReservation = findCurrentReservation(reservations);
		const isSeated = currentReservation != null;
		const isUpcoming = findUpcomingReservations(reservations).length > 0;
		const isConflicted = hasTablesConflicts(reservations);
		const tableIconProps = {table_number, table_size, table_shape, table_rotation};

		const classes = classNames({
			'rest-floor-create__table-icon': true,
			'rest-floor-create__table-icon--active': isHighlighted, // || isUpcoming
			'rest-floor-create__table-icon--assigned': isUpcoming,
			'rest-floor-create__table-icon--reserved': isSeated && !isHighlighted
		});

		return (
			<div
				className={classes}
				style={getStyles(this.props)}
				onClick={this.onClick}
			>
				<TableIcon
					isHighlighted={isHighlighted}
					isTableNumberVisible={true}
					isConflicted={isConflicted}
					isUpcoming={isUpcoming}
					{...tableIconProps}
				/>
			</div>
		);
	}
}

const QueriedStaticTableIcon = (props) => (
	<SetFloorPlanSelectedTableMutation>
		{({mutation: onUpdateSelectedTable}) => (
			<GetFloorPlanStateQuery>
				{({data: floorPlanState}) => {
					const isHighlighted = floorPlanState.selectedTableId === props.id;

					return (
						<StaticTableIcon
							{...props}
							isHighlighted={isHighlighted}
							onUpdateSelectedTable={(newId) => onUpdateSelectedTable(newId)}
						/>
					)
				}}
			</GetFloorPlanStateQuery>
		)}
	</SetFloorPlanSelectedTableMutation>
);

export default compose(withRouter)(QueriedStaticTableIcon);
