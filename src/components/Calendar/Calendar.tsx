import { observer } from 'mobx-react'
import * as moment from 'moment'
import * as React from 'react'
import BigCalendar from 'react-big-calendar'
import styled from 'styled-components'
import { Event } from '../../entities/Event'
import { EventWrapper } from './EventWrapper'
import { Toolbar } from './Toolbar'
const localizer = BigCalendar.momentLocalizer(moment)

interface Props {
	events: Event[]
	onSelectEvent: (event: Event) => void
}
const components = {
	eventWrapper: EventWrapper,
	toolbar: Toolbar
}
const CalendarWrapper = styled.div`
	height: calc(100vh - 56px);
	background-color: #fafafa;
	// border-bottom: 1px #f5f5f5 solid;
	box-sizing: border-box;
`

@observer
export class Calendar extends React.Component<Props> {
	public render() {
		return (
			<CalendarWrapper>
				<BigCalendar
					components={components}
					localizer={localizer}
					views={['month']}
					step={60}
					showMultiDayTimes
					{...this.props}
				/>
			</CalendarWrapper>
		)
	}
}
