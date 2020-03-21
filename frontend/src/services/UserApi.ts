import axios from 'axios'
import { Credential } from '../types/Credential'

const endPoint = '/~fairyski/api/login'

export const login = (credential: Credential): Promise<string> =>
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
