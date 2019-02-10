import * as React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.header`
	padding: 16px 8px 15px;
	border-bottom: 1px #f5f5f5 solid;
	h1 {
		font-size: 16px;
		line-height: 24px;
		margin: 0;
		font-weight: bold;
		text-align: center;
	}
`

export class Header extends React.Component<{}> {
	public render() {
		return (
			<HeaderContainer>
				<h1>FOM: Fairy Online Manager</h1>
			</HeaderContainer>
		)
	}
}
