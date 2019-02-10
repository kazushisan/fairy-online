import axios from 'axios'
import { Event } from '../entities/Event'
import { userStore } from '../stores/UserStore'

export const getEvents = (jwt: string): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.get('/api.php', {
				headers: {
					Authorization: 'Bearer ' + userStore.jwt
				}
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
				'/api.php',
				{
					type: 'edit_event',
					data: event,
					event_id: event.id
				},
				{
					headers: { Authorization: 'Bearer ' + jwt }
				}
			)
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err.response)
			})
	})

export const remove = (event_id: Event['id'], jwt: string): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(
				'/api.php',
				{
					type: 'remove_event',
					event_id
				},
				{
					headers: { Authorization: 'Bearer ' + jwt }
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
				'/api.php',
				{
					type: 'add_event',
					data: event
				},
				{
					headers: { Authorization: 'Bearer ' + jwt }
				}
			)
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err.response)
			})
	})
