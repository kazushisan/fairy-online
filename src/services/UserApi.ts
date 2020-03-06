import axios from 'axios'
import { UserCredentails } from '../entities/UserCredentials'

const endPoint = '/~fairyski/auth.php'

export const login = (credentials: UserCredentails): Promise<string> =>
	new Promise((resolve, reject) => {
		axios
			.post(endPoint, credentials)
			.then(response => {
				const { jwt } = response.data
				resolve(jwt)
			})
			.catch(err => {
				reject(err.response)
			})
	})
