import React, { forwardRef, useImperativeHandle } from 'react'
import { Checkbox, Form, Input, InputNumber, Modal, Radio, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { Label } from '../../entities/Label'
import { Participant } from '../../entities/Participant'
import { ParticipantFormItem } from './ParticipantFormItem'

type Props = FormComponentProps & {
	add_participant: Participant
	onChange: (object: object) => void
	onCreate: () => void
	onCancel: () => void
	visible: boolean
	title: string
}

export type ParticipantFormRef = {
	form: WrappedFormUtils
}

const label = new Label()
const { Option } = Select
const ParticipantFormContent = forwardRef<ParticipantFormRef, Props>(
	(
		{
			form,
			visible,
			onCancel,
			onCreate,
			title,
			form: { getFieldDecorator },
		}: Props,
		ref
	): React.ReactElement<{}> => {
		useImperativeHandle(ref, () => ({
			form,
		}))

		return (
			<Modal
				visible={visible}
				title={`${title} – 参加申請`}
				okText="申請する"
				cancelText="キャンセル"
				onCancel={onCancel}
				onOk={onCreate}
			>
				<Form layout="horizontal">
					<ParticipantFormItem label={label.name}>
						{getFieldDecorator('name', {
							rules: [
								{
									required: true,
									message: '氏名の入力は必須です',
								},
							],
						})(<Input />)}
					</ParticipantFormItem>
					<ParticipantFormItem label={label.affiliation}>
						{getFieldDecorator('affiliation', {
							rules: [
								{
									required: true,
									message: '所属の入力は必須です',
								},
							],
						})(<Input />)}
					</ParticipantFormItem>
					<ParticipantFormItem label={label.year}>
						{getFieldDecorator('year', {
							rules: [
								{
									required: true,
									message: '学年の入力は必須です',
								},
							],
						})(
							<Select>
								{label.year_list.map((item: string) => (
									<Option value={item} key={item}>
										{item}
									</Option>
								))}
							</Select>
						)}
					</ParticipantFormItem>
					<ParticipantFormItem label={label.age}>
						{getFieldDecorator('age', {
							rules: [
								{
									required: true,
									message: '年齢の入力は必須です',
									max: 80,
									min: 18,
									type: 'number',
								},
							],
						})(<InputNumber />)}
					</ParticipantFormItem>
					<ParticipantFormItem label={label.sex}>
						{getFieldDecorator('sex', {
							rules: [
								{
									required: true,
									message: '性別の入力は必須です',
								},
							],
						})(
							<Radio.Group>
								<Radio value="M">M</Radio>
								<Radio value="F">F</Radio>
							</Radio.Group>
						)}
					</ParticipantFormItem>
					<ParticipantFormItem label={label.can_drive}>
						{getFieldDecorator('can_drive', {
							valuePropName: 'checked',
						})(<Checkbox>可能</Checkbox>)}
					</ParticipantFormItem>
					<ParticipantFormItem label={label.note}>
						{getFieldDecorator('note')(<Input.TextArea />)}
					</ParticipantFormItem>
				</Form>
			</Modal>
		)
	}
)

export const ParticipantForm = Form.create({
	onValuesChange(props: Props, values: object) {
		props.onChange(values)
	},
	mapPropsToFields(props: Props) {
		return {
			name: Form.createFormField({
				value: props.add_participant.name,
			}),
		}
	},
})(ParticipantFormContent)
