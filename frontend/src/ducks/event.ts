import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

import * as EventApi from '../services/EventApi'
import * as ParticipantApi from '../services/ParticipantApi'
import { Event, NewEvent } from '../types/Event'
import { Participant, NewParticipant } from '../types/Participant'
import { AppState } from '../store'

const actionCreator = actionCreatorFactory()

export type EventState = {
	selectedEventId: Event['id'] | null
	events: Event[]
}

const initialState: EventState = {
	selectedEventId: null,
	events: [],
}

// actions
export const updateEvents = actionCreator<Event[]>('UPDATE_EVENTS')

export const selectEvent = actionCreator<Event['id']>('SELECT_EVENT')

export const unselectEvent = actionCreator<void>('UNSELECT_EVENT')

// thunks
export const loadEvents = (): ThunkAction<any, AppState, undefined, Action> => (
	dispatch,
	getState
): Promise<any> => {
	const { jwt } = getState().user

	if (!jwt) {
		return Promise.resolve()
	}

	return EventApi.getEvents(jwt).then((data: any) => {
		return dispatch(updateEvents(data))
	})
}

export const editEvent = (
	event: Event
): ThunkAction<any, AppState, undefined, Action> => (
	dispatch,
	getState
): any => {
	const { jwt } = getState().user

	if (!jwt) {
		return Promise.resolve()
	}

	return EventApi.edit(event, jwt).then(() => {
		return dispatch(loadEvents())
	})
}

export const removeEvent = (
	id: Event['id']
): ThunkAction<any, AppState, undefined, Action> => (
	dispatch,
	getState
): any => {
	const { jwt } = getState().user

	if (!jwt) {
		return Promise.resolve()
	}

	return EventApi.remove(id, jwt).then(() => {
		return dispatch(loadEvents())
	})
}

export const addEvent = (
	event: NewEvent
): ThunkAction<any, AppState, undefined, Action> => (
	dispatch,
	getState
): any => {
	const { jwt } = getState().user

	if (!jwt) {
		return Promise.resolve()
	}

	return EventApi.add(event, jwt).then(() => {
		return dispatch(loadEvents())
	})
}

export const addParticipant = (
	participant: NewParticipant
): ThunkAction<any, AppState, undefined, Action> => (
	dispatch,
	getState
): any => {
	const state = getState()
	const { selectedEventId } = state.event

	const { jwt } = state.user

	if (!jwt || !selectedEventId) {
		return Promise.resolve()
	}

	return ParticipantApi.add(participant, selectedEventId, jwt).then(() => {
		return dispatch(loadEvents())
	})
}

export const removeParticipant = (
	id: Participant['id']
): ThunkAction<any, AppState, undefined, Action> => (
	dispatch,
	getState
): any => {
	const state = getState()
	const { selectedEventId } = state.event

	const { jwt } = state.user

	if (!jwt || !selectedEventId) {
		return Promise.resolve()
	}

	return ParticipantApi.remove(id, jwt).then(() => {
		return dispatch(loadEvents())
	})
}

// reducer
const reducer = reducerWithInitialState(initialState)
	.case(updateEvents, (state, events) => ({
		...state,
		events,
	}))
	.case(selectEvent, (state, selectedEventId) => ({
		...state,
		selectedEventId,
	}))
	.case(unselectEvent, state => ({
		...state,
		selectedEventId: null,
	}))

export default reducer
