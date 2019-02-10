import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Event } from '../entities/Event'
import { EventStore } from '../stores/EventStore'
import { Calendar } from './Calendar/Calendar'
import { EventDetails } from './EventDetails/EventDetails'
import { Header } from './Header/Header'
import { handleError } from '../services/handleError'

interface MatchParams {
	id?: string
}
interface Props extends RouteComponentProps<MatchParams> {
	eventStore: EventStore
}

const Container = styled.div`
	display: block;
`

@inject('eventStore')
@(withRouter as any)
@observer
export class Main extends React.Component<Props> {
	public async componentDidMount() {
		const { eventStore, history } = this.props
		const id = this.props.match.params.id

		await eventStore.load().catch(err => handleError({err, history }))
		if (id !== undefined) {
			eventStore.setEvent(this.props.match.params.id!)
		}
	}
	public componentDidUpdate(prevProps: Props) {
		if(this.props.location.pathname !== prevProps.location.pathname) {
			const { eventStore } = this.props
			const id = this.props.match.params.id
	
			if (id !== undefined) {
				eventStore.setEvent(this.props.match.params.id!)
			} else {
				eventStore.unsetEvent()
			}
		}
	}
	public render() {
		const { eventStore, history } = this.props

		const onSelectEvent = (event: Event) => {
			const id = event.original_id ? event.original_id : event.id
			history.push(`/event/${id}`)
		}
		const onClose = () => {
			history.push(`/main`)
		}
		return (
			<Container>
				<Header />
				<Calendar
					events={[...eventStore.events, ...eventStore.deadlines]}
					onSelectEvent={onSelectEvent}
				/>
				<EventDetails
					eventStore={eventStore}
					visible={eventStore.event.id !== ''}
					onClose={onClose}
					history={history}
				/>
			</Container>
		)
	}
}
