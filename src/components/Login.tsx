import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import * as userActionCreator from '../ducks/user'

import { Header } from './Header'
import { LoginForm } from './LoginForm'

import { Credential } from '../types/Credential'

type Props = RouteComponentProps & {
	login: (credential: Credential) => Promise<any>
}

const LoginFormWrapper = styled.div`
	overflow: hidden;
	margin: 64px auto;
	max-width: 332px;
`
const Heading = styled.h2`
	margin: 16px;
`

function LoginEntry({ history, login }: Props): React.ReactElement<{}> {
	return (
		<div id="login">
			<Header history={history} />
			<div className="login">
				<LoginFormWrapper>
					<Heading>
						FOM: Fairy Online Manager
						<br />
						にログイン
					</Heading>
					<LoginForm login={login} history={history} />
				</LoginFormWrapper>
			</div>
		</div>
	)
}

export const Login = withRouter(
	connect(null, {
		login: userActionCreator.login,
	})(LoginEntry)
)
