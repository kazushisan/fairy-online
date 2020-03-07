import { Button, message } from 'antd'
import { History } from 'history'
import moment from 'moment'
import React from 'react'
import { handleError } from '../../services/handleError'
import { EventStore } from '../../stores/EventStore'
import { EventForm } from '../EventForm/EventForm'

interface Props {
	history: History
	eventStore: EventStore
}
interface State {
	visible: boolean
	loading: {
		submit: boolean
		delete: boolean
	}
}
export class EditEvent extends React.Component<Props> {
	public state: State = {
		visible: false,
		loading: {
			submit: false,
			delete: false,
		},
	}

	private formRef: any

	public render() {
		const { eventStore, history } = this.props
		const { event } = eventStore
		const handleOk = async () => {
			const { form } = this.formRef.props
			await form.validateFields(async (err: any, values: any) => {
				if (!err) {
					this.setState({ loading: { submit: true } })
					const editEvent = {
						start: values.range[0].format('YYYY-MM-DD'),
						end: values.range[1].format('YYYY-MM-DD'),
						due: values.due ? values.due.format('YYYY-MM-DD') : '',
						can_apply: values.can_apply,
						title: values.title,
						description: values.description,
					}
					await eventStore
						.editEvent(editEvent)
						.then(() => {
							this.setState({
								loading: { submit: false },
								visible: false,
							})
							message.success('変更しました')
						})
						.catch(error => {
							this.setState({ loading: { submit: false } })
							handleError({ err: error, history })
						})
				}
			})
		}
		const handleCancel = () => {
			this.setState({ visible: false })
		}
		const handleDelete = async () => {
			this.setState({ loading: { delete: true } })
			eventStore
				.removeEvent(eventStore.event.id)
				.then(() => {
					message.success('削除しました')
					this.setState({
						loading: { delete: false },
						visible: false,
					})
				})
				.catch(err => {
					this.setState({ loading: { delete: false } })
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
				can_apply: event.can_apply || false,
			})
			if (event.due) {
				this.formRef.props.form.setFieldsValue({
					due: moment(event.due),
				})
			}
			this.setState({ visible: true })
		}

		const { visible, loading } = this.state

		return (
			<div>
				<Button type="primary" onClick={handleClick}>
					編集する
				</Button>
				<EventForm
					visible={visible}
					onCancel={handleCancel}
					onOk={handleOk}
					onDelete={handleDelete}
					wrappedComponentRef={saveFormRef}
					loading={loading}
					title={event.title}
				/>
			</div>
		)
	}
}
