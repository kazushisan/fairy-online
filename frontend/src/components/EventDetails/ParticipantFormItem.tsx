/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Form } from 'antd'
import { FormItemProps } from 'antd/lib/form'

type Props = FormItemProps

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
	...rest
}: Props): React.ReactElement => {
	return (
		<Form.Item
			label={label}
			labelCol={labelCol}
			wrapperCol={wrapperCol}
			{...rest}
		>
			{children}
		</Form.Item>
	)
}
