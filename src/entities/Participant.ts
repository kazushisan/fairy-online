export class Participant {
	public 'id': string
	public 'name': string
	public 'affiliation': string
	public 'year': string
	public 'sex': 'M' | 'F'
	public 'age': number
	public 'can_drive': boolean
	public 'note': string
	constructor() {
		this.id = ''
		this.name = ''
		this.affiliation = ''
		this.year = ''
		this.sex = 'M'
		this.age = 0
		this.can_drive = false
		this.note = ''
	}
}
