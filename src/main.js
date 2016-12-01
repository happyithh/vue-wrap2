import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import LS from 'assets/Libs/store.min'
import Vuex from 'vuex'
import configRouter from './config_router.js'

Vue.use(VueRouter);
Vue.use(Vuex);
window.LS = LS

window.router = new VueRouter({
    mode: 'history',
    base: __dirname,
    // history: true,
    saveScrollPosition: false,
    scrollBehavior (to, from, savedPosition) {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/',
            component: (resolve) => require(['./components/home/home'], resolve)
        },
        {
            path: '/askprice',
            component: (resolve) => require(['./components/askprice/askprice.vue'], resolve)
        },
        {
            path: '/event',
            component: (resolve) => require(['./components/event/event'], resolve)
        },
    ]
})

window.bus = new Vue()

window.APP = new Vue({
            render: h => h(App),
        router: router

}).$mount('#app');