type method = "post" | "get" | "delete" | "patch" | "put"
interface option {
	method: method,
	contentType: string,
	payload: string,
	headers?: {
		Authorization: string
	}
}
const baseUrl: string = "https://www.stb.tsukuba.ac.jp/~fairyski/"

const getEvents = ():{events: any, jwt: string} => {
	const auth: {password: string} = {
		password: 'fairyski2018'
	}
	const option: option = {
		method: 'post',
		contentType: 'application/json',
		payload: JSON.stringify(auth)
	}
	let response = UrlFetchApp.fetch(baseUrl + 'auth.php', option)

	const jwt = JSON.parse(response.getContentText("UTF-8")).jwt
	response = UrlFetchApp.fetch(baseUrl + 'api.php', {
		headers: {
			Authorization: "Bearer " + jwt
		}
	})
	return {events: JSON.parse(response.getContentText("UTF-8")), jwt}
}

const diffDays = (day: Date):number => {
	const today = new Date()
	const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000
	return Math.ceil((day.getTime() - today.getTime())/MILLISECONDS_PER_DAY)
}

function notification():void{
	const {events, jwt} = getEvents()
	events.forEach(event => {
		const diff = diffDays(new Date(event.due))
		if(diff === 0){
			if(event.can_apply){
				event.can_apply = false
				const participants = event.participants.map(participant => participant.name).join(", ")
				MailApp.sendEmail({
					to: "fairyski@freeml.com",
					subject: `【フェアリースキークラブ】お知らせ: ${event.title}の参加申請を締め切りました`,
					htmlBody: `
					<html>
					<body style="font-family: sans-serif; font-size: 14px; line-height: 1.5;">
					<div style="padding: 60px; margin: 60px auto; border-radius: 8px; border: 1px #eee solid; width: 300px;">
					<h3 style="font-size: 20px;">FOM: Fairy Online Manager 筑波大学体育会フェアリースキークラブオンライン管理システム</h3>
					<h1 style="font-size: 24px;">お知らせ: ${event.title}の参加申請を締め切りました</h1>
					<p>${event.title}の締め切りは${event.due}でしたので、このメールをもって参加を締め切ります。参加者は次の通りです。（敬称略）</p>
					<p>${participants}</p>
					</div>
					<p style="text-align: center; font-size:12px;">このメールは自動で送信されています</p>
					</body>
					</html>
					`
				})
				const option: option = {
					method: 'post',
					contentType: 'application/json',
					payload: JSON.stringify({
						type: "edit_event",
						data: event,
						event_id: event.id
					}),
					headers: {
						Authorization: "Bearer " + jwt
					}
				}
				UrlFetchApp.fetch(baseUrl + 'api.php', option).getResponseCode()
			}
		} else if (diff === 1 || diff === 3){
			MailApp.sendEmail({
				to: "fairyski@freeml.com",
				subject: `【フェアリースキークラブ】リマインダー: ${event.title}の締め切りが近づいています`,
				htmlBody: `
				<html>
				<body style="font-family: sans-serif; font-size: 14px; line-height: 1.5;">
				<div style="padding: 60px; margin: 60px auto; border-radius: 8px; border: 1px #eee solid; width: 300px;">
				<h3 style="font-size: 20px;">FOM: Fairy Online Manager 筑波大学体育会フェアリースキークラブオンライン管理システム</h3>
				<h1 style="font-size: 24px;">リマインダー: ${event.title}の締め切りが近づいています</h1>
				<p>${event.title}の締め切りは${event.due}です。参加を希望でまだ申請をされていない方は、<a href="${baseUrl}">FOM</a>より申請を行ってください。</p>
				</div>
				<p style="text-align: center; font-size:12px;">このメールは自動で送信されています</p>
				</body>
				</html>
				`
			})
		}
	})
}