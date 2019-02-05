import { Icon } from 'antd'
import * as React from 'react'
import { Navigate, ToolbarProps } from 'react-big-calendar'
import styled from 'styled-components'

const ToolbarWrapper = styled.div`
	display: flex;
	position: relative;
	justify-content: start;
	align-items: center;
	padding: 16px 8px;
	& > i {
		flex-basis: auto;
		flex-grow: 0;
		flex-shrink: 0;
		margin: 0;
	}
	h3 {
		flex-basis: auto;
		flex-grow: 1;
		flex-shrink: 0;
		text-align: center;
		margin: 0;
		font-weight: bold;
	}
`
const iconStyle = {
	color: 'rgba(0, 0, 0, 0.45)'
}

export class Toolbar extends React.Component<ToolbarProps> {
	public render() {
		const { label } = this.props
		return (
			<ToolbarWrapper>
				<Icon
					type="left"
					onClick={this.navigate.bind(null, 'PREV')}
					style={iconStyle}
				/>
				<h3 onClick={this.navigate.bind(null, 'TODAY')}>{label}</h3>
				<Icon
					type="right"
					onClick={this.navigate.bind(null, 'NEXT')}
					style={iconStyle}
				/>
			</ToolbarWrapper>
		)
	}
	private navigate = (action: Navigate): void => {
		this.props.onNavigate(action)
	}
}
