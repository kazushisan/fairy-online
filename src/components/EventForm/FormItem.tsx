/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Form } from 'antd'
import { FormItemProps } from 'antd/lib/form'

export type Props = FormItemProps

export function FormItem({
	label = '',
	children,
	...rest
}: Props): React.ReactElement<{}> {
	const labelCol = {
		sm: { span: 8 },
		xs: { span: 24 },
	}

	const noLabelWrapperCol = {
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

	if (!label) {
		return (
			<Form.Item wrapperCol={noLabelWrapperCol} {...rest}>
				{children}
			</Form.Item>
		)
	}

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
