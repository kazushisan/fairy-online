import axios from 'axios'
import { Event } from '../types/Event'

const endPoint = '/~fairyski/api.php'

export const getEvents = (jwt: string): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.get(endPoint, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			})
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
			.post(
				endPoint,
				{
					type: 'edit_event',
					data: event,
					event_id: event.id,
				},
				{
					headers: { Authorization: `Bearer ${jwt}` },
				}
			)
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
			.post(
				endPoint,
				{
					type: 'remove_event',
					event_id: eventId,
				},
				{
					headers: { Authorization: `Bearer ${jwt}` },
				}
			)
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err.response)
			})
	})

export const add = (event: Event, jwt: string): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(
				endPoint,
				{
					type: 'add_event',
					data: event,
				},
				{
					headers: { Authorization: `Bearer ${jwt}` },
				}
			)
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err.response)
			})
	})
