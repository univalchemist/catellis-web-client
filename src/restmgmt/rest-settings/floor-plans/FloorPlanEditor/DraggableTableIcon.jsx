import React, { Component } from 'react'
import * as classNames from 'classnames';
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { compose } from 'react-apollo';

import shouldPureComponentUpdate from './shouldPureComponentUpdate'
import ItemTypes from './ItemTypes'
import TableIcon from './TableIcon'
import getFloorPlanStateWrapper from 'restmgmt/store/operations/local.getFloorPlanState.query';
import setFloorPlanSelectedTableWrapper from 'restmgmt/store/operations/local.setFloorPlanSelectedTable.mutation';

const boxSource = {
	beginDrag(props) {
		// TODO: This long list of properties seem excessive...
		const { id, x, y, table_number, table_shape, table_size, min_covers, max_covers } = props;

		return { id, x, y, table_number, table_shape, table_size, min_covers, max_covers };
	},
};

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

class DraggableTableIcon extends Component {
	onClick = () => {
		if (this.props.isStamp) return;

		this.props.onUpdateSelectedTable();
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	componentDidMount() {
		// Use empty image as a drag preview so browsers don't draw it
		// and we can draw whatever we want on the custom drag layer instead.
		this.props.connectDragPreview(getEmptyImage(), {
			// IE fallback: specify that we'd rather screenshot the node
			// when it already knows it's being dragged so we can hide it with CSS.
			captureDraggingState: true,
		})
	}

	render() {
		const { connectDragSource, table_number, table_size, table_shape, table_rotation } = this.props
		const { isHighlighted = false } = this.props
		const tableIconProps = {table_number, table_size, table_shape, table_rotation}

		const classes = classNames({
			'rest-floor-create__table-icon': true,
			'rest-floor-create__table-icon--active': isHighlighted
		});

		return connectDragSource(
			<div
				className={classes}
				style={getStyles(this.props)}
				onClick={this.onClick}
			>
				<TableIcon
					isHighlighted={isHighlighted}
					isTableNumberVisible={!this.props.isDragging}
					{...tableIconProps}
				/>
			</div>,
		)
	}
}

export default compose(
  getFloorPlanStateWrapper(
		'getFloorPlanState',
		{
			props: ({getFloorPlanState, ownProps: {id}}) => {
				const newProps = {
					isHighlighted: false
				};

				if (!getFloorPlanState.loading && !getFloorPlanState.error) {
					newProps.isHighlighted = getFloorPlanState.restMgmtState.floorPlanState.selectedTableId === id;
				}

				return newProps;
			}
		}
	),
	setFloorPlanSelectedTableWrapper(
		'setFloorPlanSelectedTable',
		{
			props: ({setFloorPlanSelectedTable, ownProps}) => ({
				onUpdateSelectedTable: () => {

					const opQ = setFloorPlanSelectedTable({
						variables: {
							id: ownProps.id
						}
					});

					return opQ;
				}
			}),
		}
	),
	DragSource(
		ItemTypes.TABLE,
		boxSource,
		(connect, monitor) => ({
			connectDragSource: connect.dragSource(),
			connectDragPreview: connect.dragPreview(),
			isDragging: monitor.isDragging(),
		})
	)
)(DraggableTableIcon);
