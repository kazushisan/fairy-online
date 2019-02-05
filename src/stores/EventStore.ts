import axios from 'axios'
import { action, observable } from 'mobx'
// import * as moment from 'moment'
import { Buttons } from '../entities/Buttons'
import { Event } from '../entities/Event'
import { File } from '../entities/File'
import { Label } from '../entities/Label'
import { Participant } from '../entities/Participant'

export class EventStore {
	@observable public file: File = new File()
	@observable public buttons: Buttons = new Buttons()
	@observable public label: Label = new Label()
	@observable public add_participant: Participant = new Participant()
	@observable public event: Event = new Event()
	@observable public events: Event[] = []
	@observable public edit_event: Event = new Event()
	@observable public is_admin: boolean = false

	@action public async load() {
		// const jwt: string | null = window.sessionStorage.getItem('fairy_jwt')
		// if (jwt === null) {
		// 	history.push('/')
		// }

		// const token_data = jwt!
		// 	.split('.')[1]
		// 	.replace(/-/g, '+')
		// 	.replace(/_/g, '/')
		// this.is_admin = JSON.parse(atob(token_data)).user === 'admin'
		await axios
			.get('/api.php', {
				headers: {
					// Authorization: 'Bearer ' + jwt
				}
			})
			.then(response => {
				this.events = response.data
			})
			.catch(err => {
				console.log(err)
				window.sessionStorage.removeItem('fairy_jwt')
			})
	}

	@action public handleFile(e: any): void {
		const file = e.target!.files[0]
		const reader = new FileReader()
		reader.onload = (event: any) => {
			this.file.name = file.name
			this.file.data = event.target!.result!
			this.file.id = this.generateID()
		}
		reader.readAsDataURL(file)
	}
	@action public setEvent(id: string): void {
		const event = this.events.find((item: Event) => item.id === id)
		if (event !== undefined) {
			this.event = event
		}
	}
	@action public unsetEvent(): void {
		if (this.event.id !== '') {
			this.event = new Event()
		}
	}
	@action public removeParticipant(id: Participant['id']): void {
		// const jwt = window.sessionStorage.getItem('fairy_jwt')
		axios
			.post(
				'/api.php',
				{
					event_id: this.event.id,
					participant_id: id,
					type: 'remove_participant'
				}
				// {
				// 	headers: { Authorization: 'Bearer ' + jwt }
				// }
			)
			.then(response => {
				this.events = response.data
				this.setEvent(this.event.id)
			})
			.catch(err => {
				alert(err.response.data.message)
			})
	}
	@action public initAddParticipant(): void {
		this.add_participant = new Participant()
		this.add_participant.id = this.generateID()
	}
	@action public generateID(): string {
		const len = 20
		// 生成する文字列に含める文字セット
		const char = 'abcdefghijklmnopqrstuvwxyz0123456789'
		let result = ''
		for (let i = 0; i < len; i++) {
			result += char[Math.floor(Math.random() * char.length)]
		}
		return result
	}
}
