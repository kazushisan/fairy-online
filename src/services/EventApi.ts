import axios from 'axios'
import { Event } from '../entities/Event'
import { userStore } from '../stores/UserStore'

export const getEvents = (): Promise<Event[]> =>
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
