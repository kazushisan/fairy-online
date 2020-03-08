import React, { useMemo } from 'react'
import { Button, Checkbox, DatePicker, Form, Input, Modal } from 'antd'
import { FormItem } from './FormItem'
import { generateFooter } from './generateFooter'

interface Props {
	visible: boolean
	title?: string
	onOk: () => void
	onCancel: () => void
	onDelete?: () => void
	loading: {
		submit: boolean
		delete?: boolean
	}
}

export const EventForm = ({
	visible,
	title,
	onOk,
	onCancel,
	onDelete,
	loading,
}: Props): React.ReactElement<{}> => {
	const [form] = Form.useForm()

	const onFinish = (values: any): void => {
		console.log(values)
	}

	const footer = useMemo(
		() =>
			generateFooter({
				title,
				onOk,
				onCancel,
				onDelete,
				loading,
			}),
		[title, onOk, onCancel, onDelete, loading]
	)

	return (
		<Modal
			visible={visible}
			title={title || 'イベントを作成'}
			onCancel={onCancel}
			onOk={onOk}
			footer={footer}
		>
			<Form form={form} onFinish={onFinish}>
				<FormItem
					name="title"
					label="タイトル"
					rules={[
						{
							required: true,
							message: 'タイトルを入力してください',
						},
					]}
				>
					<Input />
				</FormItem>
				<FormItem
					name="description"
					label="説明"
					rules={[
						{
							required: true,
							message: '説明を入力してください',
						},
					]}
				>
					<Input.TextArea />
				</FormItem>
				<FormItem
					name="range"
					label="日程"
					rules={[
						{
							required: true,
							message: '日程を入力してください',
						},
					]}
				>
					<DatePicker.RangePicker />
				</FormItem>
				<FormItem name="due" label="参加申請締切">
					<DatePicker />
				</FormItem>
				<FormItem name="canApply" valuePropName="checked">
					<Checkbox>参加を受け付ける</Checkbox>
				</FormItem>
			</Form>
		</Modal>
	)
}
