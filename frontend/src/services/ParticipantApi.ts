import axios from 'axios'
import { Event } from '../types/Event'
import { Participant } from '../types/Participant'

const apiBase = '/~fairyski/api'

export const remove = (id: Participant['id'], jwt: string): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.delete(`${apiBase}/participant/${id}`, {
				headers: { Authorization: `Bearer ${jwt}` },
			})
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err.response)
			})
	})

export const add = (
	participant: Participant,
	eventId: Event['id'],
	jwt: string
): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(`${apiBase}/event/${eventId}/participant/`, participant, {
				headers: { Authorization: `Bearer ${jwt}` },
			})
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err.response)
			})
	})
