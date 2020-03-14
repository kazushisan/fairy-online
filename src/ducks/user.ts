/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

import * as UserApi from '../services/UserApi'
import { Credential } from '../types/Credential'
import { AppState } from '.'

const actionCreator = actionCreatorFactory()

export type UserState = {
	user: string | null
	jwt: string | null
}

const initialState: UserState = {
	user: null,
	jwt: null,
}

// actions
export const setUser = actionCreator<string>('SET_USER')

export const setJwt = actionCreator<string>('SET_JWT')

export const unsetUser = actionCreator<void>('UNSET_USER')

export const unsetJwt = actionCreator<void>('UNSET_JWT')

// thunks
export const setUserFromJwt = (): ThunkAction<
	any,
	AppState,
	undefined,
	Action
> => (dispatch): any => {
	const jwt = window.sessionStorage.getItem('fairy_jwt')

	if (!jwt) {
		return Promise.resolve()
	}

	const jwtTokenData = jwt
		.split('.')[1]
		.replace(/-/g, '+')
		.replace(/_/g, '/')

	const user = JSON.parse(atob(jwtTokenData)).user!

	return dispatch(setUser(user))
}

export const login = (
	credential: Credential
): ThunkAction<any, AppState, undefined, Action> => (dispatch): any =>
	UserApi.login(credential).then(jwt => {
		window.sessionStorage.setItem('fairy_jwt', jwt)
		dispatch(setUserFromJwt())
	})

export const logout = (): ThunkAction<any, AppState, undefined, Action> => (
	dispatch
): any => {
	dispatch(unsetJwt())
	return dispatch(unsetUser())
}

// reducer
const reducer = reducerWithInitialState(initialState)
	.case(setUser, (state, user) => ({
		...state,
		user,
	}))
	.case(setJwt, (state, jwt) => ({
		...state,
		jwt,
	}))
	.case(unsetUser, state => ({
		...state,
		user: null,
	}))
	.case(unsetUser, state => ({
		...state,
		jwt: null,
	}))

export default reducer
