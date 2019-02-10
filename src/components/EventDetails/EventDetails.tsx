import { Divider, Drawer, Empty, List } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { File } from '../../entities/File'
import * as FileApi from '../../services/FileApi'
import { EventStore } from '../../stores/EventStore'
import { EventParticipants } from './EventParticipants'
import { Uploader } from './Uploader'
import { handleError } from '../../services/handleError'
import { History } from 'history'
 
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

		const handleDeleteFile = async (
			e: React.MouseEvent<HTMLAnchorElement>,
			file: File
		) => {
			e.stopPropagation()
			await eventStore.removeFile(file).catch(err => handleError({ err, history }))
		}
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
									onClick={() => FileApi.download(file)}
									actions={[
										<a
											href="javascript:;"
											onClick={(
												e: React.MouseEvent<
													HTMLAnchorElement
												>
											) => handleDeleteFile(e, file)}
										>
											削除
										</a>
									]}
								>
									{file.name}
								</List.Item>
							)}
						/>
					) : (
						<Empty description={<span>資料はありません</span>} />
					)}
					<Uploader eventStore={eventStore} history={history} />
					<Divider />
					<EventParticipants eventStore={eventStore} history={history} />
				</DrawerContents>
			</Drawer>
		)
	}
}
