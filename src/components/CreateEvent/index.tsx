import React, { useState, useCallback } from 'react'
import { Form } from 'antd'
import { History } from 'history'

import { EventForm } from '../EventForm'
import { generateId } from '../../services/generateId'
import { handleError } from '../../services/handleError'
import { Event } from '../../types/Event'

type Props = {
	history: History
	addEvent: (event: Event) => Promise<void>
}
type Loading = {
	submit: boolean
}

export const CreateEvent = ({
	history,
	addEvent,
}: Props): React.ReactElement<{}> => {
	const [visible, setVisible] = useState<boolean>(false)
	const [loading, setLoading] = useState<Loading>({
		submit: false,
	})

	const [form] = Form.useForm()

	const onOk = async (): Promise<void> =>
		form
			.validateFields()
			.then(values => {
				const newEvent = {
					id: generateId(),
					start: values.range[0].format('YYYY-MM-DD'),
					end: values.range[1].format('YYYY-MM-DD'),
					due: values.due ? values.due.format('YYYY-MM-DD') : '',
					canApply: values.canApply,
					title: values.title,
					description: values.description,
				}

				return addEvent(newEvent)
			})
			.then(() => {
				setLoading({
					submit: false,
				})

				setVisible(false)
			})
			.catch(err => {
				setLoading({
					submit: false,
				})

				handleError({ err, history })
			})
	const onCancel = useCallback(() => setVisible(false), [])

	const onClickCreateEvent = useCallback((e: any) => {
		e.stopPropagation()
		setVisible(true)
	}, [])

	return (
		<div>
			<a onClick={onClickCreateEvent}>新規イベント</a>
			<EventForm
				form={form}
				visible={visible}
				onCancel={onCancel}
				onOk={onOk}
				loading={loading}
			/>
		</div>
	)
}
