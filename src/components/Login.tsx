import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { UserStore } from '../stores/UserStore'
import { Header } from './Header/Header'
import { LoginForm } from './LoginForm/LoginForm'

interface Props extends RouteComponentProps {
	userStore: UserStore
}

const LoginFormWrapper = styled.div`
	overflow: hidden;
	margin: 64px auto;
	max-width: 332px;
`
@inject('userStore')
@(withRouter as any)
@observer
export class Login extends React.Component<Props> {
	public render() {
		const { userStore, history } = this.props
		return (
			<div id="login">
				<Header />
				<div className="login">
					<LoginFormWrapper>
						<LoginForm userStore={userStore} history={history} />
					</LoginFormWrapper>
				</div>
			</div>
		)
	}
}
