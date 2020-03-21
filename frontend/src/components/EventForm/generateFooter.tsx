import React from 'react'
import { Button } from 'antd'

type Props = {
	title?: string
	onOk: () => void
	onCancel: () => void
	onDelete?: () => void
	loading: {
		submit: boolean
		delete?: boolean
	}
}

export function generateFooter({
	title,
	onOk,
	onCancel,
	onDelete,
	loading,
}: Props): React.ReactElement<{}>[] {
	const buttons = [
		<Button key="back" onClick={onCancel}>
			キャンセル
		</Button>,
		<Button
			key="submit"
			type="primary"
			onClick={onOk}
			loading={loading.submit}
		>
			{title ? '変更する' : '作成する'}
		</Button>,
	]

	if (typeof onDelete === 'function') {
		buttons.splice(
			1,
			0,
			<Button
				key="delete"
				type="danger"
				onClick={onDelete}
				loading={loading.delete}
			>
				イベントを削除
			</Button>
		)
	}

	return buttons
}
