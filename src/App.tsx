import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.scss'
import { Routes } from './Routes'
import store from './ducks'

export const App = (): React.ReactElement<{}> => {
	return (
		<div>
			<Provider store={store}>
				<Router>
					<Routes />
				</Router>
			</Provider>
		</div>
	)
}
