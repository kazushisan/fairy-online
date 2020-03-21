import axios from 'axios'
import { Event } from '../types/Event'
import { Participant, NewParticipant } from '../types/Participant'
import { generateHeader } from './generateHeader'

const apiBase = '/~fairyski/api'

export const remove = (id: Participant['id'], jwt: string): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.delete(`${apiBase}/participant/${id}`, generateHeader(jwt))
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err.response)
			})
	})

export const add = (
	participant: NewParticipant,
	eventId: Event['id'],
	jwt: string
): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(
				`${apiBase}/event/${eventId}/participant/`,
				participant,
				generateHeader(jwt)
			)
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err.response)
			})
	})
