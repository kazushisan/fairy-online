import axios from 'axios'
import { saveAs } from 'file-saver'
import { Event } from '../entities/Event'
import { File } from '../entities/File'

declare const IS_PRODUCTION: boolean
const endPoint = IS_PRODUCTION ? '/~fairyski/api.php' : '/api.php'

export const remove = (
	file: File,
	event_id: Event['id'],
	jwt: string
): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(
				endPoint,
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

export const create = (
	file: File,
	event_id: Event['id'],
	jwt: string
): Promise<Event[]> =>
	new Promise((resolve, reject) => {
		axios
			.post(
				endPoint,
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
			.get(endPoint + `?file=` + file.id, {
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
