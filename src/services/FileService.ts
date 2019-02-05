import axios from 'axios'
import { saveAs } from 'file-saver'

export class FileService {
	public download(file: any): void {
		const jwt: string | null = window.sessionStorage.getItem('fairy_jwt')
		axios
			.get(`api.php?file=` + file.id, {
				headers: { Authorization: 'Bearer ' + jwt },
				responseType: 'blob'
			})
			.then(response => {
				saveAs(response.data, file.name)
			})
			.catch(err => {
				alert('failed to retrive data')
			})
	}
}
