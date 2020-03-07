import { Divider, Drawer } from 'antd'
import { History } from 'history'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { EventStore } from '../../stores/EventStore'
import { UserStore } from '../../stores/UserStore'
import { EditEvent } from './EditEvent'
import { EventParticipants } from './EventParticipants'
import { Uploader } from './Uploader'

interface Props {
	eventStore: EventStore
	userStore: UserStore
	history: History
	visible: boolean
	onClose: () => void
}
const DrawerContents = styled.div`
	overflow: scroll;
	position: relative;
`
@observer
export class EventDetails extends React.Component<Props> {
	public render(): React.ReactNode {
		const { visible, eventStore, onClose, history, userStore } = this.props
		const { event } = eventStore
		const calcWidth = (): string =>
			window.innerWidth < 800 ? '100vw' : '800px'
		const width = calcWidth()
		const isAdmin = userStore.user === 'admin'
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
						<h1>{event.title}</h1>
						<p>開始:{event.start}</p>
						<p>終了:{event.end}</p>
						{event.due && (
							<p>
								申請締切: <span style={{ color: '#ff4d4f' }}>{event.due}</span>
							</p>
						)}
						<p>{event.description}</p>
					</div>
					{isAdmin && <EditEvent eventStore={eventStore} history={history} />}
					<Divider />
					{isAdmin && <Uploader eventStore={eventStore} history={history} />}
					<Divider />
					{event.can_apply && <h3>現在参加申請を受け付けています</h3>}
					<EventParticipants
						eventStore={eventStore}
						history={history}
						canDelete={event.can_apply}
					/>
				</DrawerContents>
			</Drawer>
		)
	}
}
