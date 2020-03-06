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
	public async componentDidMount(): Promise<void> {
		const { eventStore, history } = this.props
		// eslint-disable-next-line react/destructuring-assignment
		const { id } = this.props.match.params

		await eventStore
			.load()
			.then(() => {
				if (id) {
					try {
						eventStore.setEvent(id)
					} catch (err) {
						message.error(err)
						history.push('/~fairyski/main')
					}
				}
			})
			.catch(err => handleError({ err, history }))
	}

	public componentDidUpdate(prevProps: Props): void {
		// eslint-disable-next-line react/destructuring-assignment
		if (this.props.location.pathname !== prevProps.location.pathname) {
			const { eventStore, history } = this.props
			// eslint-disable-next-line react/destructuring-assignment
			const { id } = this.props.match.params

			if (id) {
				try {
					eventStore.setEvent(id)
				} catch (err) {
					message.error(err)
					history.push('/~fairyski/main')
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
			history.push(`/~fairyski/event/${id}`)
		}
		const onClose = () => {
			history.push(`/~fairyski/main`)
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
