/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Event } from '../types/Event'
import { generateId } from './generateId'

export const generateDeadlines = (events: Event[]): Event[] => {
	return events
		.filter(event => !!event.due)
		.map(event => ({
			id: generateId(),
			title: `${event.title}参加申請期限`,
			start: event.due!,
			end: event.due!,
			originalId: event.id,
		}))
}
