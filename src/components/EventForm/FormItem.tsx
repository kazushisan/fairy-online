import React from 'react'
import { Form } from 'antd'

export type Props = {
	label?: string
	children: React.ReactNode
	tail?: boolean
}

export const FormItem = ({
	label = '',
	children,
	tail = false,
}: Props): React.ReactElement<{}> => {
	const labelCol = {
		sm: { span: 8 },
		xs: { span: 24 },
	}

	const tailWrapperCol = {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	}

	const wrapperCol = {
		sm: { span: 16 },
		xs: { span: 24 },
	}

	if (tail) {
		return <Form.Item wrapperCol={tailWrapperCol}>{children}</Form.Item>
	}

	return (
		<Form.Item label={label} labelCol={labelCol} wrapperCol={wrapperCol}>
			{children}
		</Form.Item>
	)
}
