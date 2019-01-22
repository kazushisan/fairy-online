'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Main from './components/Main.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@fortawesome/fontawesome-free/js/all.js'
Vue.use(Router)

const router = new Router({
	mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
		{
			path: '/main',
			component: Main
		}
    ]
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})