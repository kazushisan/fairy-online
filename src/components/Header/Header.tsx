import { Button, Dropdown, Icon, Menu, message } from 'antd'
import { History } from 'history'
import * as React from 'react'
import styled from 'styled-components'
import { CreateEvent } from '../../components/CreateEvent/CreateEvent'
import { EventStore } from '../../stores/EventStore'
import { UserStore } from '../../stores/UserStore'

const HeaderContainer = styled.header`
	padding: 11px 8px 11px;
	border-bottom: 1px #e8e8e8 solid;
	display: flex;
	justify-content: space-between;
	h1 {
		font-size: 16px;
		line-height: 24px;
		margin: 0;
		font-weight: bold;
		text-align: center;
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
	userStore: UserStore
	eventStore: EventStore
	history: History
}

export class Header extends React.Component<Props> {
	public render() {
		const { userStore, eventStore, history } = this.props
		const handleLogout = () => {
			userStore.logout()
			history.push('/login')
			message.success('ログアウトしました')
		}
		const menu = (
			<Menu>
				{userStore.user === 'admin' && (
					<Menu.Item key="create">
						<CreateEvent
							eventStore={eventStore}
							history={history}
						/>
					</Menu.Item>
				)}
				{userStore.user && (
					<Menu.Item>
						<a href="javasript:;" onClick={handleLogout}>
							ログアウト
						</a>
					</Menu.Item>
				)}
			</Menu>
		)
		return (
			<HeaderContainer>
				<MenuWrap>
					<Button onClick={() => history.goBack()}>
						<Icon type="left" />
					</Button>
				</MenuWrap>
				<h1>FOM: Fairy Online Manager</h1>
				{userStore.user && (
					<MenuWrap>
						<Dropdown overlay={menu} trigger={['click']}>
							<Button>
								<Icon type="bars" />
							</Button>
						</Dropdown>
					</MenuWrap>
				)}
			</HeaderContainer>
		)
	}
}
