import React from 'react'
import { History } from 'history'
import { Divider, Drawer } from 'antd'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { EditEvent } from './EditEvent'
import { EventParticipants } from './EventParticipants'
import { Event } from '../../types/Event'
import { AppState } from '../../store'

interface Props {
	selectedEvent: Event | null
	isAdmin: boolean
	history: History
	visible: boolean
	onClose: () => void
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
	visible,
	onClose,
	history,
}: Props): React.ReactElement<{}> | null {
	const width = calcWidth()

	if (!selectedEvent) {
		return null
	}

	const { title, start, end, due, description, canApply } = selectedEvent

	return (
		<Drawer
			placement="right"
			visible={visible}
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
				{isAdmin && <EditEvent history={history} />}
				<Divider />
				{canApply && <h3>現在参加申請を受け付けています</h3>}
				<EventParticipants history={history} canDelete={!!canApply} />
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

export const EventDetails = connect(mapStateToProps)(EventDetailsComponent)
