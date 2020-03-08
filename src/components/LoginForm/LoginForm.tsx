import React, { useState, useCallback } from 'react'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { FormComponentProps } from 'antd/lib/form'
import { History } from 'history'
import { parse } from 'query-string'
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

type Props = FormComponentProps & {
	userStore: UserStore
	history: History
}

export const LoginForm = Form.create<Props>()(
	({ userStore, history, form }: Props): React.ReactElement<{}> => {
		const [loading, setLoading] = useState<boolean>(false)

		const handleSubmit = useCallback(
			async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
				e.preventDefault()
				await new Promise(resolve =>
					form.validateFields(async (error, values) => {
						if (!error) {
							setLoading(true)
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
									setLoading(false)
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
			},
			[userStore, history, form]
		)

		const { getFieldDecorator } = form

		return (
			<Form onSubmit={handleSubmit} style={style.form}>
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
							prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
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
							prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
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
)
