import { yearOptions } from '../consts/options'

export type NewParticipant = {
	name: string
	affiliation: string
	year: typeof yearOptions[number]
	sex: 'M' | 'F'
	age: number
	canDrive: boolean
	note: string
}
export type Participant = NewParticipant & {
	id: number
}
