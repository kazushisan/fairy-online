import axios from 'axios'
import { Event } from '../entities/Event'
import { Participant } from '../entities/Participant'

declare const IS_PRODUCTION: boolean
const endPoint = IS_PRODUCTION ? '/~fairyski/api.php' : '/api.php'

export const remove = (
	id: Participant['id'],
	event_id: Event['id'],
	jwt: string
): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(
				endPoint,
				{
					event_id,
					participant_id: id,
					type: 'remove_participant'
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

export const add = (
	participant: Participant,
	event_id: Event['id'],
	jwt: string
): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(
				endPoint,
				{
					data: participant,
					event_id,
					type: 'add_participant'
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
