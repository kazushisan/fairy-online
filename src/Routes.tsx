import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Main } from './components/Main'

export class Routes extends React.Component {
	public render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/main" component={Main} />
				<Route exact path="/event/:id" component={Main} />
			</Switch>
		)
	}
}
