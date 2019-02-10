import { Empty, List } from 'antd'
import { History } from 'history'
import * as React from 'react'
import { File } from '../../entities/File'
import { handleError } from '../../services/handleError'
import { EventStore } from '../../stores/EventStore'

interface Props {
	eventStore: EventStore
	history: History
	canDelete: boolean
}

export class EventFiles extends React.Component<Props> {
	public render() {
		const { eventStore, history, canDelete } = this.props
		const { event } = eventStore

		const handleDeleteFile = async (
			e: React.MouseEvent<HTMLAnchorElement>,
			file: File
		) => {
			e.stopPropagation()
			await eventStore
				.removeFile(file)
				.catch(err => handleError({ err, history }))
		}
		return (
			<div>
				{event.files.length > 0 ? (
					<List
						bordered
						dataSource={event.files}
						renderItem={(file: File) => (
							<List.Item
								onClick={() =>
									eventStore
										.downloadFile(file)
										.catch(err =>
											handleError({ err, history })
										)
								}
								actions={
									canDelete
										? [
												<a
													href="javascript:;"
													onClick={(
														e: React.MouseEvent<
															HTMLAnchorElement
														>
													) =>
														handleDeleteFile(
															e,
															file
														)
													}
												>
													削除
												</a>
										  ]
										: []
								}
							>
								{file.name}
							</List.Item>
						)}
					/>
				) : (
					<Empty description={<span>資料はありません</span>} />
				)}
			</div>
		)
	}
}
