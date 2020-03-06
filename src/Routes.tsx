import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Main } from './components/Main'

export class Routes extends React.Component {
	public render() {
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
}
