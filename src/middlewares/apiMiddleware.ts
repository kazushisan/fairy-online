import { MiddlewareAPI, Dispatch } from 'redux'

export const API_MIDDLEWARE_ACTION = 'API_MIDDLEWARE_ACTION'

export function apiActionCreator<T>(promise: Promise<T>) {
	return (type: string) => ({
		type: API_MIDDLEWARE_ACTION,
		payload: promise,
		meta: {
			type,
		},
	})
}

export default function apiMiddleware({ dispatch }: MiddlewareAPI) {
	return (next: Dispatch) => (action: any) => {
		if (action.type !== API_MIDDLEWARE_ACTION) {
			return next(action)
		}

		dispatch({
			type: `${action.type}_START`,
			payload: null,
		})

		return action
			.payload()
			.then(data => {
				dispatch({
					type: `${action.type}_SUCCESS`,
					payload: data,
				})
			})
			.catch(err => {
				dispatch({
					type: `${action.type}_FAILURE`,
					payload: err,
					error: true,
				})
			})
	}
}
