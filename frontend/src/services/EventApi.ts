import axios from 'axios'
import { Event } from '../types/Event'

const apiBase = '/~fairyski/api'

export const getEvents = (jwt: string): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.get(`${apiBase}/event`, {
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
			.put(`${apiBase}/event/${event.id}`, event, {
				headers: { Authorization: `Bearer ${jwt}` },
			})
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
			.delete(`${apiBase}/event/${eventId}`, {
				headers: { Authorization: `Bearer ${jwt}` },
			})
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
			.post(`${apiBase}/event`, event, {
				headers: { Authorization: `Bearer ${jwt}` },
			})
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err.response)
			})
	})
