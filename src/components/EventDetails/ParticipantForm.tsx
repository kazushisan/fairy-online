import React, { useMemo } from 'react'
import { Checkbox, Form, Input, InputNumber, Modal, Radio, Select } from 'antd'
import { FormInstance } from 'antd/lib/form'

import { ParticipantFormItem } from './ParticipantFormItem'
import * as label from '../../consts/label'
import { yearOptions } from '../../consts/options'

type Props = {
	form: FormInstance
	onCreate: () => void
	onCancel: () => void
	visible: boolean
	title: string
}

const { Option } = Select
export const ParticipantForm = ({
	form,
	visible,
	onCancel,
	onCreate,
	title,
}: Props): React.ReactElement<{}> => {
	const modalTitle = useMemo(() => `${title} – 参加申請`, [title])
	return (
		<Modal
			visible={visible}
			title={modalTitle}
			okText="申請する"
			cancelText="キャンセル"
			onCancel={onCancel}
			onOk={onCreate}
		>
			<Form layout="horizontal" form={form}>
				<ParticipantFormItem
					name="name"
					label={label.name}
					rules={[
						{
							required: true,
							message: '氏名の入力は必須です',
						},
					]}
				>
					<Input />
				</ParticipantFormItem>
				<ParticipantFormItem
					name="affiliation"
					label={label.affiliation}
					rules={[
						{
							required: true,
							message: '所属の入力は必須です',
						},
					]}
				>
					<Input />
				</ParticipantFormItem>
				<ParticipantFormItem
					name="year"
					label={label.year}
					rules={[
						{
							required: true,
							message: '学年の入力は必須です',
						},
					]}
				>
					<Select>
						{yearOptions.map((item: string) => (
							<Option value={item} key={item}>
								{item}
							</Option>
						))}
					</Select>
				</ParticipantFormItem>
				<ParticipantFormItem
					name="age"
					label={label.age}
					rules={[
						{
							required: true,
							message: '年齢の入力は必須です',
							max: 80,
							min: 18,
							type: 'number',
						},
					]}
				>
					<InputNumber />
				</ParticipantFormItem>
				<ParticipantFormItem
					label={label.sex}
					name="sex"
					rules={[
						{
							required: true,
							message: '性別の入力は必須です',
						},
					]}
				>
					<Radio.Group>
						<Radio value="M">M</Radio>
						<Radio value="F">F</Radio>
					</Radio.Group>
				</ParticipantFormItem>
				<ParticipantFormItem
					name="canDrive"
					label={label.canDrive}
					valuePropName="checked"
				>
					<Checkbox>可能</Checkbox>
				</ParticipantFormItem>
				<ParticipantFormItem name="note" label={label.note}>
					<Input.TextArea />
				</ParticipantFormItem>
			</Form>
		</Modal>
	)
}
