import { message } from 'antd'
import { History } from 'history'

interface Props {
	err: any
	history: History
}

export const handleError = (props: Props) => {
	const { err, history } = props
	if (err.noJwt) {
		message.warning('ログインしてください。')
		const redirect = encodeURIComponent(history.location.pathname)
		history.push(`/login?redirect=${redirect}`)
	} else if (err.status === 400) {
		message.warning('セッションの有効期限が切れました。')
		const redirect = encodeURIComponent(history.location.pathname)
		history.push(`/login?redirect=${redirect}`)
	} else {
		const status = err.status || 'Internal Error'
		const text =
			err.data && err.data.message ? err.data.message : 'Unknown Error'
		console.log(err)
		message.error(`${status}: ${text}`)
	}
}
