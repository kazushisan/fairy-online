import React, { useEffect } from 'react'
import { message } from 'antd'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import * as eventActionCreator from '../ducks/event'
import * as userActionCreator from '../ducks/user'
import { handleError } from '../services/handleError'
import { Calendar } from '../components/Calendar'
import { EventDetails } from '../components/EventDetails'
import { Header } from '../components/Header'

import { Event } from '../types/Event'

type Props = {
	loadEvents: () => Promise<void>
	selectEvent: (eventId: Event['id']) => any
	unselectEvent: (param: void) => any
	setUserFromJwt: () => Promise<any>
}

const Container = styled.div`
	display: block;
`

function MainEntry({
	loadEvents,
	selectEvent,
	unselectEvent,
	setUserFromJwt,
}: Props) {
	const history = useHistory()
	const location = useLocation()
	const { id } = useParams()

	useEffect(() => {
		setUserFromJwt()
			.then(() => loadEvents())
			.then(() => {
				if (id) {
					try {
						selectEvent(parseInt(id, 10))
					} catch (err) {
						message.error(err)
						history.push('/~fairyski/main')
					}
				}
			})
			.catch(err => handleError({ err, history }))
	}, [])

	useEffect(() => {
		if (id) {
			try {
				selectEvent(parseInt(id, 10))
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
			<Header title="FOM: Fairy Online Manager" />
			<Calendar />
			<EventDetails />
		</Container>
	)
}

export const Main = connect(null, {
	loadEvents: eventActionCreator.loadEvents,
	selectEvent: eventActionCreator.selectEvent,
	unselectEvent: eventActionCreator.unselectEvent,
	setUserFromJwt: userActionCreator.setUserFromJwt,
})(MainEntry)
