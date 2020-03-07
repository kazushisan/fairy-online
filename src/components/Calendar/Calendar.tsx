import { observer } from 'mobx-react'
import * as moment from 'moment'
import * as React from 'react'
import {
	Calendar as BigCalendar,
	momentLocalizer,
	Components,
} from 'react-big-calendar'
import styled from 'styled-components'
import { Event } from '../../entities/Event'
import { EventWrapper } from './EventWrapper'
import { Toolbar } from './Toolbar'

const localizer = momentLocalizer(moment)

interface Props {
	events: Event[]
	onSelectEvent: (event: Event) => void
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

@observer
export class Calendar extends React.Component<Props> {
	public render(): React.ReactNode {
		const { events, onSelectEvent } = this.props
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
}
