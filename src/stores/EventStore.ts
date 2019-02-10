import { action, computed, observable } from 'mobx'
import { Buttons } from '../entities/Buttons'
import { Event } from '../entities/Event'
import { File } from '../entities/File'
import { Label } from '../entities/Label'
import { Participant } from '../entities/Participant'
import * as EventApi from '../services/EventApi'
import * as FileApi from '../services/FileApi'
import * as ParticipantApi from '../services/ParticipantApi'
import { userStore } from './UserStore'

export class EventStore {
	@observable public file: File
	@observable public buttons: Buttons
	@observable public label: Label
	@observable public add_participant: Participant
	@observable public event: Event
	@observable public events: Event[]
	@observable public edit_event: Event
	@observable public is_admin: boolean

	constructor() {
		this.file = new File()
		this.buttons = new Buttons()
		this.label = new Label()
		this.add_participant = new Participant()
		this.event = new Event()
		this.events = []
		this.edit_event = new Event()
		this.is_admin = false
	}
	@computed public get deadlines() {
		const deadlines: Event[] = []
		if (this.events && this.events.length > 0) {
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
		if(!userStore.jwt) {
			throw { noJwt: true }
		}
		await EventApi.getEvents(userStore.jwt)
			.then(data => {
				this.assignEvents(data)
			})
			.catch(err => {
				throw err
			})
	}

	@action public async editEvent(event: object) {
		const mergedEvent = Object.assign(this.event, event) as Event

		await EventApi.edit(mergedEvent, userStore.jwt).then(data => {
			this.assignEvents(data)
		}).catch(err => {
			throw err
		})
	}
	@action public async removeEvent(event_id: Event['id']) {
		await EventApi.remove(event_id, userStore.jwt).then(data => {
			this.assignEvents(data)
		}).catch(err => {
			throw err
		})
	}

	@action public async uploadFile(file: File) {
		await FileApi.create(file, this.event.id, userStore.jwt)
			.then(data => {
				this.assignEvents(data)

			})
			.catch(err => {
				throw err
			})
	}
	@action public async removeFile(file: File) {
		await FileApi.remove(file, this.event.id, userStore.jwt)
			.then(data => {
				this.assignEvents(data)

			})
			.catch(err => {
				throw err
			})
	}
	@action public async downloadFile(file: File) {
		await FileApi.download(file, userStore.jwt).catch(err => {
			throw err
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
		await ParticipantApi.remove(id, this.event.id, userStore.jwt)
			.then(data => {
				this.assignEvents(data)
			})
			.catch(err => {
				throw err
			})
	}
	@action public initAddParticipant(): void {
		this.add_participant = new Participant()
		this.add_participant.id = this.generateID()
	}
	@action public async addPariticpant() {
		this.add_participant.id = this.generateID()
		await ParticipantApi.add(this.add_participant, this.event.id, userStore.jwt)
			.then(data => {
				this.assignEvents(data)
				this.add_participant = new Participant()
			})
			.catch(err => {
				throw err
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
	private assignEvents(data: Event[]) {
		this.events = []
		const events = []
		for(const item of data){
			events.push(new Event(item))
		}
		this.events = events
		this.setEvent(this.event.id)		
	}
}

export const eventStore = new EventStore()
