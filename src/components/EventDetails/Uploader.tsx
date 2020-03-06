import { Button, Card, Icon } from 'antd'
import { History } from 'history'
import * as React from 'react'
import { File } from '../../entities/File'
import { handleError } from '../../services/handleError'
import { EventStore } from '../../stores/EventStore'

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
	width: '100%',
}
const style = {
	marginLeft: '8px',
}
export class Uploader extends React.Component<Props> {
	public state: State

	constructor(props: Props) {
		super(props)
		this.state = {
			file: new File(),
			uploading: false,
		}
	}

	public render() {
		const { eventStore, history } = this.props
		const { file, uploading } = this.state

		const handleFile = (e: any) => {
			const f = e.target.files[0]!
			const reader = new FileReader()
			reader.onload = (event: any) => {
				this.setState({
					file: {
						name: f.name,
						data: event.target.result,
						id: eventStore.generateID(),
					},
				})
			}
			reader.readAsDataURL(f)
		}
		const upload = async (
			e: React.MouseEvent<HTMLButtonElement>
		): Promise<void> => {
			e.stopPropagation()
			this.setState({ uploading: true })
			await eventStore
				.uploadFile(file)
				.catch(err => handleError({ err, history }))
			this.setState({ file: new File(), uploading: false })
		}
		return (
			<Card style={cardStyle}>
				{file.id === '' ? (
					<div
						style={{
							display: 'inline-block',
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
						<span>{file.name}</span>
						<Button
							type="primary"
							onClick={upload}
							disabled={uploading || file.id === ''}
							icon="upload"
							loading={uploading}
							style={style}
						>
							{uploading ? 'アップロード中...' : 'アップロード'}
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
