import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
import { Button, Checkbox, DatePicker, Form, Input, Modal } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { FormItem } from './FormItem'

interface Props extends FormComponentProps {
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

export type EventFormRef = {
	form: WrappedFormUtils
}

export const EventForm = Form.create<Props>()(
	forwardRef<EventFormRef, Props>(
		(
			{ visible, title, onOk, onCancel, onDelete, form, loading }: Props,
			ref
		): React.ReactElement<{}> => {
			useImperativeHandle(ref, () => ({
				form,
			}))

			const { getFieldDecorator } = form

			const footer = useMemo(() => {
				const buttons = [
					<Button key="back" onClick={onCancel}>
						キャンセル
					</Button>,
					<Button
						key="submit"
						type="primary"
						onClick={onOk}
						loading={loading.submit}
					>
						{title ? '変更する' : '作成する'}
					</Button>,
				]

				if (typeof onDelete === 'function') {
					buttons.splice(
						1,
						0,
						<Button
							key="delete"
							type="danger"
							onClick={onDelete}
							loading={loading.delete}
						>
							イベントを削除
						</Button>
					)
				}

				return buttons
			}, [onDelete])

			const titleInput = useMemo(
				() =>
					getFieldDecorator('title', {
						rules: [
							{
								required: true,
								message: 'タイトルを入力してください',
							},
						],
					})(<Input />),
				[]
			)

			const descriptionInput = useMemo(
				() =>
					getFieldDecorator('description', {
						rules: [
							{
								required: true,
								message: '説明を入力してください',
							},
						],
					})(<Input.TextArea />),
				[]
			)

			const rangeInput = useMemo(
				() =>
					getFieldDecorator('range', {
						rules: [
							{
								required: true,
								message: '日程を入力してください',
							},
						],
					})(<DatePicker.RangePicker />),
				[]
			)

			const dueInput = useMemo(
				() => getFieldDecorator('due', {})(<DatePicker />),
				[]
			)

			const canApplyInput = useMemo(
				() =>
					getFieldDecorator('can_apply', {
						valuePropName: 'checked',
					})(<Checkbox>参加を受け付ける</Checkbox>),
				[]
			)

			return (
				<Modal
					visible={visible}
					title={title || 'イベントを作成'}
					onCancel={onCancel}
					onOk={onOk}
					footer={footer}
				>
					<Form>
						<FormItem label="タイトル">{titleInput}</FormItem>
						<FormItem label="説明">{descriptionInput}</FormItem>
						<FormItem label="日程">{rangeInput}</FormItem>
						<FormItem label="参加申請締切">{dueInput}</FormItem>
						<FormItem tail>{canApplyInput}</FormItem>
					</Form>
				</Modal>
			)
		}
	)
)
