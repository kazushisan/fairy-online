import axios from 'axios'
import { Event } from '../entities/Event'
import { Participant } from '../entities/Participant'
import { userStore } from '../stores/UserStore'

export const remove = (
	id: Participant['id'],
	event_id: Event['id']
): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(
				'/api.php',
				{
					event_id,
					participant_id: id,
					type: 'remove_participant'
				},
				{
					headers: { Authorization: 'Bearer ' + userStore.jwt }
				}
			)
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err)
			})
	})

export const add = (
	participant: Participant,
	event_id: Event['id']
): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(
				'/api.php',
				{
					data: participant,
					event_id,
					type: 'add_participant'
				},
				{
					headers: { Authorization: 'Bearer ' + userStore.jwt }
				}
			)
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err)
			})
	})
