import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.scss'
import { Routes } from './Routes'
import store from './store'

export const App = (): React.ReactElement<{}> => {
	return (
		<>
			<Provider store={store}>
				<Router>
					<Routes />
				</Router>
			</Provider>
		</>
	)
}
