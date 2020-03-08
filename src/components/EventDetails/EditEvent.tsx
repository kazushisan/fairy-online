import React, { useState, useRef } from 'react'
import { Button, message, Form } from 'antd'
import { History } from 'history'
import moment from 'moment'
import { handleError } from '../../services/handleError'
import { EventStore } from '../../stores/EventStore'
import { EventForm } from '../EventForm/EventForm'

type Props = {
	history: History
	eventStore: EventStore
}

type Loading = {
	submit: boolean
	delete: boolean
}

export const EditEvent = ({
	eventStore,
	history,
}: Props): React.ReactElement<{}> => {
	const [visible, setVisible] = useState<boolean>(false)
	const [loading, setLoading] = useState<Loading>({
		submit: false,
		delete: false,
	})
	const [form] = Form.useForm()

	const { event } = eventStore
	const handleOk = async () => {
		await form.validateFields().then((values: any) => {
			console.log(values)
		})
	}

	const handleCancel = () => {
		setVisible(false)
	}

	const handleDelete = () => {
		setLoading({ ...loading, delete: true })
		eventStore
			.removeEvent(eventStore.event.id)
			.then(() => {
				message.success('削除しました')
				setLoading({ ...loading, delete: false })
				setVisible(false)
			})
			.catch(err => {
				setLoading({ ...loading, delete: false })
				handleError({ err, history })
			})
	}

	const handleClick = () => {
		form.setFieldsValue({
			title: event.title,
			description: event.description,
			range: [moment(event.start), moment(event.end)],
			can_apply: event.can_apply || false,
		})
		if (event.due) {
			form.setFieldsValue({
				due: moment(event.due),
			})
		}
		setVisible(true)
	}

	return (
		<div>
			<Button type="primary" onClick={handleClick}>
				編集する
			</Button>
			<EventForm
				form={form}
				visible={visible}
				onCancel={handleCancel}
				onOk={handleOk}
				onDelete={handleDelete}
				loading={loading}
				title={event.title}
			/>
		</div>
	)
}
