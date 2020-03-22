import React from 'react'
import { Button, Dropdown, Menu, message } from 'antd'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { BarsOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { CreateEvent } from '../CreateEvent'
import * as userActionCreator from '../../ducks/user'
import * as eventActionCreator from '../../ducks/event'

import { AppState } from '../../store'
import { NewEvent } from '../../types/Event'

const HeaderContainer = styled.header`
	padding: 11px 16px 11px;
	border-bottom: 1px #e8e8e8 solid;
	display: flex;
	justify-content: space-between;
	h1 {
		font-size: 16px;
		line-height: 24px;
		margin: 0;
		font-weight: bold;
		text-align: left;
		flex-basis: auto;
		padding: 4px 0;
		flex-grow: 1;
	}
`
const MenuWrap = styled.div`
	flex-basis: auto;
	flex-grow: 0;
	flex-shrink: 0;
`

interface Props {
	logout: () => Promise<any>
	user: string | null
    addEvent: (event: NewEvent) => Promise<any>
    title: string
}

function HeaderComponent({
	logout,
	user,
    addEvent,
    title,
}: Props): React.ReactElement<any> {
	const history = useHistory()

	const handleLogout = () => {
		logout()
		history.push('/~fairyski/login')
		message.success('ログアウトしました')
	}
	const menu = (
		<Menu>
			{user === 'admin' && (
				<Menu.Item key="create">
					<CreateEvent addEvent={addEvent} />
				</Menu.Item>
			)}
			{user && (
				<Menu.Item>
					<a onClick={handleLogout}>ログアウト</a>
				</Menu.Item>
			)}
		</Menu>
	)
	return (
		<HeaderContainer>
			<h1>{title}</h1>
			{user && (
				<MenuWrap>
					<Dropdown overlay={menu} trigger={['click']}>
						<Button>
							<BarsOutlined />
						</Button>
					</Dropdown>
				</MenuWrap>
			)}
		</HeaderContainer>
	)
}

const mapStateToProps = (state: AppState) => ({
	user: state.user.user,
})

export const Header = connect(mapStateToProps, {
	logout: userActionCreator.logout,
	addEvent: eventActionCreator.addEvent,
})(HeaderComponent)
