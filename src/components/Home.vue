<template>
	<div id="home">
		<div class="container">
			<div class="row justify-content-center align-items-center login-row">
				<div class="col-auto form-row">
					<div class="form-group col">
						<input type="password" class="form-control" placeholder="パスワード" v-model="data.password">
					</div>
					<div class="from-group col">
						<button class="btn btn-outline-primary" v-on:click="send">ログイン</button>
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

	const axios = require('axios')

	export default {
		data(){
			return {
				data: {
					pasword: ""
				}
			}
		},
		methods: {
			send: function(e){
				e.stopImmediatePropagation()
				axios.post('auth.php', this.data)
				.then(response => {
					const jwt = response.data.jwt
					console.log(response)
					window.sessionStorage.setItem('fairy_jwt', jwt)
					this.$router.push({ path: 'main' })
				}).catch(err => {
					console.log(err)
					alert(err.response.data.message)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
div.login-row{
	min-height: 400px;
}
</style>