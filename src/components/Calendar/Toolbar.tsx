import React, { useCallback } from 'react'
import { Icon } from 'antd'
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

export const Toolbar = ({
	onNavigate,
	label,
}: ToolbarProps): React.ReactElement<{}> => {
	const onClick = useCallback(
		(action: NavigateAction) => (): void => onNavigate(action),
		[]
	)

	return (
		<ToolbarWrapper>
			<Icon type="left" onClick={onClick('PREV')} style={iconStyle} />
			<h3 onClick={onClick('TODAY')}>{label}</h3>
			<Icon type="right" onClick={onClick('NEXT')} style={iconStyle} />
		</ToolbarWrapper>
	)
}
