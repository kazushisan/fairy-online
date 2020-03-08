import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import event from './event'
import user from './user'

const rootReducer = combineReducers({
	event,
	user,
})

export default createStore(rootReducer, applyMiddleware(thunk))
