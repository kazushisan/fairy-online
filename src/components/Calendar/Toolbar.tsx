import { Icon } from 'antd'
import * as React from 'react'
import { ToolbarProps, NavigateAction } from 'react-big-calendar'
import styled from 'styled-components'

const ToolbarWrapper = styled.div`
	display: flex;
	position: relative;
	justify-content: start;
	align-items: center;
	padding: 16px 8px;
	& > i {
		flex-basis: auto;
		flex-grow: 1;
		flex-shrink: 0;
		margin: 0;
		cursor: pointer;
	}
	h3 {
		flex-basis: auto;
		flex-grow: 1;
		flex-shrink: 0;
		text-align: center;
		margin: 0;
		font-weight: bold;
		cursor: pointer;
	}
`
const iconStyle = {
	color: 'rgba(0, 0, 0, 0.45)',
}

export class Toolbar extends React.Component<ToolbarProps> {
	private navigate = (action: NavigateAction): (() => void) => (): void => {
		const { onNavigate } = this.props
		onNavigate(action)
	}

	public render(): React.ReactNode {
		const { label } = this.props
		return (
			<ToolbarWrapper>
				<Icon type="left" onClick={this.navigate('PREV')} style={iconStyle} />
				<h3 onClick={this.navigate('TODAY')}>{label}</h3>
				<Icon type="right" onClick={this.navigate('NEXT')} style={iconStyle} />
			</ToolbarWrapper>
		)
	}
}
