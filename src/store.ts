import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import event from './ducks/event'
import user from './ducks/user'

const rootReducer = combineReducers({
	event,
	user,
})

export type AppState = ReturnType<typeof rootReducer>

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
)
