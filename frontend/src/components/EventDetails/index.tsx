import React from 'react'
import { useHistory } from 'react-router-dom'
import { Divider, Drawer } from 'antd'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { EditEvent } from './EditEvent'
import { EventParticipants } from './EventParticipants'

import { Event } from '../../types/Event'
import { Participant, NewParticipant } from '../../types/Participant'
import { AppState } from '../../store'
import * as actionCreator from '../../ducks/event'

interface Props {
	selectedEvent: Event | null
	isAdmin: boolean
	editEvent: (event: Event) => Promise<any>
	removeEvent: (eventId: Event['id']) => Promise<any>
	removeParticipant: (participantId: Participant['id']) => Promise<any>
	addParticipant: (participant: NewParticipant) => Promise<any>
}
const DrawerContents = styled.div`
	overflow: scroll;
	position: relative;
`

function DueInfo({
	due,
}: {
	due: string | undefined
}): React.ReactElement<{}> | null {
	if (!due) {
		return null
	}

	return (
		<p>
			申請締切: <span style={{ color: '#ff4d4f' }}>{due}</span>
		</p>
	)
}

const calcWidth = (): string => (window.innerWidth < 800 ? '100vw' : '800px')

function EventDetailsComponent({
	selectedEvent,
	isAdmin,
	editEvent,
	removeEvent,
	removeParticipant,
	addParticipant,
}: Props): React.ReactElement<{}> | null {
	const history = useHistory()

	const width = calcWidth()

	if (!selectedEvent) {
		return null
	}

	const { title, start, end, due, description, canApply } = selectedEvent

	const onClose = () => {
		history.push(`/~fairyski/main`)
	}

	return (
		<Drawer
			placement="right"
			visible={!!selectedEvent}
			title="イベント詳細"
			width={width}
			onClose={onClose}
		>
			<DrawerContents>
				<div>
					<h1>{title}</h1>
					<p>開始:{start}</p>
					<p>終了:{end}</p>
					<DueInfo due={due} />
					<p>{description}</p>
				</div>
				{isAdmin && (
					<EditEvent
						history={history}
						event={selectedEvent}
						editEvent={editEvent}
						removeEvent={removeEvent}
					/>
				)}
				<Divider />
				{canApply && <h3>現在参加申請を受け付けています</h3>}
				<EventParticipants
					history={history}
					canDelete={!!canApply}
					event={selectedEvent}
					removeParticipant={removeParticipant}
					addParticipant={addParticipant}
				/>
			</DrawerContents>
		</Drawer>
	)
}

const mapStateToProps = (state: AppState) => {
	const { selectedEventId, events } = state.event
	const { user } = state.user

	return {
		selectedEvent:
			events.find((event: Event) => event.id === selectedEventId) || null,
		isAdmin: user === 'admin',
	}
}

export const EventDetails = connect(mapStateToProps, {
	editEvent: actionCreator.editEvent,
	removeEvent: actionCreator.removeEvent,
	removeParticipant: actionCreator.removeParticipant,
	addParticipant: actionCreator.addParticipant,
})(EventDetailsComponent)
