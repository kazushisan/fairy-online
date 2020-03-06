import { Provider } from 'mobx-react'
import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.scss'
import { Routes } from './Routes'
import { eventStore } from './stores/EventStore'
import { userStore } from './stores/UserStore'

const stores = { eventStore, userStore }

export class App extends React.Component {
	public render() {
		return (
			<div>
    <Provider {...stores}>
					<Router>
						<Routes />
      </Router>
  </Provider>
  </div>
		)
	}
}
