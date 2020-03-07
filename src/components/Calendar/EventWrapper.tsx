import React, { useMemo } from 'react'
import { Button } from 'antd'
import { EventWrapperProps } from 'react-big-calendar'
import { Event } from '../../entities/Event'

type Props = EventWrapperProps<Event> & {
	children: React.ReactNode
}

export const EventWrapper = ({ children }: Props): React.ReactElement<{}> => {
	const originalButton = React.Children.only(children)
	const title = React.Children.only(originalButton.props.children).props
		.title as string

	const className = useMemo(() => {
		const list = originalButton.props.className
			.split(' ')
			.filter((item: string) => {
				return (
					item === 'rbc-event-continues-prior' ||
					item === 'rbc-event-continues-after'
				)
			})

		if (title.match(/申請期限$/)) {
			list.push('calendar-due-event')
		}

		return list.join(' ')
	}, [originalButton, title])

	return (
		<Button
			onClick={originalButton.props.onClick}
			onDoubleClick={originalButton.props.onDoubleClick}
			className={className}
			type="primary"
			style={{
				textAlign: 'left',
				width: '100%',
			}}
			size="small"
		>
			{originalButton.props.children}
		</Button>
	)
}
