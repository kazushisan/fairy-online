<template>
	<div id="home">
		<div class="sub-area"></div>
		<div class="main-area">
			<header class="global-header">
				<div>
					<h1>筑波大学体育会フェアリースキークラブ</h1>
					<ul>
						<li>
							<a href="#about">概要</a>
						</li>
						<li>
							<a href="#notice">お知らせ</a>
						</li>
						<li>
							<a href="#contact">連絡先</a>
						</li>
					</ul>
				</div>
			</header>
			<div class="main">
				<section id="about">
					<div>
						<header>
							<h2>フェアリースキークラブとは？</h2>
						</header>
						<div class="content">
							<p>筑波大学体育会に所属する基礎スキーサークルです。基礎スキーとは、スピードではなく滑りの美しさを競うスポーツです。学群生から院生まで、総勢30名近い規模です。 普段の活動の平均参加人数は10～20名程度でしょうか...活動は基本週2です。スキーシーズン中は合宿があります。すべての合宿を合わせて1シーズン15日ほどです。</p>
							<h3>活動内容</h3>
							<p>夏季: インラインスケート（火曜、金曜）
								<br>冬季: スキー合宿（土日、長期休暇中）
								<br>ほかにも、夏旅行など楽しく活動しています！
							</p>
						</div>
					</div>
				</section>
				<section id="contact">
					<div>
						<header>
							<h2>連絡先</h2>
						</header>
						<div class="content">
							<p>一年間を通して部員を募集しています！</p>
							<p>連絡は
								<a href="http://twitter.com/fairyskiclub">Twitter</a>またはfairy.info[at]gmail.comまで。
							</p>
						</div>
					</div>
				</section>
				<section id="login">
					<div>
						<header>
							<h2>FOM: Fairy Online Managerにログイン</h2>
						</header>
						<div class="content">
							<input type="password" name id v-model="data.password" placeholder="パスワード">
							<input type="submit" value="ログイン" v-on:click="send">
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
const axios = require('axios')

export default {
	data() {
		return {
			data: {
				pasword: ''
			}
		}
	},
	methods: {
		send: function(e) {
			e.stopImmediatePropagation()
			axios
				.post('auth.php', this.data)
				.then(response => {
					const jwt = response.data.jwt
					console.log(response)
					window.sessionStorage.setItem('fairy_jwt', jwt)
					this.$router.push({ path: 'main' })
				})
				.catch(err => {
					console.log(err)
					alert(err.response.data.message)
				})
		}
	}
}
</script>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p,
li {
	font-size: 16px;
	line-height: 1.5;
	font-weight: normal;
}
h1,
h2,
h3,
h4,
h5,
h6 {
	font-weight: bold;
}
.global-header {
	max-width: 600px;
	margin: 0 auto;
	& > div {
		display: flex;
		justify-content: space-between;
		margin: 24px 16px;
		flex-wrap: wrap;
	}
	h1 {
		margin: 0;
		padding: 0;
		flex-basis: auto;
		flex-grow: 0;
		flex-shrink: 0;
	}
	ul {
		font-size: 0;
		margin: 0;
		padding: 0;
		flex-basis: auto;
		flex-grow: 0;
		flex-shrink: 0;
	}
	li {
		font-size: 1rem;
		list-style-type: none;
		display: inline-block;
		margin: 0 0 0 1em;
		&:first-of-type {
			margin-left: 0;
		}
	}
}
div.main {
	margin: 48px 0;
}
input[type='password'] {
	display: inline-block;
	border: none;
	font-size: 16px;
	line-height: 1.5;
	padding: 8px 16px;
	border-radius: 20px;
	background-color: #eee;
	margin: 1em 0;
	outline: none;
}
input[type='submit'] {
	display: inline-block;
	border: none;
	font-size: 14px;
	line-height: 1.5;
	padding: 8px 16px;
	border-radius: 20px;
	background-color: #007bff;
	margin: 1em 0;
	color: #fff;
	outline: none;
}
section > div {
	margin: 24px 16px;
}
section {
	margin: 0 auto;
	max-width: 600px;
}
div.sub-area {
	height: 50vh;
	background-image: url('../assets/cover.jpg');
	background-position: center;
	background-size: cover;
}
@media screen and (min-width: 800px) {
	div#home {
		position: relative;
		div.sub-area {
			width: 50vw;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
		}
		div.main-area {
			width: 50vw;
			position: relative;
			margin-left: 50vw;
			min-height: 100vh;
			overflow: hidden;
		}
	}
}
</style>