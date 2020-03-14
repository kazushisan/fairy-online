import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

import * as EventApi from '../services/EventApi'
import * as ParticipantApi from '../services/ParticipantApi'
import { Event } from '../types/Event'
import { Participant } from '../types/Participant'
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
export const loadEvents = (
	jwt: string
): ThunkAction<any, AppState, undefined, Action> => (dispatch): any =>
	EventApi.getEvents(jwt).then((data: any) => {
		return dispatch(updateEvents(data))
	})

export const updateSelectedEvent = (
	event: Event,
	jwt: string
): ThunkAction<any, AppState, undefined, Action> => (dispatch): any =>
	EventApi.edit(event, jwt).then((data: any) => {
		return dispatch(updateEvents(data))
	})

export const removeEvent = (
	id: Event['id'],
	jwt: string
): ThunkAction<any, AppState, undefined, Action> => (dispatch): any =>
	EventApi.remove(id, jwt).then((data: any) => {
		return dispatch(updateEvents(data))
	})

export const addEvent = (
	event: Event,
	jwt: string
): ThunkAction<any, AppState, undefined, Action> => (dispatch): any =>
	EventApi.add(event, jwt).then((data: any) => {
		return dispatch(updateEvents(data))
	})

export const addParticipant = (
	id: Participant,
	jwt: string
): ThunkAction<any, AppState, undefined, Action> => (
	dispatch,
	getState
): any => {
	const { selectedEventId } = getState().event

	if (!selectedEventId) {
		return Promise.resolve()
	}
	return ParticipantApi.add(id, selectedEventId, jwt).then((data: any) => {
		return dispatch(updateEvents(data))
	})
}

export const removeParticipant = (
	id: Participant['id'],
	jwt: string
): ThunkAction<any, AppState, undefined, Action> => (
	dispatch,
	getState
): any => {
	const { selectedEventId } = getState().event

	if (!selectedEventId) {
		return Promise.resolve()
	}

	return ParticipantApi.remove(id, selectedEventId, jwt).then((data: any) => {
		return dispatch(updateEvents(data))
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
