import { message } from 'antd'
import { History } from 'history'
import * as React from 'react'
import { Event } from '../../entities/Event'
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
	}
}
export class CreateEvent extends React.Component<Props> {
	public state: State

	private formRef: any

	constructor(props: Props) {
		super(props)
		this.state = {
			visible: false,
			loading: {
				submit: false,
			},
		}

		this.formRef = null
	}

	public render(): React.ReactNode {
		const { eventStore, history } = this.props
		const { visible, loading } = this.state

		const handleOk = async (): Promise<void> => {
			const { form } = this.formRef.props
			await form.validateFields(async (err: any, values: any) => {
				if (!err) {
					this.setState({ loading: { submit: true } })
					const newEvent = Object.assign(new Event(), {
						start: values.range[0].format('YYYY-MM-DD'),
						end: values.range[1].format('YYYY-MM-DD'),
						due: values.due ? values.due.format('YYYY-MM-DD') : '',
						can_apply: values.can_apply,
						title: values.title,
						description: values.description,
					})
					await eventStore
						.addEvent(newEvent)
						.then(() => {
							this.setState({
								loading: { submit: false },
								visible: false,
							})
							message.success('作成しました')
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
		const saveFormRef = (formRef: any) => {
			this.formRef = formRef
		}
		const handleClick = (e: any) => {
			e.stopPropagation()
			this.setState({ visible: true })
		}

		return (
			<div>
				<a onClick={handleClick}>新規イベント</a>
				<EventForm
					visible={visible}
					onCancel={handleCancel}
					onOk={handleOk}
					wrappedComponentRef={saveFormRef}
					loading={loading}
				/>
			</div>
		)
	}
}
