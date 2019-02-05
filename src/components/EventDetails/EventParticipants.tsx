import {
	Button,
	// Checkbox,
	// Input,
	// InputNumber,
	Popconfirm,
	// Radio,
	Table
} from 'antd'
import { set } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { Label } from '../../entities/Label'
import { Participant } from '../../entities/Participant'
import { EventStore } from '../../stores/EventStore'
import { ParticipantForm } from './ParticipantForm'

interface Props {
	eventStore: EventStore
}
interface State {
	adding: boolean
}
const label = new Label()
@observer
export class EventParticipants extends React.Component<Props, State> {
	public state: State = {
		adding: false
	}
	public render() {
		const { eventStore } = this.props
		const { participants } = eventStore.event
		const { add_participant } = eventStore
		const columns = [
			{
				dataIndex: 'name',
				// render: (text: string, record: Participant, index: number) =>
				// 	index === participants.length ? (
				// 		<Input
				// 			value={add_participant.name}
				// 			onChange={e => {
				// 				const modified: Participant = Object.assign(
				// 					{},
				// 					add_participant
				// 				)
				// 				modified.name = e.target.value
				// 				set(eventStore, { add_participant: modified })
				// 			}}
				// 		/>
				// 	) : (
				// 		text
				// 	),
				title: label.name
			},
			{
				dataIndex: 'affiliation',
				// render: (text: string, record: Participant, index: number) =>
				// 	index === participants.length ? (
				// 		<Input
				// 			value={add_participant.affiliation}
				// 			onChange={e => {
				// 				const modified: Participant = Object.assign(
				// 					{},
				// 					add_participant
				// 				)
				// 				modified.affiliation = e.target.value
				// 				set(eventStore, { add_participant: modified })
				// 			}}
				// 		/>
				// 	) : (
				// 		text
				// 	),
				title: label.affiliation
			},
			{
				dataIndex: 'age',
				// render: (text: number, record: Participant, index: number) =>
				// 	index === participants.length ? (
				// 		<InputNumber
				// 			value={add_participant.age}
				// 			onChange={value => {
				// 				const modified: Participant = Object.assign(
				// 					{},
				// 					add_participant
				// 				)
				// 				modified.age = value!
				// 				set(eventStore, { add_participant: modified })
				// 			}}
				// 		/>
				// 	) : (
				// 		text
				// 	),
				title: label.age
			},
			{
				dataIndex: 'sex',
				// render: (text: 'M' | 'F', record: Participant, index: number) =>
				// 	index === participants.length ? (
				// 		<Radio.Group
				// 			value={add_participant.sex}
				// 			onChange={e => {
				// 				const modified: Participant = Object.assign(
				// 					{},
				// 					add_participant
				// 				)
				// 				modified.sex = e.target.value
				// 				set(eventStore, { add_participant: modified })
				// 			}}
				// 		>
				// 			<Radio value="M">M</Radio>
				// 			<Radio value="F">F</Radio>
				// 		</Radio.Group>
				// 	) : (
				// 		text
				// 	),
				title: label.sex
			},
			{
				dataIndex: 'can_drive',
				// render: (text: boolean, record: Participant, index: number) =>
				// 	index === participants.length ? (
				// 		<Checkbox
				// 			value={add_participant.can_drive}
				// 			onChange={e => {
				// 				const modified: Participant = Object.assign(
				// 					{},
				// 					add_participant
				// 				)
				// 				modified.can_drive = e.target.value
				// 				set(eventStore, { add_participant: modified })
				// 			}}
				// 		>
				// 			可能
				// 		</Checkbox>
				// 	) : text ? (
				// 		'はい'
				// 	) : (
				// 		'いいえ'
				// 	),
				title: label.can_drive
			},
			{
				dataIndex: 'note',
				// render: (text: string, record: Participant, index: number) =>
				// 	index === participants.length ? (
				// 		<Input.TextArea
				// 			value={add_participant.note}
				// 			onChange={e => {
				// 				const modified: Participant = Object.assign(
				// 					{},
				// 					add_participant
				// 				)
				// 				modified.note = e.target.value
				// 				set(eventStore, { add_participant: modified })
				// 			}}
				// 		/>
				// 	) : (
				// 		text
				// 	),
				title: label.note
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
				title: '操作'
			}
		]

		const handleDelete = (id: string) => {
			eventStore.removeParticipant(id)
		}
		const handleInit = (e: React.MouseEvent<HTMLElement>) => {
			eventStore.initAddParticipant()
		}
		const handleFormChange = (values: object) => {
			console.log(values)
			set(eventStore, {
				add_participant: Object.assign(add_participant, values)
			})
		}
		return (
			<div>
				<Table
					dataSource={participants}
					columns={columns}
					rowKey={(row: Participant) => row.id}
					pagination={false}
					scroll={{ x: true }}
				/>
				<div>
					<ParticipantForm
						add_participant={add_participant}
						onChange={handleFormChange}
					/>
				</div>
				<Button type="primary" onClick={handleInit}>
					追加
				</Button>
			</div>
		)
	}
}
