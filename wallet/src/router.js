import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/send/:address/:amount/:text',
            name: 'send',
            component: () =>
                import ('./views/Send.vue')
        },
        {
            path: '/success',
            name: 'success',
            component: () =>
                import ('./views/Success.vue')
        }

    ]
})