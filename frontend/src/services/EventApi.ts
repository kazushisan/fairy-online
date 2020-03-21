import axios from 'axios'
import { Event, NewEvent } from '../types/Event'
import { generateHeader } from './generateHeader'

const apiBase = '/~fairyski/api'

export const getEvents = (jwt: string): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.get(`${apiBase}/event`, generateHeader(jwt))
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err.response)
			})
	})

export const edit = (event: Event, jwt: string): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.put(`${apiBase}/event/${event.id}`, event, generateHeader(jwt))
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err.response)
			})
	})

export const remove = (eventId: Event['id'], jwt: string): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.delete(`${apiBase}/event/${eventId}`, generateHeader(jwt))
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err.response)
			})
	})

export const add = (event: NewEvent, jwt: string): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(`${apiBase}/event`, event, generateHeader(jwt))
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err.response)
			})
	})
