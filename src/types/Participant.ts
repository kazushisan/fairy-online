import { yearOptions } from '../consts/options'

export type Participant = {
	id: string
	name: string
	affiliation: string
	year: typeof yearOptions[number]
	sex: 'M' | 'F'
	age: number
	canDrive: boolean
	note: string
}
