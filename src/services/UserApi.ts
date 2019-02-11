import axios from 'axios'
import { UserCredentails } from '../entities/UserCredentials'

declare const IS_PRODUCTION: boolean
const endPoint = IS_PRODUCTION ? '/~fairyski/auth.php' : '/auth.php'

export const login = (credentials: UserCredentails): Promise<string> =>
	new Promise((resolve, reject) => {
		axios
			.post(endPoint, credentials)
			.then(response => {
				const jwt = response.data.jwt
				resolve(jwt)
			})
			.catch(err => {
				reject(err.response)
			})
	})
