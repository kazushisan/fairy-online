import axios from 'axios'
import { Event } from '../types/Event'
import { Participant } from '../types/Participant'

const endPoint = '/~fairyski/api.php'

export const remove = (
	id: Participant['id'],
	eventId: Event['id'],
	jwt: string
): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(
				endPoint,
				{
					eventId,
					participantId: id,
					type: 'remove_participant',
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

export const add = (
	participant: Participant,
	eventId: Event['id'],
	jwt: string
): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(
				endPoint,
				{
					data: participant,
					eventId,
					type: 'add_participant',
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
