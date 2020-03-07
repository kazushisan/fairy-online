import React, { useState, useRef } from 'react'
import { Button, message } from 'antd'
import { History } from 'history'
import moment from 'moment'
import { handleError } from '../../services/handleError'
import { EventStore } from '../../stores/EventStore'
import { EventForm, EventFormRef } from '../EventForm/EventForm'

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

	const formRef = useRef<EventFormRef>(null)

	const { event } = eventStore
	const handleOk = async () => {
		if (!formRef.current) {
			return
		}

		const { form } = formRef.current
		await form.validateFields(async (err: any, values: any) => {
			if (!err) {
				setLoading({ ...loading, submit: true })
				const editEvent = {
					start: values.range[0].format('YYYY-MM-DD'),
					end: values.range[1].format('YYYY-MM-DD'),
					due: values.due ? values.due.format('YYYY-MM-DD') : '',
					can_apply: values.can_apply,
					title: values.title,
					description: values.description,
				}
				await eventStore
					.editEvent(editEvent)
					.then(() => {
						setVisible(false)
						setLoading({ ...loading, submit: false })
						message.success('変更しました')
					})
					.catch(error => {
						setLoading({ ...loading, submit: false })
						handleError({ err: error, history })
					})
			}
		})
	}
	const handleCancel = () => {
		setVisible(false)
	}
	const handleDelete = async () => {
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
		if (!formRef.current) {
			return
		}

		formRef.current.form.setFieldsValue({
			title: event.title,
			description: event.description,
			range: [moment(event.start), moment(event.end)],
			can_apply: event.can_apply || false,
		})
		if (event.due) {
			formRef.current.form.setFieldsValue({
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
				visible={visible}
				onCancel={handleCancel}
				onOk={handleOk}
				onDelete={handleDelete}
				wrappedComponentRef={formRef}
				loading={loading}
				title={event.title}
			/>
		</div>
	)
}
