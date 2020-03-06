import { Button, Form, Icon, Input, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { History } from 'history'
import { parse } from 'query-string'
import * as React from 'react'
import { UserStore } from '../../stores/UserStore'

const style = {
	form: {
		maxWidth: '300px',
		margin: '16px',
	},
	loginButton: {
		width: '100%',
	},
}
interface State {
	loading: boolean
}
interface Props extends FormComponentProps {
	userStore: UserStore
	history: History
}
// eslint-disable-next-line @typescript-eslint/class-name-casing
class _LoginForm extends React.Component<Props, State> {
	public state: State = {
		loading: false,
	}

	constructor(props: Props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	public async handleSubmit(
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		e.preventDefault()
		const { userStore, history, form } = this.props
		await new Promise(resolve =>
			form.validateFields(async (error, values) => {
				if (!error) {
					this.setState({ loading: true })
					await userStore
						.login(values)
						.then(() => {
							message.success('ログインしました')
							const { redirect } = parse(history.location.search)
							if (redirect) {
								history.push(decodeURIComponent(redirect as string))
							} else {
								history.push('/~fairyski/main')
							}
						})
						.catch(err => {
							this.setState({ loading: false })
							if (err.status === 400) {
								message.error('ユーザ情報が正しくありません。')
							} else {
								const text = err.data.message || 'Unknown Error'
								const { status } = err
								message.error(`${status}: ${text}`)
							}
						})
					resolve()
				}
			})
		)
	}

	public render(): React.ReactElement<any> {
		const {
			form: { getFieldDecorator },
		} = this.props

		const { loading } = this.state
		return (
			<Form onSubmit={this.handleSubmit} style={style.form}>
				<Form.Item>
					{getFieldDecorator('user', {
						rules: [
							{
								required: true,
								message: 'ユーザ名を入力してください',
							},
						],
						initialValue: 'general',
					})(
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="ユーザ名"
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'パスワードを入力してください',
							},
						],
					})(
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
						/>
					)}
				</Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					style={style.loginButton}
					loading={loading}
					disabled={loading}
				>
					ログイン
				</Button>
			</Form>
		)
	}
}

export const LoginForm = Form.create()(_LoginForm) as any
