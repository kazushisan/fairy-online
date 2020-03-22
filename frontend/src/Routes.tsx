import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from './entries/Home'
import { Login } from './entries/Login'
import { Main } from './entries/Main'

export function Routes(): React.ReactElement<any> {
	return (
		<Switch>
			<Route exact path="/~fairyski" component={Home} />
			<Route exact path="/~fairyski/login" component={Login} />
			<Route exact path="/~fairyski/main" component={Main} />
			<Route exact path="/~fairyski/event" component={Main} />
			<Route exact path="/~fairyski/event/:id" component={Main} />
		</Switch>
	)
}
