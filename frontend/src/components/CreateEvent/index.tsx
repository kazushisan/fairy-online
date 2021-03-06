import React, { useState, useCallback } from 'react'
import { Button, Form } from 'antd'
import { useHistory } from 'react-router-dom'

import { EventForm } from '../EventForm'
import { handleError } from '../../services/handleError'
import { NewEvent } from '../../types/Event'

type Props = {
	addEvent: (event: NewEvent) => Promise<void>
}
type Loading = {
	submit: boolean
}

export const CreateEvent = ({ addEvent }: Props): React.ReactElement<{}> => {
	const history = useHistory()
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
			<Button type="default" onClick={onClickCreateEvent}>
				新規イベント
			</Button>
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
