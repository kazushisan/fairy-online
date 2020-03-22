import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import * as userActionCreator from '../ducks/user'

import { Header } from '../components/Header'
import { LoginForm } from '../components/LoginForm'

import { Credential } from '../types/Credential'

type Props = {
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

function LoginEntry({ login }: Props): React.ReactElement<{}> {
	return (
		<div id="login">
			<Header title="FOM: Fairy Online Manager" />
			<div className="login">
				<LoginFormWrapper>
					<Heading>
						FOM: Fairy Online Manager
						<br />
						にログイン
					</Heading>
					<LoginForm login={login} />
				</LoginFormWrapper>
			</div>
		</div>
	)
}

export const Login = connect(null, {
	login: userActionCreator.login,
})(LoginEntry)
