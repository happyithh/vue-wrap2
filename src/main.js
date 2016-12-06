import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import LS from 'assets/Libs/store.min'
import Vuex from 'vuex'
import configRouter from './config_router.js'
import Mint from 'mint-ui';
Vue.use(Mint);

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
            path: '/citys',
            component: (resolve) => require(['./components/home/citys'], resolve)
        },
        {
            path: '/form/askprice',
            component: (resolve) => require(['./components/form/askprice.vue'], resolve)
        },
        
        {
            path: '/event',
            component: (resolve) => require(['./components/event/event'], resolve)
        },
        {
            path: '/openshop',
            component: (resolve) => require(['./components/openshop/openshop'], resolve)
        },
        {
            path: '/openshop/search',
            component: (resolve) => require(['./components/openshop/searchlist'], resolve)
        },
        {
            path: '/openshop/form',
            component: (resolve) => require(['./components/openshop/form'], resolve)
        },
        {
            path: '/ip',
            component: (resolve) => require(['./components/ip/ip'], resolve)
        },
        {
            path: '/ip_advice',
            component: (resolve) => require(['./components/ip/ip_advice'], resolve)
        },
        {
            path: '/space',
            component: (resolve) => require(['./components/space/space-detail.vue'], resolve)
        },
        {
            path: '/form/leasehold',
            component: (resolve) => require(['./components/form/leasehold'], resolve)
        },
         {
            path: '/form/site',
            component: (resolve) => require(['./components/form/site'], resolve)
        },
        {
            path: '/form/collect',
            component: (resolve) => require(['./components/form/collect'], resolve)
        },
        {
            path: '/form/case-article',
            component: (resolve) => require(['./components/form/case-article'], resolve)
        },
       
        
    ]
})

window.store = new Vuex.Store({
    state:{
        cdVisible : false,
        cities:{},
        city_id : 1,
        selected_id : 1,
        searchCondition : {
            space_type : ''
        },
        loading : false,
        elDialog : {
            cdVisible : false,
            loginForm : false,
            regForm : false
        },
        spaceSearchCondition: {
            city_id : 1,
            project_type : '',
            doWhat : '',
            q : {
                site_site_type_eq : '',
                title_or_keyword_cont : ''
            }
        },
        inquiryCount : '',
        inquiryList: [],
        personalData : {
            uid:''
        },
        pageSize : 12
    },
    getters: {
        inquiryCount: state => {
            var inquiry =  LS.get('inquiry');
            if(inquiry){
                return inquiry.length
            }else{
                return ''
            }
        },
        inquiryList : () => {
            return LS.get('inquiry');
        },
        validationData(state){
            if(typeof state.personalData.client == 'undefined'){
                return {}
            }
            var e = {}
            e.uid = state.personalData.uid
            e['access-token'] = state.personalData.access_token
            e.client = state.personalData.client
            return e
        },
        city_id(){
            var selectedCityId = LS.get('selectedCity')
            if(selectedCityId){
                return selectedCityId
            }else{
                return 1
            }
        }

    },
    mutations : {
        searchCondition (state,value) {
            state.searchCondition = value
        },
        spaceSearchCondition(state,value){
            state.spaceSearchCondition = value
        },
        inquiryClear(state){
            LS.remove('inquiry')
            state.inquiryList = []
            state.inquiryCount = 0
        },
        inquiryChange(state,values){

            state.inquiryList =  LS.get('inquiry');

            if(!state.inquiryList){
                state.inquiryList = {}
            }

            if(typeof values === 'object'){

                if(values.type == 1){ // -1 减 , 1 加

                    state.inquiryList[values.id] = values.name

                }
                if(values.type == -1){
                    // 对象方式
                    // for(var i=0;i<state.inquiryList.length;i++)
                    // {
                    //     var id = state.inquiryList[i].id;
                    //     if(value.id==id)
                    //     {
                    //         state.inquiryList.splice(i,1);
                    //     }
                    // }
                    delete state.inquiryList[values.id]
                }

                if(values.type === 2){
                    if(state.inquiryList[values.id]){
                        delete state.inquiryList[values.id]
                    }else{
                        state.inquiryList[values.id] = values.name
                    }
                }

                LS.set('inquiry',state.inquiryList)
            }



            if(state.inquiryList){
                state.inquiryCount = countProperties(state.inquiryList)
            }else{
                state.inquiryCount = ''
            }
        },
        personalDataChange(state,value){
            state.personalData = value;
            LS.set('USER',value);
        },
        getPersonalData(state){
            var user = LS.get('USER');
            if(user){
                state.personalData = user
            }
        },
        loading(state,value){
            state.loading = value
        },
        cityChange(state,id){
            state.city_id = id
        },
        getSelectedCity(state){
            var selectedCityId = LS.get('selectedCity')
            if(selectedCityId){
                state.city_id = selectedCityId
            }else{
                state.city_id = 1
            }
        }
    },
    actions : {

    }
});

window.APP = new Vue({
    store,
    render: h => h(App),
    router: router

}).$mount('#app');