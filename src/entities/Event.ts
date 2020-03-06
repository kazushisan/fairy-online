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

	constructor(event?: Event) {
		if (event) {
			this.id = event.id
			this.title = event.title
			this.start = event.start
			this.end = event.end
			this.description = event.description
			this.can_apply = event.can_apply
			this.due = event.due
			this.participants = event.participants
			this.files = event.files
			this.original_id = event.original_id
		} else {
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
}
