import { Button, message } from 'antd'
import * as React from 'react'
import { EventForm } from '../EventForm/EventForm'
import { History } from 'history'
import { EventStore } from '../../stores/EventStore'
import { handleError } from '../../services/handleError'
import * as moment from 'moment'

interface Props {
	history: History,
	eventStore: EventStore
}
interface State {
	visible: boolean
	loading: {
		submit: boolean
		delete: boolean
	}
}
export class EditEventForm extends React.Component<Props> {
	public state: State = {
		visible: false,
		loading: {
			submit: false,
			delete: false
		}
	}
	private formRef: any

	render() {
		const { eventStore, history } = this.props
		const { event } = eventStore
		const handleOk = async () => {
			const form = this.formRef.props.form
			await form.validateFields(async (err:any, values:any) => {
				if (!err) {
					this.setState({ loading: { submit: true }})
					const event = {
						start: values.range[0].format('YYYY-MM-DD'),
						end: values.range[1].format('YYYY-MM-DD'),
						due: values.due.format('YYYY-MM-DD'),
						can_apply: values.can_apply,
						title: values.title,
						description: values.description
					}
					await eventStore.editEvent(event).then(() => {
						this.setState({ loading: { submit: false }, visible: false })
						message.success('変更しました')
					}).catch(err => {
						this.setState({ loading: { submit: false }})
						handleError({ err, history })
					})
				}
			})
		}
		const handleCancel = () => {
			this.setState({visible: false })
		}
		const handleDelete = async () => {
			this.setState({ loading: { delete: true }})
			eventStore.removeEvent(eventStore.event.id).then(() => {
				message.success('削除しました')
				this.setState({ loading: { delete: false }, visible: false })
			}).catch(err => {
				this.setState({ loading: { delete: false }})
				handleError({ err, history })
			})
		}
		const saveFormRef = (formRef: any) => {
			this.formRef = formRef
		}
		const handleClick = () => {
			this.formRef.props.form.setFieldsValue({
				title: event.title,
				description: event.description,
				range: [moment(event.start), moment(event.end)],
				due: event.due ? moment(event.due) : undefined,
				can_apply: event.can_apply || false
			})
			this.setState({ visible: true })
		}

		return (
			<div>
				<Button type="primary" onClick={handleClick}>編集する</Button>
				<EventForm
					visible={this.state.visible}
					onCancel={handleCancel}
					onOk={handleOk}
					onDelete={handleDelete}
					wrappedComponentRef={saveFormRef}
					loading={this.state.loading}
					title={event.title}
				/>
			</div>

		)
	}
}