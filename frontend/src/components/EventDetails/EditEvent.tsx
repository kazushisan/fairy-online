import React, { useState } from 'react'
import { Button, message, Form } from 'antd'
import { History } from 'history'
import moment from 'moment'
import { handleError } from '../../services/handleError'
import { EventForm } from '../EventForm'
import { Event } from '../../types/Event'

type Props = {
	event: Event
	history: History
	editEvent: (event: Event) => Promise<any>
	removeEvent: (event: Event['id']) => Promise<any>
}

type Loading = {
	submit: boolean
	delete: boolean
}

export function EditEvent({
	event,
	history,
	editEvent,
	removeEvent,
}: Props): React.ReactElement<{}> {
	const [visible, setVisible] = useState<boolean>(false)
	const [loading, setLoading] = useState<Loading>({
		submit: false,
		delete: false,
	})
	const [form] = Form.useForm()

	const onOk = async () =>
		form
			.validateFields()
			.then(values => {
				const editedEvent = {
					id: event.id,
					start: values.range[0].format('YYYY-MM-DD'),
					end: values.range[1].format('YYYY-MM-DD'),
					due: values.due ? values.due.format('YYYY-MM-DD') : '',
					canApply: values.canApply,
					title: values.title,
					description: values.description,
				}

				return editEvent(editedEvent)
			})
			.then(() => {
				setVisible(false)
				setLoading({
					...loading,
					submit: false,
				})
			})
			.catch(error => {
				setLoading({
					...loading,
					submit: false,
				})
				handleError({ err: error, history })
			})

	const onCancel = () => {
		setVisible(false)
	}

	const onDelete = () =>
		Promise.resolve()
			.then(() => {
				setLoading({
					...loading,
					delete: true,
				})

				return removeEvent(event.id)
			})
			.then(() => {
				message.success('削除しました')
				setLoading({
					...loading,
					delete: false,
				})
				setVisible(false)
			})
			.catch(err => {
				setLoading({
					...loading,
					delete: false,
				})
				handleError({ err, history })
			})

	const onStartEdit = () => {
		setVisible(true)

		form.setFieldsValue({
			title: event.title,
			description: event.description,
			range: [moment(event.start), moment(event.end)],
			canApply: event.canApply || false,
			due: event.due ? moment(event.due) : null,
		})
	}

	return (
		<div>
			<Button type="primary" onClick={onStartEdit}>
				編集する
			</Button>
			<EventForm
				form={form}
				visible={visible}
				onCancel={onCancel}
				onOk={onOk}
				onDelete={onDelete}
				loading={loading}
				title="イベントを編集する"
			/>
		</div>
	)
}
