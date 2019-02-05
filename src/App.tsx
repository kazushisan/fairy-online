import { Provider } from 'mobx-react'
import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.scss'
import { Routes } from './Routes'
import { EventStore } from './stores/EventStore'

export class App extends React.Component {
	public render() {
		return (
			<div>
				<Provider eventStore={new EventStore()}>
					<Router>
						<Routes />
					</Router>
				</Provider>
			</div>
		)
	}
}
