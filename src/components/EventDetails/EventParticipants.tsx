import { Button, Popconfirm, Table } from 'antd'
import { History } from 'history'
import { set } from 'mobx'
import { observer } from 'mobx-react'
import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Label } from '../../entities/Label'
import { Participant } from '../../entities/Participant'
import { handleError } from '../../services/handleError'
import { EventStore } from '../../stores/EventStore'
import { ParticipantForm, ParticipantFormRef } from './ParticipantForm'

type Props = {
	eventStore: EventStore
	history: History
	canDelete: boolean
}

const label = new Label()

const ButtonWrap = styled.div`
	margin: 16px 0 0 0;
`

export const EventParticipants = observer(
	({ eventStore, history, canDelete }: Props): React.ReactElement<{}> => {
		const [adding, setAdding] = useState<boolean>(false)

		const formRef = useRef<ParticipantFormRef>(null)

		const { participants } = eventStore.event
		const { add_participant } = eventStore

		const handleDelete = async (id: string) => {
			await eventStore
				.removeParticipant(id)
				.catch(err => handleError({ err, history }))
		}

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
				dataIndex: 'can_drive',
				render: (can_drive: boolean) => (can_drive ? 'はい' : 'いいえ'),
				title: label.can_drive,
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

		const handleFormChange = (values: object) => {
			set(eventStore, {
				add_participant: Object.assign(add_participant, values),
			})
		}
		const handleCreate = () => {
			if (!formRef.current) {
				return
			}

			const { form } = formRef.current
			form.validateFields((error: any) => {
				if (!error) {
					eventStore
						.addPariticpant()
						.then(() => {
							setAdding(false)
						})
						.catch(err => handleError({ err, history }))
				}
			})
		}
		const handleCancel = () => {
			set(eventStore, {
				add_participant: new Participant(),
			})
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
				{eventStore.event.can_apply && (
					<div>
						<ParticipantForm
							add_participant={add_participant}
							onChange={handleFormChange}
							wrappedComponentRef={formRef}
							onCreate={handleCreate}
							onCancel={handleCancel}
							visible={adding}
							title={eventStore.event.title}
						/>
						<ButtonWrap>
							<Button type="primary" onClick={(): void => setAdding(true)}>
								参加申請
							</Button>
						</ButtonWrap>
					</div>
				)}
			</div>
		)
	}
)
