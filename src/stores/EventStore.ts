import { action, computed, observable } from 'mobx'
import { Buttons } from '../entities/Buttons'
import { Event } from '../entities/Event'
import { File } from '../entities/File'
import { Label } from '../entities/Label'
import { Participant } from '../entities/Participant'
import * as EventApi from '../services/EventApi'
import * as FileApi from '../services/FileApi'
import * as ParticipantApi from '../services/ParticipantApi'

export class EventStore {
	@observable public file: File = new File()
	@observable public buttons: Buttons = new Buttons()
	@observable public label: Label = new Label()
	@observable public add_participant: Participant = new Participant()
	@observable public event: Event = new Event()
	@observable public events: Event[] = []
	@observable public edit_event: Event = new Event()
	@observable public is_admin: boolean = false

	@computed public get deadlines() {
		const deadlines: Event[] = []
		if (this.events.length > 0) {
			for (const event of this.events) {
				if (event.due) {
					const deadline = new Event()
					deadline.title = event.title + '参加申請期限'
					deadline.start = event.due
					deadline.end = event.due
					deadline.original_id = event.id
					deadlines.push(deadline)
				}
			}
		}
		return deadlines
	}
	@action public async load() {
		EventApi.getEvents()
			.then(data => {
				this.events = data
				this.setEvent(this.event.id)
			})
			.catch(err => {
				console.log(err)
			})
	}

	@action public async uploadFile(file: File) {
		FileApi.create(file, this.event.id)
			.then(data => {
				this.events = data
				this.setEvent(this.event.id)
			})
			.catch(err => {
				console.log(err)
			})
	}
	@action public removeFile(file: File) {
		FileApi.remove(file, this.event.id)
			.then(data => {
				this.events = data
				this.setEvent(this.event.id)
			})
			.catch(err => {
				console.log(err)
			})
	}
	@action public setEvent(id: string): void {
		const event = this.events.find((item: Event) => item.id === id)
		if (event !== undefined) {
			this.event = event
		} else {
			this.event = new Event()
		}
	}
	@action public unsetEvent(): void {
		if (this.event.id !== '') {
			this.event = new Event()
		}
	}
	@action public async removeParticipant(id: Participant['id']) {
		// const jwt = window.sessionStorage.getItem('fairy_jwt')
		ParticipantApi.remove(id, this.event.id)
			.then(data => {
				this.events = data
				this.setEvent(this.event.id)
			})
			.catch(err => {
				window.alert(err)
			})
	}
	@action public initAddParticipant(): void {
		this.add_participant = new Participant()
		this.add_participant.id = this.generateID()
	}
	@action public async addPariticpant() {
		// const jwt = window.sessionStorage.getItem('fairy_jwt')
		this.add_participant.id = this.generateID()
		await ParticipantApi.add(this.add_participant, this.event.id)
			.then(data => {
				this.events = data
				this.setEvent(this.event.id)
				this.add_participant = new Participant()
			})
			.catch(err => {
				window.alert(err)
			})
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

export const eventStore = new EventStore()
