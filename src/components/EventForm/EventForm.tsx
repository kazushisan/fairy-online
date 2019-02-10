import * as React from 'react'
import { FormComponentProps } from 'antd/lib/form'
import { Button, DatePicker,Form, Input, Modal, Checkbox } from 'antd'

interface Props extends FormComponentProps {
	visible: boolean
	title?: string,
	onOk: () => void
	onCancel: () => void
	onDelete: () => void
	loading: {
		submit: boolean
		delete: boolean
	}
}
const formItemLayout = {
	labelCol: {
		sm: { span: 8 },
		xs: { span: 24 }
	},
	wrapperCol: {
		sm: { span: 16 },
		xs: { span: 24 }
	}
}
class _EventForm extends React.Component<Props> {
	public render() {
		const { visible, title, onOk, onCancel, onDelete, form, loading } = this.props
		const { getFieldDecorator } = form
		return (
			<Modal
				visible={visible}
				title={title || 'イベントを作成'}
				onCancel={onCancel}
				onOk={onOk}
				footer={[
					<Button key="back" onClick={onCancel}>キャンセル</Button>,
					<Button key="delete" type="danger" onClick={onDelete} loading={loading.delete}>イベントを削除</Button>,	
					<Button key="submit" type="primary" onClick={onOk} loading={loading.submit}>
					  変更する
					</Button>
				]}
			>
				<Form>
					<Form.Item label="タイトル" {...formItemLayout}>
						{getFieldDecorator('title', {
							rules: [
								{
									required: true,
									message:
										'タイトルを入力してください'
								}
							]
						})(<Input />)}
					</Form.Item>
					<Form.Item label="説明" {...formItemLayout}>
						{getFieldDecorator('description', {
							rules: [
								{
									required: true,
									message:
										'説明を入力してください'
								}
							]
						})(<Input.TextArea />)}
					</Form.Item>
					<Form.Item label="日程" {...formItemLayout}>
						{getFieldDecorator('range', {
							rules: [
								{
									required: true,
									message:
										'日程を入力してください'
								}
							]
						})(<DatePicker.RangePicker />)}
					</Form.Item>
					<Form.Item label="参加申請締切" {...formItemLayout}>
						{getFieldDecorator('due', {
						})(<DatePicker />)}
					</Form.Item>
					<Form.Item {...formItemLayout}>
						{getFieldDecorator('can_apply', {
							valuePropName: 'checked'
						})(<Checkbox>参加を受け付ける</Checkbox>)}
					</Form.Item>
				</Form>
			</Modal>
		)
	}
}

export const EventForm = Form.create()(_EventForm)
