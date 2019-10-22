import React, { Component } from 'react'
import shouldPureComponentUpdate from './shouldPureComponentUpdate'
import TableIcon from './TableIcon'

const styles = {
	display: 'inline-block',
}

export default class TableIconDragPreview extends Component {
	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		return (
			<div style={styles}>
				<TableIcon
					{...this.props}
					isTableNumberVisible={false}
				/>
			</div>
		)
	}
}
