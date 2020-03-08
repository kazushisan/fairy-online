import React, { useState, useCallback, useRef } from 'react'
import { message, Form } from 'antd'
import { History } from 'history'

import { Event } from '../../entities/Event'
import { handleError } from '../../services/handleError'
import { EventStore } from '../../stores/EventStore'
import { EventForm } from '../EventForm/EventForm'

type Props = {
	history: History
}
type Loading = {
	submit: boolean
}

export const CreateEvent = ({ history }: Props): React.ReactElement<{}> => {
	const [visible, setVisible] = useState<boolean>(false)
	const [loading, setLoading] = useState<Loading>({
		submit: false,
	})

	const [form] = Form.useForm()

	const handleOk = (): Promise<void> =>
		form.validateFields().then((values: any) => console.log(values))

	const handleCancel = useCallback(() => setVisible(false), [])

	const handleClick = useCallback((e: any) => {
		e.stopPropagation()
		setVisible(true)
	}, [])

	return (
		<div>
			<a onClick={handleClick}>新規イベント</a>
			<EventForm
				form={form}
				visible={visible}
				onCancel={handleCancel}
				onOk={handleOk}
				loading={loading}
			/>
		</div>
	)
}
