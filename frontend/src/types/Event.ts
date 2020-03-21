import { Participant } from './Participant'

export type NewEvent = {
	title: string
	start: string
	end: string
	description?: string
	canApply?: boolean
	due?: string
}

export type Event = NewEvent & {
	id: number
	participants?: Participant[]
	originalId?: Event['id']
}
