import { Provider } from 'mobx-react'
import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.scss'
import { Routes } from './Routes'
import { eventStore } from './stores/EventStore'
import { userStore } from './stores/UserStore'

export const App = (): React.ReactElement<any> => {
	return (
		<div>
			<Provider eventStore={eventStore} userStore={userStore}>
				<Router>
					<Routes />
				</Router>
			</Provider>
		</div>
	)
}
