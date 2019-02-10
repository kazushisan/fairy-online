import { message } from 'antd'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Event } from '../entities/Event'
import { handleError } from '../services/handleError'
import { EventStore } from '../stores/EventStore'
import { UserStore } from '../stores/UserStore'
import { Calendar } from './Calendar/Calendar'
import { EventDetails } from './EventDetails/EventDetails'
import { Header } from './Header/Header'

interface MatchParams {
	id?: string
}
interface Props extends RouteComponentProps<MatchParams> {
	eventStore: EventStore
	userStore: UserStore
}

const Container = styled.div`
	display: block;
`

@inject('eventStore', 'userStore')
@(withRouter as any)
@observer
export class Main extends React.Component<Props> {
	public async componentDidMount() {
		const { eventStore, history } = this.props
		const id = this.props.match.params.id

		await eventStore.load().catch(err => handleError({ err, history }))
		if (id !== undefined) {
			try {
				eventStore.setEvent(this.props.match.params.id!)
			} catch (err) {
				message.error(err)
				history.push('/main')
			}
		}
	}
	public componentDidUpdate(prevProps: Props) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			const { eventStore, history } = this.props
			const id = this.props.match.params.id

			if (id !== undefined) {
				try {
					eventStore.setEvent(this.props.match.params.id!)
				} catch (err) {
					message.error(err)
					history.push('/main')
				}
			} else {
				eventStore.unsetEvent()
			}
		}
	}
	public render() {
		const { eventStore, history, userStore } = this.props

		const onSelectEvent = (event: Event) => {
			const id = event.original_id ? event.original_id : event.id
			history.push(`/event/${id}`)
		}
		const onClose = () => {
			history.push(`/main`)
		}
		return (
			<Container>
				<Header
					history={history}
					eventStore={eventStore}
					userStore={userStore}
				/>
				<Calendar
					events={[...eventStore.events, ...eventStore.deadlines]}
					onSelectEvent={onSelectEvent}
				/>
				<EventDetails
					eventStore={eventStore}
					userStore={userStore}
					visible={eventStore.event.id !== ''}
					onClose={onClose}
					history={history}
				/>
			</Container>
		)
	}
}
