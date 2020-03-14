import React, { useEffect } from 'react'
import { message } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import * as actionCreator from '../ducks/event'
import { handleError } from '../services/handleError'
import { Calendar } from '../components/Calendar'
import { EventDetails } from '../components/EventDetails'
import { Header } from '../components/Header'

import { Event } from '../types/Event'

interface MatchParams {
	id?: string
}

type Props = RouteComponentProps<MatchParams> & {
	loadEvents: () => Promise<void>
	selectEvent: (eventId: Event['id']) => any
	unselectEvent: (param: void) => any
}

const Container = styled.div`
	display: block;
`

function MainEntry({
	history,
	match,
	loadEvents,
	selectEvent,
	location,
	unselectEvent,
}: Props) {
	useEffect(() => {
		const { id } = match.params

		loadEvents()
			.then(() => {
				if (id) {
					try {
						selectEvent(id)
					} catch (err) {
						message.error(err)
						history.push('/~fairyski/main')
					}
				}
			})
			.catch(err => handleError({ err, history }))
	}, [])

	useEffect(() => {
		const { id } = match.params

		if (id) {
			try {
				selectEvent(id)
			} catch (err) {
				message.error(err)
				history.push('/~fairyski/main')
			}
		} else {
			unselectEvent()
		}
	}, [location.pathname])

	return (
		<Container>
			<Header history={history} />
			<Calendar history={history} />
			<EventDetails history={history} />
		</Container>
	)
}

export const Main = withRouter(
	connect(null, {
		loadEvents: actionCreator.loadEvents,
		selectEvent: actionCreator.selectEvent,
		unselectEvent: actionCreator.unselectEvent,
	})(MainEntry)
)
