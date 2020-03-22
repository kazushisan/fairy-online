import React, { useMemo } from 'react'
import { Button, message } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import { CreateEvent } from '../CreateEvent'
import * as userActionCreator from '../../ducks/user'
import * as eventActionCreator from '../../ducks/event'

import { AppState } from '../../store'
import { NewEvent } from '../../types/Event'
import { LoginForm } from '../LoginForm'
import { Credential } from '../../types/Credential'

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

interface Props {
	logout: () => Promise<any>
	login: (credential: Credential) => Promise<any>
	user: string | null
	addEvent: (event: NewEvent) => Promise<any>
	title: string
}

function HeaderComponent({
	logout,
	login,
	user,
	addEvent,
	title,
}: Props): React.ReactElement<any> {
	const history = useHistory()
	const location = useLocation()
	const isPc = useMediaQuery({ query: '(min-width: 800px)' })

	const handleLogout = () => {
		logout()
		history.push('/~fairyski/login')
		message.success('ログアウトしました')
	}

	const showLogin = useMemo(
		() => !user && !location.pathname.includes('login'),
		[user, location]
	)

	return (
		<HeaderContainer>
			<h1>{title}</h1>
			{user === 'admin' && <CreateEvent addEvent={addEvent} />}
			{user && (
				<Button type="default" onClick={handleLogout}>
					ログアウト
				</Button>
			)}
			{showLogin &&
				(isPc ? (
					<LoginForm login={login} isInline />
				) : (
					<Button
						type="default"
						onClick={() => history.push('/~fairyski/login')}
					>
						ログイン
					</Button>
				))}
		</HeaderContainer>
	)
}

const mapStateToProps = (state: AppState) => ({
	user: state.user.user,
})

export const Header = connect(mapStateToProps, {
	logout: userActionCreator.logout,
	login: userActionCreator.login,
	addEvent: eventActionCreator.addEvent,
})(HeaderComponent)
