import { Participant } from './Participant'

export type Event = {
	id: string
	title: string
	start: string
	end: string
	description?: string
	canApply?: boolean
	due?: string
	participants?: Participant[]
	originalId?: Event['id']
}
