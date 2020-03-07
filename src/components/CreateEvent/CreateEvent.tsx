import { message } from 'antd'
import { History } from 'history'
import React, { useState, useCallback, useRef } from 'react'
import { Event } from '../../entities/Event'
import { handleError } from '../../services/handleError'
import { EventStore } from '../../stores/EventStore'
import { EventForm, EventFormRef } from '../EventForm/EventForm'

type Props = {
	history: History
	eventStore: EventStore
}
type Loading = {
	submit: boolean
}

export const CreateEvent = ({
	eventStore,
	history,
}: Props): React.ReactElement<{}> => {
	const [visible, setVisible] = useState<boolean>(false)
	const [loading, setLoading] = useState<Loading>({
		submit: false,
	})

	const formRef = useRef<EventFormRef>(null)

	const handleOk = useCallback(async (): Promise<void> => {
		if (!formRef.current) {
			return
		}

		const { form } = formRef.current
		await form.validateFields(async (err: any, values: any) => {
			if (!err) {
				setLoading({ submit: true })
				const newEvent = Object.assign(new Event(), {
					start: values.range[0].format('YYYY-MM-DD'),
					end: values.range[1].format('YYYY-MM-DD'),
					due: values.due ? values.due.format('YYYY-MM-DD') : '',
					can_apply: values.can_apply,
					title: values.title,
					description: values.description,
				})
				await eventStore
					.addEvent(newEvent)
					.then(() => {
						setLoading({ submit: false })
						setVisible(false)
						message.success('作成しました')
					})
					.catch(error => {
						setLoading({ submit: false })
						handleError({ err: error, history })
					})
			}
		})
	}, [])
	const handleCancel = useCallback(() => setVisible(false), [])

	const handleClick = useCallback((e: any) => {
		e.stopPropagation()
		setVisible(true)
	}, [])

	return (
		<div>
			<a onClick={handleClick}>新規イベント</a>
			<EventForm
				visible={visible}
				onCancel={handleCancel}
				onOk={handleOk}
				wrappedComponentRef={formRef}
				loading={loading}
			/>
		</div>
	)
}
