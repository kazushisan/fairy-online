import { Button, Card, Icon } from 'antd'
import * as React from 'react'
import { File } from '../../entities/File'
import { EventStore } from '../../stores/EventStore'
import { History } from 'history'
import { handleError } from '../../services/handleError'

interface Props {
	eventStore: EventStore
	history: History
}
interface State {
	file: File
	uploading: boolean
}

const cardStyle = {
	margin: '24px 0 0 0',
	width: '100%'
}
const style = {
	marginLeft: '8px'
}
export class Uploader extends React.Component<Props> {
	public state: State
	constructor(props: Props) {
		super(props)
		this.state = {
			file: new File(),
			uploading: false
		}
	}
	public render() {
		const { eventStore, history } = this.props
		const handleFile = (e: any) => {
			const file = e.target.files[0]!
			const reader = new FileReader()
			reader.onload = (event: any) => {
				this.setState({
					file: {
						name: file.name,
						data: event.target.result!,
						id: eventStore.generateID()
					}
				})
			}
			reader.readAsDataURL(file)
		}
		const upload = async (e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation()
			this.setState({ uploading: true })
			await eventStore.uploadFile(this.state.file).catch(err => handleError({ err, history }))
			this.setState({ file: new File(), uploading: false })
		}
		return (
			<Card style={cardStyle}>
				{this.state.file.id === '' ? (
					<div
						style={{
							display: 'inline-block'
						}}
					>
						<label htmlFor="select-file">
							<Icon type="upload" />
							ファイルを選択
						</label>
						<input
							type="file"
							id="select-file"
							onChange={handleFile}
							style={{ display: 'none' }}
						/>
					</div>
				) : (
					<div>
						<span>{this.state.file.name}</span>
						<Button
							type="primary"
							onClick={upload}
							disabled={
								this.state.uploading ||
								this.state.file.id === ''
							}
							icon="upload"
							loading={this.state.uploading}
							style={style}
						>
							{this.state.uploading
								? 'アップロード中...'
								: 'アップロード'}
						</Button>
						<Button
							onClick={() => this.setState({ file: new File() })}
							style={style}
						>
							キャンセル
						</Button>
					</div>
				)}
			</Card>
		)
	}
}
