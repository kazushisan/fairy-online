import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { EventStore } from '../stores/EventStore'
import { UserStore } from '../stores/UserStore'
import { Header } from './Header/Header'
import { LoginForm } from './LoginForm/LoginForm'

interface Props extends RouteComponentProps {
	userStore: UserStore
	eventStore: EventStore
}

const LoginFormWrapper = styled.div`
	overflow: hidden;
	margin: 64px auto;
	max-width: 332px;
`
const Heading = styled.h2`
	margin: 16px;
`
@inject('userStore', 'eventStore')
@(withRouter as any)
@observer
export class Login extends React.Component<Props> {
	public render() {
		const { userStore, eventStore, history } = this.props
		return (
			<div id="login">
				<Header
					history={history}
					eventStore={eventStore}
					userStore={userStore}
				/>
				<div className="login">
					<LoginFormWrapper>
						<Heading>
							FOM: Fairy Online Manager
							<br />
							にログイン
						</Heading>
						<LoginForm userStore={userStore} history={history} />
					</LoginFormWrapper>
				</div>
			</div>
		)
	}
}
