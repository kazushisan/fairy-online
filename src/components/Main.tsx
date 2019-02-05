import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Event } from '../entities/Event'
import { EventStore } from '../stores/EventStore'
import { Calendar } from './Calendar/Calendar'
import { EventDetails } from './EventDetails/EventDetails'

interface MatchParams {
	id?: string
}
interface Props extends RouteComponentProps<MatchParams> {
	eventStore: EventStore
}

const Container = styled.div`
	display: block;
`
const Header = styled.header`
	padding: 16px 8px 15px;
	border-bottom: 1px #f5f5f5 solid;
	h1 {
		font-size: 16px;
		line-height: 24px;
		margin: 0;
		font-weight: bold;
		text-align: center;
	}
`
@inject('eventStore')
@(withRouter as any)
@observer
export class Main extends React.Component<Props> {
	public async componentDidMount() {
		const { eventStore } = this.props
		const id = this.props.match.params.id

		await eventStore.load()
		if (id !== undefined) {
			eventStore.setEvent(this.props.match.params.id!)
		}
	}
	public componentDidUpdate() {
		const { eventStore } = this.props
		const id = this.props.match.params.id

		if (id !== undefined) {
			eventStore.setEvent(this.props.match.params.id!)
		} else {
			eventStore.unsetEvent()
		}
	}
	public render() {
		const { eventStore, history } = this.props

		const onSelectEvent = (event: Event) => {
			history.push(`/event/${event.id}`)
		}
		const onClose = () => {
			history.push(`/main`)
		}
		return (
			<Container>
				<Header>
					<h1>FOM: Fairy Online Manager</h1>
				</Header>
				<Calendar
					events={eventStore.events}
					onSelectEvent={onSelectEvent}
				/>
				<EventDetails
					eventStore={eventStore}
					visible={eventStore.event.id !== ''}
					onClose={onClose}
				/>
			</Container>
		)
	}
}
