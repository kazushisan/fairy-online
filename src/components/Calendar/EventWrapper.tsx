import { Button } from 'antd'
import * as React from 'react'
import { EventWrapperProps } from 'react-big-calendar'

// const Button = styled.div`
// 	width: 100%;
// `


export class EventWrapper extends React.Component<EventWrapperProps> {
	public render() {
		const originalButton = React.Children.only(this.props.children)
		const title = React.Children.only(originalButton.props.children).props
			.title as string
		let classes = originalButton.props.className
			.split(' ')
			.filter((item: string) => {
				return (
					item === 'rbc-event-continues-prior' ||
					item === 'rbc-event-continues-after'
				)
			})
			.join(' ')
		if(title.match(/申請期限$/)) { 
			classes += ' calendar-due-event'
		}
		return (
			<Button
				onClick={originalButton.props.onClick}
				onDoubleClick={originalButton.props.onDoubleClick}
				className={classes}
				type='primary'
				style={{
					textAlign: 'left',
					width: '100%'
				}}
				size="small"
			>
				{originalButton.props.children}
			</Button>
		)
	}
}
