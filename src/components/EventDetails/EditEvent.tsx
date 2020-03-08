import React, { useState, useRef } from 'react'
import { Button, message, Form } from 'antd'
import { History } from 'history'
import moment from 'moment'
import { handleError } from '../../services/handleError'
import { EventForm } from '../EventForm/EventForm'

type Props = {
	history: History
}

type Loading = {
	submit: boolean
	delete: boolean
}

export const EditEvent = ({ history }: Props): React.ReactElement<{}> => {
	const [visible, setVisible] = useState<boolean>(false)
	const [loading, setLoading] = useState<Loading>({
		submit: false,
		delete: false,
	})
	const [form] = Form.useForm()

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
	}

	const handleClick = () => {
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
				title="イベントを編集する"
			/>
		</div>
	)
}
