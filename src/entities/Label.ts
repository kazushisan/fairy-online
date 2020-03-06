export class Label {
	public 'affliation': string

	public 'name': string

	public 'year': string

	public 'year_list': string[]

	public 'affiliation': string

	public 'sex': string

	public 'age': string

	public 'can_drive': string

	public 'note': string

	constructor() {
		this.affiliation = '所属'
		this.name = '氏名'
		this.year = '年次'
		this.year_list = ['B1', 'B2', 'B3', 'B4', 'M1', 'M2', 'その他']
		this.affiliation = '所属'
		this.sex = '性別'
		this.age = '年齢'
		this.can_drive = '車出し'
		this.note = '備考'
	}
}
