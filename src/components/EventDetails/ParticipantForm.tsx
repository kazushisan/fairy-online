import {
	// Button,
	// Checkbox,
	Form,
	Input,
	InputNumber
	// Popconfirm,
	// Radio
} from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import * as React from 'react'
import { Label } from '../../entities/Label'
import { Participant } from '../../entities/Participant'

interface Props extends FormComponentProps {
	add_participant: Participant
	onChange: (object: object) => void
}

const label = new Label()

class _ParticipantForm extends React.Component<Props> {
	public handleSubmit(e: React.MouseEvent<HTMLElement>): void {
		e.preventDefault()
		console.log(e)
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)
			}
		})
	}
	public render() {
		const { getFieldDecorator } = this.props.form

		const formItemLayout = {
			labelCol: {
				sm: { span: 8 },
				xs: { span: 24 }
			},
			wrapperCol: {
				sm: { span: 16 },
				xs: { span: 24 },
			}
		}
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit}>
				<Form.Item label={label.name} {...formItemLayout}>
					{getFieldDecorator('name', {
						rules: [
							{ required: true, message: '氏名の入力は必須です' }
						]
					})(<Input />)}
				</Form.Item>
				<Form.Item label={label.affiliation} {...formItemLayout}>
					{getFieldDecorator('affiliation', {
						rules: [
							{ required: true, message: '所属の入力は必須です' }
						]
					})(<Input />)}
				</Form.Item>
				<Form.Item label={label.age} {...formItemLayout}>
					{getFieldDecorator('age', {
						rules: [
							{ required: true, message: '年齢の入力は必須です' }
						]
					})(<InputNumber />)}
				</Form.Item>
			</Form>
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
				value: props.add_participant.name
			})
		}
	}
})(_ParticipantForm)
