import { Participant } from './Participant'

export class Event {
	public 'id': string
	public 'title': string
	public 'start': string
	public 'end': string
	public 'description': string
	public 'can_apply': boolean
	public 'due': string
	public 'participants': Participant[]
	public 'files': File[]
	public 'original_id': string
	constructor() {
		this.id = ''
		this.title = ''
		this.start = ''
		this.end = ''
		this.description = ''
		this.can_apply = false
		this.due = ''
		this.participants = []
		this.files = []
		this.original_id = ''
	}
}
