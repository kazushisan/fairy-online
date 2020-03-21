import React, { useState } from 'react'
import { Button, Popconfirm, Table, Form } from 'antd'
import { History } from 'history'
import styled from 'styled-components'

import { handleError } from '../../services/handleError'
import { ParticipantForm } from './ParticipantForm'
import * as label from '../../consts/label'
import { Event } from '../../types/Event'
import { Participant, NewParticipant } from '../../types/Participant'

type Props = {
	history: History
	canDelete: boolean
	event: Event
	removeParticipant: (participantId: Participant['id']) => Promise<any>
	addParticipant: (participant: NewParticipant) => Promise<any>
}

const ButtonWrap = styled.div`
	margin: 16px 0 0 0;
`

export function EventParticipants({
	history,
	canDelete,
	removeParticipant,
	event,
	addParticipant,
}: Props): React.ReactElement<{}> {
	const [adding, setAdding] = useState<boolean>(false)

	const [form] = Form.useForm()

	const { participants } = event

	const handleDelete = (id: number) =>
		removeParticipant(id).catch((err: any) => handleError({ err, history }))

	const columns: object[] = [
		{
			dataIndex: 'name',
			title: label.name,
		},
		{
			dataIndex: 'affiliation',
			title: label.affiliation,
		},
		{
			dataIndex: 'age',
			title: label.age,
		},
		{
			dataIndex: 'sex',
			title: label.sex,
		},
		{
			dataIndex: 'canDrive',
			render: (canDrive: boolean) => (canDrive ? 'はい' : 'いいえ'),
			title: label.canDrive,
		},
		{
			dataIndex: 'note',
			title: label.note,
		},
		{
			dataIndex: 'operation',
			render: (_: any, record: Participant) => (
				<Popconfirm
					title="本当に削除しますか？"
					onConfirm={() => handleDelete(record.id)}
				>
					<span>削除</span>
				</Popconfirm>
			),
			title: '操作',
		},
	]
	if (!canDelete) {
		columns.pop()
	}

	const handleCreate = () =>
		form
			.validateFields()
			.then(values => {
				const {
					name,
					affiliation,
					year,
					age,
					sex,
					canDrive,
					note,
				} = values

				const participant = {
					name,
					affiliation,
					year,
					age,
					sex,
					canDrive,
					note,
				}

				return addParticipant(participant)
			})
			.then(() => {
				setAdding(false)
			})
			.catch(err => {
				handleError({ err, history })
			})

	const handleCancel = () => {
		setAdding(false)
	}

	return (
		<div>
			<Table
				dataSource={participants}
				columns={columns}
				rowKey={(row: Participant) => row.id}
				pagination={false}
				scroll={{ x: true }}
				bordered
			/>
			{event.canApply && (
				<div>
					<ParticipantForm
						form={form}
						onCreate={handleCreate}
						onCancel={handleCancel}
						visible={adding}
						title={event.title}
					/>
					<ButtonWrap>
						<Button
							type="primary"
							onClick={(): void => setAdding(true)}
						>
							参加申請
						</Button>
					</ButtonWrap>
				</div>
			)}
		</div>
	)
}
