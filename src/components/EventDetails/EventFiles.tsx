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

export const EventFiles = (props: Props): React.ReactElement<any> => {
	const { eventStore, history, canDelete } = props
	const { event } = eventStore

	const handleDeleteFile = async (
		e: React.MouseEvent<HTMLAnchorElement>,
		file: File
	): Promise<void> => {
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
					dataSource={event.files as any}
					renderItem={(file: File): React.ReactNode => (
						<List.Item
							onClick={(): Promise<void> =>
								eventStore
									.downloadFile(file)
									.catch(err => handleError({ err, history }))
							}
							actions={
								canDelete
									? [
											<a
												onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
													e.stopPropagation()
													handleDeleteFile(e, file)
												}}
											>
												削除
											</a>,
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
