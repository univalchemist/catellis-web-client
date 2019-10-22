import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { compose } from 'react-apollo';

import FloorPlanLayout from './FloorPlanLayout';
import ItemTypes from './ItemTypes'
import DraggableTableIcon from './DraggableTableIcon'
import snapToGrid from './snapToGrid'
import { LoadingIndicator } from 'shared/loading-indicator/LoadingIndicator';
import getFloorPlanWrapper from 'restmgmt/store/operations/local.getFloorPlan.query';
import setFloorPlanTableAttrsWrapper from 'restmgmt/store/operations/local.setFloorPlanTableAttrs.mutation';
import addFloorPlanTableWrapper from 'restmgmt/store/operations/local.addFloorPlanTable.mutation';

const tableTarget = {
	drop(props, monitor, component) {
		const item = monitor.getItem()

		if (item.id === 'new') {
			// Compute position of new item
			const boundingClientRect = component.containerRef.getBoundingClientRect();
			let x = Math.round(monitor.getClientOffset().x - boundingClientRect.x)
			let y = Math.round(monitor.getClientOffset().y - boundingClientRect.y)
			if (props.snapToGrid) {
				[x, y] = snapToGrid(x, y)
			}

			const newTableDetails = {
				table_number: '?',
				table_size: item.table_size,
				table_shape: item.table_shape,
				table_type: 'indoor',
				table_rotation: 0,
				min_covers: item.min_covers,
				max_covers: item.max_covers,
				x: x,
				y: y,
			};

			props.onAdd(newTableDetails);
		} else {
			// Compute item's new position
			const delta = monitor.getDifferenceFromInitialOffset()
			let x = Math.round(item.x + delta.x)
			let y = Math.round(item.y + delta.y)
			if (props.snapToGrid) {
				[x, y] = snapToGrid(x, y)
			}

			props.onUpdate({
				id: item.id,
				x: x,
				y: y,
			})
		}
	},
};

class DragContainer extends Component {
	setContainerRef = (el) => {
		this.containerRef = el;
	}

	render() {
		const { connectDropTarget } = this.props

		if (this.props.getFloorPlan.loading) {
			return (<LoadingIndicator />);
		}

		const {floor_plan_tables: tables} = this.props.getFloorPlan.getFloorPlan;

		return connectDropTarget(
			<div className="rest-floor-create__section rest-floor-create__section--grid rest-floor-create__section--height-auto" ref={this.setContainerRef}>
				<FloorPlanLayout
					tables={tables}
					tableRender={(table) => (
						<DraggableTableIcon
							key={table.id}
							{...table}
						/>
					)}
				/>
			</div>,
		)
	}
}

export default compose(
	getFloorPlanWrapper(
		'getFloorPlan',
    {
      options: (props) => ({
        variables: {
          id: props.id
        }
      }),
		}
	),
	setFloorPlanTableAttrsWrapper(
		'setFloorPlanTableAttrs',
		{
			props: ({setFloorPlanTableAttrs, ownProps}) => ({
				onUpdate: (attrs) => {
					const opQ = setFloorPlanTableAttrs({
						variables: {
							id: attrs.id,
							y: attrs.y,
							x: attrs.x,
						}
					});

					return opQ;
				}
			}),
		}
	),
	addFloorPlanTableWrapper(
		'addFloorPlanTable',
		{
			props: ({addFloorPlanTable, ownProps}) => ({
				onAdd: (attrs) => {
					const opQ = addFloorPlanTable({
						variables: {
							input: {
								y: attrs.y,
								x: attrs.x,
								table_shape: attrs.table_shape,
								table_size: attrs.table_size,
								table_number: attrs.table_number,
								table_type: attrs.table_type,
								table_rotation: attrs.table_rotation,
								min_covers: attrs.min_covers,
								max_covers: attrs.max_covers,
							}
						}
					});

					return opQ;
				}
			}),
		}
	),
	DropTarget(
	  ItemTypes.TABLE,
		tableTarget,
		connect => ({
			connectDropTarget: connect.dropTarget(),
		})
	)
)(DragContainer);
