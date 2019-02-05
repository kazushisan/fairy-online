import axios from 'axios'
import { saveAs } from 'file-saver'
import { Event } from '../entities/Event'
import { File } from '../entities/File'
import { userStore } from '../stores/UserStore'

export const remove = (file: File, event_id: Event['id']): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(
				'/api.php',
				{
					type: 'remove_file',
					file_id: file.id,
					event_id
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

export const create = (file: File, event_id: Event['id']): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(
				'/api.php',
				{
					type: 'add_file',
					file,
					event_id
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

export const download = (file: File): void => {
	axios
		.get(`api.php?file=` + file.id, {
			headers: { Authorization: 'Bearer ' + userStore.jwt },
			responseType: 'blob'
		})
		.then(response => {
			saveAs(response.data, file.name)
		})
		.catch(err => {
			alert('failed to retrive data')
		})
}
