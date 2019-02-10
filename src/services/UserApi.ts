import axios from 'axios'
import { UserCredentails } from '../entities/UserCredentials'


export const login = (credentials: UserCredentails): Promise<string> =>
	new Promise((resolve, reject) => {
		axios
		.post("auth.php", credentials)
		.then(response => {
			const jwt = response.data.jwt
			resolve(jwt)
		})
		.catch(err => {
			reject(err.response)
		})
	})
