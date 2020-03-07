import React from 'react'
import { Form } from 'antd'

type Props = {
	label: string
	children: React.ReactNode
}

const labelCol = {
	sm: { span: 8 },
	xs: { span: 24 },
}
const wrapperCol = {
	sm: { span: 16 },
	xs: { span: 24 },
}

export const ParticipantFormItem = ({
	label,
	children,
}: Props): React.ReactElement => {
	return (
		<Form.Item label={label} labelCol={labelCol} wrapperCol={wrapperCol}>
			{children}
		</Form.Item>
	)
}
