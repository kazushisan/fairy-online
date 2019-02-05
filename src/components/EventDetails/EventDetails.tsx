import { Divider, Drawer, List } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { FileService } from '../../services/FileService'
import { EventStore } from '../../stores/EventStore'
import { EventParticipants } from './EventParticipants'

interface Props {
	eventStore: EventStore
	visible: boolean
	onClose: () => void
}
const fileService = new FileService()

const DrawerContents = styled.div`
	overflow: scroll;
	position: relative;
`
@observer
export class EventDetails extends React.Component<Props> {
	public render() {
		const { visible, eventStore, onClose } = this.props
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
					{event.files.length > 0 ? (
						<List
							bordered
							dataSource={event.files}
							renderItem={(file: File) => (
								<List.Item
									onClick={() => fileService.download(file)}
								>
									{file.name}
								</List.Item>
							)}
						/>
					) : (
						<p>資料はありません</p>
					)}
					<Divider />
					<EventParticipants eventStore={eventStore} />
				</DrawerContents>
			</Drawer>
		)
	}
}
