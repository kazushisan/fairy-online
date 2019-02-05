import { action, computed, observable } from 'mobx'

interface UserCredentails {
	user_name: string
	password: string
}

export class UserStore {
	@observable public user_name: string = ''
	@observable public jwt: string = ''

	@computed public get is_admin(): boolean {
		if (this.jwt !== '') {
			const token_data = this.jwt
				.split('.')[1]
				.replace(/-/g, '+')
				.replace(/_/g, '/')
			return JSON.parse(atob(token_data)).user === 'admin'
		} else {
			return false
		}
	}
	@action public login(userCredentials: UserCredentails) {
		console.log(userCredentials)
	}
}

export const userStore = new UserStore()
