import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import {
	Calendar as BigCalendar,
	momentLocalizer,
	Components,
} from 'react-big-calendar'

import { Event } from '../../types/Event'
import { EventWrapper } from './EventWrapper'
import { Toolbar } from './Toolbar'
import { AppState } from '../../store'
import { generateDeadlines } from '../../services/generateDeadlines'

const localizer = momentLocalizer(moment)

interface Props {
	events: Event[]
}
const components: Components<Event> = {
	eventWrapper: EventWrapper,
	toolbar: Toolbar,
}

const CalendarWrapper = styled.div`
	height: calc(100vh - 55px);
	min-height: 500px;
	background-color: #fafafa;
	// border-bottom: 1px #f5f5f5 solid;
	box-sizing: border-box;
`

export function CalendarComponent({ events }: Props): React.ReactElement<{}> {
	const history = useHistory()

	const onSelectEvent = (event: Event) => {
		const id = event.originalId ? event.originalId : event.id
		history.push(`/~fairyski/event/${id}`)
	}

	return (
		<CalendarWrapper>
			<BigCalendar
				components={components}
				localizer={localizer}
				views={['month']}
				step={60}
				showMultiDayTimes
				events={events}
				onSelectEvent={onSelectEvent}
			/>
		</CalendarWrapper>
	)
}

const mapStateToProps = (state: AppState) => {
	const events = [
		...state.event.events,
		...generateDeadlines(state.event.events),
	]

	return {
		events,
	}
}

export const Calendar = connect(mapStateToProps)(CalendarComponent)
