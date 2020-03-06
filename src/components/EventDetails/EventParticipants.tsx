import { Button, Popconfirm, Table } from 'antd'
import { History } from 'history'
import { set } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { Label } from '../../entities/Label'
import { Participant } from '../../entities/Participant'
import { handleError } from '../../services/handleError'
import { EventStore } from '../../stores/EventStore'
import { ParticipantForm } from './ParticipantForm'

interface Props {
	eventStore: EventStore
	history: History
	canDelete: boolean
}
interface State {
	adding: boolean
}
const label = new Label()

const ButtonWrap = styled.div`
	margin: 16px 0 0 0;
`
@observer
export class EventParticipants extends React.Component<Props, State> {
	public state: State = {
		adding: false,
	}

	private formRef: any

	public render() {
		const { eventStore, history, canDelete } = this.props
		const { participants } = eventStore.event
		const { add_participant } = eventStore

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
				render: (text: any, record: Participant) => (
					<Popconfirm
						title="本当に削除しますか？"
    onConfirm={() => handleDelete(record.id)}
  >
						<a href="javascript:;">削除</a>
  </Popconfirm>
				),
				title: '操作',
			},
		]
		if (!canDelete) {
			columns.pop()
		}

		const handleDelete = async (id: string) => {
			await eventStore
				.removeParticipant(id)
				.catch(err => handleError({ err, history }))
		}
		const handleFormChange = (values: object) => {
			set(eventStore, {
				add_participant: Object.assign(add_participant, values),
			})
		}
		const handleCreate = () => {
			const { form } = this.formRef.props
			form.validateFields((error: any, values: any) => {
				if (!error) {
					eventStore
						.addPariticpant()
						.then(() => {
							this.setState({ adding: false })
						})
						.catch(err => handleError({ err, history }))
				}
			})
		}
		const handleCancel = () => {
			set(eventStore, {
				add_participant: new Participant(),
			})
			this.setState({ adding: false })
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
							wrappedComponentRef={(formRef: any) => (this.formRef = formRef)}
    onCreate={handleCreate}
							onCancel={handleCancel}
							visible={this.state.adding}
    title={eventStore.event.title}
  />
						<ButtonWrap>
							<Button
								type="primary"
								onClick={() => this.setState({ adding: true })}
  >
								参加申請
  </Button>
  </ButtonWrap>
    </div>
				)}
  </div>
		)
	}
}
