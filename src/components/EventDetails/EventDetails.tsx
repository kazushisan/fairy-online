import { Divider, Drawer } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { EventStore } from '../../stores/EventStore'
import { EventParticipants } from './EventParticipants'
import { Uploader } from './Uploader'
import { History } from 'history'
import { EventFiles } from './EventFiles';

interface Props {
	eventStore: EventStore
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
	public render() {
		const { visible, eventStore, onClose, history } = this.props
		const event = eventStore.event
		const calcWidth = (): string =>
			window.innerWidth < 600 ? '100vw' : '600px'
		const width = calcWidth()

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
						<p>開始: {event.start}</p>
						<p>終了: {event.end}</p>
						<p>{event.description}</p>
					</div>
					<Divider />
					<EventFiles eventStore={eventStore} history={history} />
					<Uploader eventStore={eventStore} history={history} />
					<Divider />
					<EventParticipants
						eventStore={eventStore}
						history={history}
					/>
				</DrawerContents>
			</Drawer>
		)
	}
}
