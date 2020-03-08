import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

import * as EventApi from '../services/EventApi'
import * as ParticipantApi from '../services/ParticipantApi'
import { Event } from '../types/Event'
import { Participant } from '../types/Participant'

const actionCreator = actionCreatorFactory()

export type State = {
	selectedEvent: Event | null
	events: Event[]
}

const initialState: State = {
	selectedEvent: null,
	events: [],
}

// actions
export const setEvents = actionCreator<Event[]>('SET_EVENTS')

export const setSelectedEvent = actionCreator<Event['id']>('SET_SELECTED_EVENT')

export const unsetSelectedEvent = actionCreator<void>('UNSET_SELECTED_EVENT')

// thunks
export const updateEventState = (
	events: Event[],
	unset = false
): ThunkAction<any, State, undefined, Action> => (dispatch, getState): any => {
	dispatch(setEvents(events))
	if (unset) {
		return dispatch(unsetSelectedEvent())
	}

	const { selectedEvent } = getState()

	if (!selectedEvent) {
		return Promise.resolve()
	}

	return dispatch(setSelectedEvent(selectedEvent.id))
}

export const loadEvents = (
	jwt: string
): ThunkAction<any, State, undefined, Action> => (dispatch): any =>
	EventApi.getEvents(jwt).then((data: any) => {
		return dispatch(setEvents(data))
	})

export const updateSelectedEvent = (
	event: Event,
	jwt: string
): ThunkAction<any, State, undefined, Action> => (dispatch): any =>
	EventApi.edit(event, jwt).then((data: any) => {
		return dispatch(updateEventState(data))
	})

export const removeEvent = (
	id: Event['id'],
	jwt: string
): ThunkAction<any, State, undefined, Action> => (dispatch): any =>
	EventApi.remove(id, jwt).then((data: any) => {
		return dispatch(updateEventState(data))
	})

export const addEvent = (
	event: Event,
	jwt: string
): ThunkAction<any, State, undefined, Action> => (dispatch): any =>
	EventApi.add(event, jwt).then((data: any) => {
		return dispatch(updateEventState(data))
	})

export const addParticipant = (
	id: Participant,
	jwt: string
): ThunkAction<any, State, undefined, Action> => (dispatch, getState): any => {
	const { selectedEvent } = getState()

	if (!selectedEvent) {
		return Promise.resolve()
	}
	return ParticipantApi.add(id, selectedEvent.id, jwt).then((data: any) => {
		return dispatch(updateEventState(data))
	})
}

export const removeParticipant = (
	id: Participant['id'],
	jwt: string
): ThunkAction<any, State, undefined, Action> => (dispatch, getState): any => {
	const { selectedEvent } = getState()

	if (!selectedEvent) {
		return Promise.resolve()
	}

	return ParticipantApi.remove(id, selectedEvent.id, jwt).then((data: any) => {
		return dispatch(updateEventState(data))
	})
}

// reducer
const reducer = reducerWithInitialState(initialState)
	.case(setEvents, (state, events) => ({
		...state,
		events,
	}))
	.case(setSelectedEvent, (state, id) => ({
		...state,
		selectedEvent: state.events.find(event => event.id === id) || null,
	}))
	.case(unsetSelectedEvent, state => ({
		...state,
		selectedEvent: null,
	}))

export default reducer
