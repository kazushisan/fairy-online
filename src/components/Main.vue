<template>
	<div id="main">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-8 col-lg-6">
					<div class="card">
						<div class="card-header">
						<ul class="nav nav-tabs card-header-tabs">
							<li class="nav-item">
								<a v-bind:class="{'nav-link': true, active: cal_active}" v-on:click="cal_active = true">カレンダー</a>
							</li>
							<li class="nav-item">
								<a v-bind:class="{'nav-link': true, active: !cal_active}" v-on:click="cal_active = false">予定一覧</a>
							</li>
						</ul>
						</div>
						<div class="card-body">
							<div id="calendar" v-show="cal_active"></div>
							<div id="calendarlist" v-show="!cal_active"></div>
						</div>
					</div>
					<div class="card" v-if="is_admin">
						<div class="card-header">
							イベントを追加
						</div>
						<div class="card-body">
							<div class="form-group">
								<label for="addtitle">タイトル</label>
								<input type="text" class="form-control" id="addtitle" v-model="add_event.title">
							</div>
							<div class="form-group">
								<label for="adddescription">説明</label>
								<input type="text" class="form-control" id="adddescription" v-model="add_event.description">
							</div>	
							<div class="form-row">
								<div class="form-group col-md-6">
									<label for="addstart">開始</label>
									<input type="text" class="form-control" id="addstart" v-model="add_event.start">
								</div>	
								<div class="form-group col-md-6">
									<label for="addend">終了(1日後を指定してください)</label>
									<input type="text" class="form-control" id="addend" v-model="add_event.end">
								</div>
							</div>
							<div class="form-row">
								<div class="form-group col-md-6">
									<label for="adddue">参加申請締切</label>
									<input type="text" class="form-control" id="adddue" v-model="add_event.due">
								</div>
								<div class="from-group col-md-6">
									<div class="form-check">
										<input class="form-check-input" type="checkbox" v-model="add_event.can_apply" id="addcan_apply">
										<label class="form-check-label" for="addcan_apply">参加受付</label>
									</div>
								</div>

							</div>

							<button class="btn btn-primary" v-on:click="addEvent">追加する</button>
						</div>
					</div>
				</div>
				<div class="col-md-8 col-lg-6"  v-if="Object.keys(event).length > 0">
					<div class="card" v-if="is_admin">
						<div class="card-header">
							イベントを編集する
						</div>
						<div class="card-body">
							<div class="form-group">
								<label for="edittitle">タイトル</label>
								<input type="text" class="form-control" id="edittitle" v-model="edit_event.title">
							</div>
							<div class="form-group">
								<label for="editdescription">説明</label>
								<input type="text" class="form-control" id="editdescription" v-model="edit_event.description">
							</div>	
							<div class="form-row">
								<div class="form-group col-md-6">
									<label for="editstart">開始</label>
									<input type="text" class="form-control" id="editstart" v-model="edit_event.start">
								</div>	
								<div class="form-group col-md-6">
									<label for="editend">終了(1日後を指定してください)</label>
									<input type="text" class="form-control" id="editend" v-model="edit_event.end">
								</div>
							</div>
							<div class="form-row">
								<div class="form-group col-md-6">
									<label for="editdue">参加申請締切</label>
									<input type="text" class="form-control" id="editdue" v-model="edit_event.due">
								</div>
								<div class="from-group col-md-6">
									<div class="form-check">
										<input class="form-check-input" type="checkbox" v-model="edit_event.can_apply" id="editcan_apply">
										<label class="form-check-label" for="editcan_apply">参加受付</label>
									</div>
								</div>
							</div>
							<button class="btn btn-primary" v-on:click="editEvent">変更する</button>
							<button class="btn btn-danger" v-on:click="removeEvent">イベントを削除する</button>
						</div>
					</div>
					<div class="card" v-else>
						<div class="card-header">
							イベント概要
						</div>
						<div class="card-body">
							<h3 class="card-title">
								{{ event.title }}
							</h3>
							<p class="card-text">
								開始: {{event.start}}<br>
								終了: {{ event.end ? dayBefore(event.end) : event.start }}
							</p>
							<p class="card-text">
								{{ event.description }}
							</p>
						</div>
					</div>
					<div class="card">
						<div class="card-header">
							イベント資料
						</div>
						<div class="card-body">
								<form v-if="is_admin">
									<div class="form-group">
										<label for="inputfile" class="btn btn-light">ファイルを選択</label>
										<input type="file" class="d-none" id="inputfile" v-on:change="handleFile">
										<span v-if="file.name">{{ file.name }}</span>
									</div>
									<div class="form-group" v-if="this.file.name">
										<button class="btn btn-primary" v-on:click="addFile">アップロード</button>
									</div>
								</form>
								<ul class="list-group"  v-if="event.files && event.files.length > 0">
									<li class="list-group-item" v-for="file in event.files" v-bind:key="file.id">
										<span v-on:click="removeFile(file, $event)" class="float-right" v-if="is_admin">
											 <i class="fas fa-trash"></i>
										</span>
										<span  v-on:click="download(file)">
											{{ file.name }}
										</span>
									</li>
								</ul>
								<span v-else>
									資料はありません。
								</span>
						</div>
					</div>
					<div class="card"  v-if="event.participants">
						<div class="card-header">
							イベントに参加
							<span v-if="event.due" class="text-danger">
								申請締切: {{ event.due }}
							</span>
						</div>
						<div class="card-body">
							<table class="table table-bordered">
								<thead>
									<tr>
										<th>氏名</th>
										<th>年次</th>
										<th>性別</th>
										<th>年齢</th>
										<th>車出し</th>
										<th>備考</th>
										<th v-if="event.can_apply">削除</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="!event.participants || event.participants.length == 0"><td  v-bind:colspan="event.can_apply ? 7 : 6" class="text-center">なし</td></tr>
									<tr v-for="participant in event.participants" v-bind:key="participant.id">
										<td>{{ participant.name }}</td>
										<td>{{ participant.year }}</td>
										<td>{{ participant.sex }}</td>
										<td>{{ participant.age }}</td>
										<td>{{ participant.can_drive ? "はい" : "いいえ"}}</td>
										<td>{{ participant.note }}</td>
										<td v-if="event.can_apply" v-on:click="removeParticipant(participant.id, $event)">
											 <i class="fas fa-trash"></i>
										</td>
									</tr>
								</tbody>
							</table>
							<form v-if="event.can_apply">
								<div class="form-row">
									<div class="form-group col-md-6">
										<label for="inputname">{{ label.name }}</label>
										<input type="text" class="form-control" id="inputname" v-model="add_participant.name" v-bind:placeholder="label.name">
									</div>
									<div class="form-group col-md-2">
										<label for="inputyear">{{ label.year }}</label>
										<select type="text" id="inputyear" class="form-control" v-model="add_participant.year" v-bind:placeholder="label.year">
											<option v-for="item in label.year_list" v-bind:key="item">{{ item }}</option>
										</select>
									</div>
									<div class="form-group col-md-2">
										<label for="inputsex">{{ label.sex }}</label>
										<select type="text" id="inputsex" v-model="add_participant.sex" class="form-control" v-bind:placeholder="label.sex">
											<option>M</option>
											<option>F</option>
										</select>
									</div>
									<div class="form-group col-md-2">
										<label for="inputage">{{ label.age }}</label>
										<input type="text" v-model="add_participant.age" class="form-control" id="inputage" v-bind:placeholder="label.age">
									</div>
								</div>
								<div class="form-check">
									<input class="form-check-input" type="checkbox" v-model="add_participant.can_drive" id="can_drive">
									<label class="form-check-label" for="can_drive">車出しできますか？</label>
								</div>
								<div class="form-group">
									<label for="inputnote">{{ label.note }}</label>
									<textarea v-bind="add_participant.note" id="inputnote" class="form-control" rows="3"></textarea>
								</div>
								<button class="btn btn-primary" v-on:click="addParticipant">送信</button>
							</form>
						</div>
					</div>
				</div>
				<div class="col-md-8 col-lg-6" v-else>
					<div class="card">
						<div class="card-header">
							イベント
						</div>
						<div class="card-body">
							<p class="card-text">カレンダーから予定を選択してください。</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import 'bootstrap'
	import '@fortawesome/fontawesome-free/js/all.js'
	import 'fullcalendar'
	import 'fullcalendar/dist/fullcalendar.css'

	const axios = require('axios')

	export default {
		data(){
			return {
				file: {
					id: "",
					data: "",
					name: ""
				},
				label: 	{
					"name": "氏名",
					"year": "年次",
					"year_list": [
						"B1",
						"B2",
						"B3",
						"B4",
						"M1",
						"M2",
						"その他"
					],
					"sex": "性別",
					"age": "年齢",
					"can_drive": "車出し",
					"note": "備考",
				},
				add_participant: {
					"id": "",
					"name": "",
					"year": "",
					"sex": "",
					"age": 0,
					"can_drive": false,
					"note": ""
				},
				event: {},
				edit_event: {
					"id": "",
					"title": "",
					"start": "",
					"end": "",
					"description": "",
					"can_apply": false,
					"due": "",
					"participants": [],
					"files": []
				},
				add_event: {
					"id": "",
					"title": "",
					"start": "",
					"end": "",
					"description": "",
					"can_apply": false,
					"due": "",
					"participants": [],
					"files": []
				},
				events: [],
				cal_active: true,
				is_admin: false
			}
		},
		mounted(){
			const jwt = window.sessionStorage.getItem('fairy_jwt')
			if(!jwt) this.$router.push({ path: '/' })


			const token_data =jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
			this.is_admin = JSON.parse(atob(token_data)).user === 'admin'
			axios.get('api.php', {
          			headers: { Authorization: "Bearer " + jwt }
				})
			.then(response => {
				this.events = response.data
			}).catch(err => {
				alert(err.response.data.message)

				window.sessionStorage.removeItem('fairy_jwt')
				this.$router.push({ path: '/' })
			}).finally(() => {
				$('#calendar').fullCalendar({
					themeSystem: 'bootstrap4',
					height: "auto",
					eventSources: this.eventSources,
					eventClick: this.eventClick
				})
				$('#calendarlist').fullCalendar({
					themeSystem: 'bootstrap4',
					defaultView: 'listYear',
					eventSources: this.eventSources,
					eventClick: this.eventClick
				})
			})
		},
		computed: {
			eventSources: function(){
				return [
					{
						events: this.events,
						color: "#007bff"
					},
					{
						events: this.deadlines,
						color: "#dc3545"
					}
				]
			},
			deadlines: function(){
				let deadlines = []
				for(event of this.events){
					if(event.due){
						deadlines.push({
							"title": event.title + '参加申請期限',
							"start": event.due,
							"original_id": event.id
						})
					}
				}
				return deadlines
			}
		},
		methods: {
			download: function(file){
				const jwt = window.sessionStorage.getItem('fairy_jwt')
				axios.get(`/api.php?file=` + file.id,
					{
						headers: { Authorization: "Bearer " + jwt },
						responseType: 'blob'
					}
				).then(response => {
					console.log(response)
					const url = window.URL.createObjectURL(new Blob([response.data]));
					const link = document.createElement('a')
					link.href = url
					link.setAttribute('download', file.name)
					document.body.appendChild(link)
					link.click()
				}).catch(err => {
					alert('failed to retrive data')
				})
			},
			handleFile: function(e){
				const file = e.target.files[0]
				const reader = new FileReader()
				reader.onload = e => {
					this.file.name = file.name
					this.file.data = e.target.result
					this.file.id = this.generateID()
				};
				reader.readAsDataURL(file)
			},
			dayBefore: function(date){
				const dt = new Date(date)
				dt.setDate(dt.getDate() - 1)
				const year = String(dt.getFullYear())
				const month = ('0' + String(dt.getMonth() +1)).slice(-2)
				const day = ('0' + String(dt.getDate())).slice(-2)
				return year + '-' + month + '-' + day
			},
			generateID: function(){
				const len = 20;
				// 生成する文字列に含める文字セット
				const char = "abcdefghijklmnopqrstuvwxyz0123456789"
				let result = ""
				for(var i=0; i<len; i++){
					result += char[Math.floor(Math.random()*char.length)];
				}
				return result
			},
			getEvents: function(response){
				this.events = response.data
				if(this.event && this.event.id){
					const i = this.events.findIndex(item => item.id === this.event.id)
					this.event = this.events[i]
					this.edit_event = {
						"id": "",
						"title": "",
						"start": "",
						"end": "",
						"description": "",
						"can_apply": false,
						"due": "",
						"participants": [],
						"files": []
					}
					for(const key in this.events[i]){
						this.edit_event[key] = this.events[i][key]
					}
				}
			},
			reloadCalendar: function(){
				$('#calendar').fullCalendar("removeEvents")
				$('#calendarlist').fullCalendar("removeEvents")

				for(const item of this.eventSources){
					console.log(item)
					$('#calendar').fullCalendar("addEventSource", item)
					$('#calendarlist').fullCalendar("addEventSource", item)
				}
			},
			eventClick: function(event){
				const event_id = event.original_id || event.id
				const i = this.events.findIndex((item) => item.id === event_id)
				this.event = this.events[i]
				for(const key in this.events[i]){
					this.edit_event[key] = this.events[i][key]
				}
			},
			removeParticipant: function(id, e){
				e.stopImmediatePropagation()
				const jwt = window.sessionStorage.getItem('fairy_jwt')

				axios.post(
					'api.php',
					{
						type: "remove_participant",
						participant_id: id,
						event_id: this.event.id
					},
					{
          				headers: { Authorization: "Bearer " + jwt }	
					}
				)
				.then(response => {
					this.getEvents(response)
				})
				.catch(err => {
					alert(err.response.data.message)
				}).finally(() => {
					this.reloadCalendar()
				})
			},
			removeFile: function(file, e){
				e.stopImmediatePropagation()

				const jwt = window.sessionStorage.getItem('fairy_jwt')

				axios.post(
					'api.php',
					{
						type: "remove_file",
						file_id: file.id,
						event_id: this.event.id
					}, 
					{
          				headers: { Authorization: "Bearer " + jwt }
					}
				)
				.then(response => {
					this.getEvents(response)
				})
				.catch(err => {
					alert(err.response.data.message)
				}).finally(() => {
					this.reloadCalendar()
				})
			},
			addFile: function(e){
				e.stopImmediatePropagation()

				const jwt = window.sessionStorage.getItem('fairy_jwt')

				axios.post(
					'api.php',
					{
						type: "add_file",
						file: this.file,
						event_id: this.event.id
					}, 
					{
          				headers: { Authorization: "Bearer " + jwt }
					}
				)
				.then(response => {
					this.getEvents(response)
				})
				.catch(err => {
					alert(err.response.data.message)
				}).finally(() => {
					this.reloadCalendar()
				})
			},
			addParticipant: function(e){
				e.stopImmediatePropagation()
				this.add_participant.id = this.generateID()
				const jwt = window.sessionStorage.getItem('fairy_jwt')

				axios.post(
					'api.php',
					{
						type: "add_participant",
						data: this.add_participant,
						event_id: this.event.id
					}, 
					{
          				headers: { Authorization: "Bearer " + jwt }
					}
				)
				.then(response => {
					this.getEvents(response)
					this.add_participant = {
						"id": "",
						"name": "",
						"year": "",
						"sex": "",
						"age": 0,
						"can_drive": false,
						"note": ""					
					}
				})
				.catch(err => {
					alert(err.response.data.message)
				}).finally(() => {
					this.reloadCalendar()
				})
			},
			editEvent: function(e){
				e.stopImmediatePropagation()
				const jwt = window.sessionStorage.getItem('fairy_jwt')
				const edit_event = {}
				for(const key in this.edit_event){
					if(this.edit_event[key]){
						edit_event[key] = this.edit_event[key]
					}
				}
				axios.post(
					'api.php',
					{
						type: "edit_event",
						data: edit_event,
						event_id: this.edit_event.id
					}, 
					{
          				headers: { Authorization: "Bearer " + jwt }
					}
				)
				.then(response => {
					this.getEvents(response)
				})
				.catch(err => {
					alert(err.response.data.message)
				}).finally(() => {
					this.reloadCalendar()
				})
			},
			addEvent: function(e){
				e.stopImmediatePropagation()
				const jwt = window.sessionStorage.getItem('fairy_jwt')
				const add_event = {}
				for(const key in this.add_event){
					if(this.add_event[key]){
						add_event[key] = this.add_event[key]
					}
				}
				add_event.id = this.generateID()
				axios.post(
					'api.php',
					{
						type: "add_event",
						data: add_event,
					}, 
					{
          				headers: { Authorization: "Bearer " + jwt }
					}
				)
				.then(response => {
					this.events = response.data
					this.event = {}
					this.edit_event = {
						"id": "",
						"title": "",
						"start": "",
						"end": "",
						"description": "",
						"can_apply": false,
						"due": "",
						"participants": [],
						"files": []
					}
					this.add_event = {
						"id": "",
						"title": "",
						"start": "",
						"end": "",
						"description": "",
						"can_apply": false,
						"due": "",
						"participants": [],
						"files": []
					}
				})
				.catch(err => {
					alert(err.response.data.message)
				}).finally(() => {
					this.reloadCalendar()
				})
			},
			removeEvent: function(e){
				e.stopImmediatePropagation()
				const jwt = window.sessionStorage.getItem('fairy_jwt')
				axios.post(
					'api.php',
					{
						type: "remove_event",
						event_id: this.edit_event.id
					}, 
					{
          				headers: { Authorization: "Bearer " + jwt }
					}
				)
				.then(response => {
					this.events = response.data
					this.event = {}
					this.edit_event = {
						"id": "",
						"title": "",
						"start": "",
						"end": "",
						"description": "",
						"can_apply": false,
						"due": "",
						"participants": [],
						"files": []
					}
				})
				.catch(err => {
					alert(err.response.data.message)
				}).finally(() => {
					this.reloadCalendar()
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
div.card{
	margin-bottom: 30px;
}
</style>
