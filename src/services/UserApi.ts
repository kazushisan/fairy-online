import axios from 'axios'
import { User } from '../types/User'

const endPoint = '/~fairyski/auth.php'

export const login = (credential: User): Promise<string> =>
	new Promise((resolve, reject) => {
		axios
			.post(endPoint, credential)
			.then(response => {
				const { jwt } = response.data
				resolve(jwt)
			})
			.catch(err => {
				reject(err.response)
			})
	})
