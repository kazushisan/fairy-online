import axios from 'axios'
import { saveAs } from 'file-saver'
import { Event } from '../entities/Event'
import { File } from '../entities/File'

export const remove = (file: File, event_id: Event['id'], jwt:string): Promise<Event[]> =>
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

export const create = (file: File, event_id: Event['id'], jwt:string): Promise<Event[]> =>
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

export const download = (file: File, jwt: string): Promise<void> => 
	new Promise((resolve, reject) => {
		axios
		.get(`api.php?file=` + file.id, {
			headers: { Authorization: 'Bearer ' + jwt },
			responseType: 'blob'
		})
		.then(response => {
			saveAs(response.data, file.name)
			resolve()
		})
		.catch(err => {
			reject(err.response)
		})
	})