<template>
	<div id="app">
		<nav class="nabbar navbar-expand-md navbar-light bg-light mb-5 p-3">
			<div class="container">
				<button class="btn btn-outline-primary float-right" v-if="$route.path == '/main'" v-on:click="logout">ログアウト</button>
				<a href="" class="navbar-brand">FOM: Fairy Online Manager</a>
				<span class="navbar-text">筑波大学体育会フェアリースキークラブオンライン管理システム</span>
			</div>
		</nav>
		<router-view></router-view>
	</div>
</template>

<script>
	import $ from 'jquery'
	import 'bootstrap'
	import '@fortawesome/fontawesome-free/js/all.js'
	export default {
		methods: {
			logout: function(){
				window.sessionStorage.removeItem('fairy_jwt')
				this.$router.push({ path: '/' })
			}
		}
	}
</script>

<style lang="scss">
</style>