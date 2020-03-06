import { Checkbox, Form, Input, InputNumber, Modal, Radio, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import * as React from 'react'
import { Label } from '../../entities/Label'
import { Participant } from '../../entities/Participant'

interface Props extends FormComponentProps {
	add_participant: Participant
	onChange: (object: object) => void
	onCreate: () => void
	onCancel: () => void
	visible: boolean
	title: string
}
const formItemLayout = {
	labelCol: {
		sm: { span: 8 },
		xs: { span: 24 },
	},
	wrapperCol: {
		sm: { span: 16 },
		xs: { span: 24 },
	},
}
const label = new Label()
const { Option } = Select
class _ParticipantForm extends React.Component<Props> {
	public render() {
		const { visible, onCancel, onCreate, title } = this.props
		const { getFieldDecorator } = this.props.form
		return (
			<Modal
    visible={visible}
    title={`${title  } – 参加申請`}
    okText="申請する"
				cancelText="キャンセル"
				onCancel={onCancel}
				onOk={onCreate}
  >
				<Form layout="horizontal">
    <Form.Item label={label.name} {...formItemLayout}>
  {getFieldDecorator('name', {
							rules: [
								{
									required: true,
									message: '氏名の入力は必須です',
								},
							],
						})(<Input />)}
					</Form.Item>
					<Form.Item label={label.affiliation} {...formItemLayout}>
						{getFieldDecorator('affiliation', {
							rules: [
								{
									required: true,
									message: '所属の入力は必須です',
								},
							],
						})(<Input />)}
  </Form.Item>
					<Form.Item label={label.year} {...formItemLayout}>
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
  </Form.Item>
    <Form.Item label={label.age} {...formItemLayout}>
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
					</Form.Item>
					<Form.Item label={label.sex} {...formItemLayout}>
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
  </Form.Item>
					<Form.Item label={label.can_drive} {...formItemLayout}>
						{getFieldDecorator('can_drive')(<Checkbox>可能</Checkbox>)}
  </Form.Item>
					<Form.Item label={label.note} {...formItemLayout}>
						{getFieldDecorator('note')(<Input.TextArea />)}
  </Form.Item>
  </Form>
  </Modal>
		)
	}
}

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
})(_ParticipantForm)
