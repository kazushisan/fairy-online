import React, { useState, useCallback } from 'react'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
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

type Props = {
	userStore: UserStore
	history: History
}

export const LoginForm = ({
	userStore,
	history,
}: Props): React.ReactElement<{}> => {
	const [form] = Form.useForm()
	const [loading, setLoading] = useState<boolean>(false)

	const onFinish = useCallback(
		async values => {
			console.log(values)

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
		},
		[userStore, history, form]
	)

	return (
		<Form
			onFinish={onFinish}
			style={style.form}
			form={form}
			initialValues={{ user: 'general' }}
		>
			<Form.Item
				name="user"
				rules={[
					{
						required: true,
						message: 'ユーザ名を入力してください',
					},
				]}
			>
				<Input
					prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="ユーザ名"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: 'パスワードを入力してください',
					},
				]}
			>
				<Input
					prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
					type="password"
				/>
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
