import { action, observable } from 'mobx'
import { UserCredentails } from '../entities/UserCredentials'
import * as UserApi from '../services/UserApi'

export class UserStore {
	@observable public user: string
	@observable public jwt: string

	constructor() {
		this.user = ''
		this.jwt = ''
	}
	@action public async login(userCredentials: UserCredentails) {
		await UserApi.login(userCredentials).then(jwt => {
			this.jwt = jwt
			const token_data = this.jwt
				.split('.')[1]
				.replace(/-/g, '+')
				.replace(/_/g, '/')
			this.user = JSON.parse(atob(token_data)).user
		}).catch(err => {
			throw err
		})
	}
}

export const userStore = new UserStore()
