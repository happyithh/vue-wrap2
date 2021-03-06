import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import LS from 'assets/libs/store'
import Vuex from 'vuex'
import configRouter from './config_router.js'
import Mint from 'mint-ui';
Vue.use(Mint);
//import  CellSwipe  from 'mint-ui';
//Vue.component(CellSwipe.name, Cell);
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
            path: '/city',
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
            path: '/article/:id',
            component: (resolve) => require(['./components/event/article'], resolve)
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
            path: '/ip/consult',
            component: (resolve) => require(['./components/ip/ip_advice'], resolve)
        },
        {
            path: '/space/detail/:id',
            component: (resolve) => require(['./components/space/space-detail.vue'], resolve)
        },
        {
            path: '/place',
            component: (resolve) => require(['./components/place/place_list.vue'], resolve)
        },
        {
            path: '/place/search',
            component: (resolve) => require(['./components/place/searchlist.vue'], resolve)
        },
        {
            path: '/place/detail/:id',
            component: (resolve) => require(['./components/place/place_detail.vue'], resolve)
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
            path: '/form/personal/collect',
            component: (resolve) => require(['./components/form/collect'], resolve)
        },
        {
            path: '/form/personal/FeedBack',
            component: (resolve) => require(['./components/form/FeedBack'], resolve)
        },
        {
            path: '/form/case-article',
            component: (resolve) => require(['./components/form/case-article'], resolve)
        },
        {
            path: '/form/case-noarticle',
            component: (resolve) => require(['./components/form/case-noarticle'], resolve)
        },
        {
            path: '/form/topics',
            component: (resolve) => require(['./components/form/topics'], resolve)
        },
        {
            path: '/form/personal',
            component: (resolve) => require(['./components/form/personal-info'], resolve)
        },
        {
            path: '/form/aboutMe',
            component: (resolve) => require(['./components/form/personal-center'], resolve)
        },
        {
            path: '/form/personal/password',
            component: (resolve) => require(['./components/form/password'], resolve)
        },
        {
            path: '/form/passwordreset',
            component: (resolve) => require(['./components/form/passwordreset'], resolve)
        },
        {
            path: '/form/passwordfind',
            component: (resolve) => require(['./components/form/passwordfind'], resolve)
        },
        {
            path: '/form/RegForm',
            component: (resolve) => require(['./components/form/RegForm'], resolve)
        },
        {
            path: '/form/space-list',
            component: (resolve) => require(['./components/form/space-list'], resolve)
        },
        
        {
            path: '/order/Login',
            component: (resolve) => require(['./components/order/Login'], resolve)
        },
         {
            path: '/order/checkCodeLogin',
            component: (resolve) => require(['./components/order/checkCodeLogin'], resolve)
        },
        
    ]
})

window.store = new Vuex.Store({
    state:{
        cdVisible : false,
        cities:{},
        city_id : 1,
        activity_type:'',
        area_size:'',
        facitilies:{},
        selected_id : 1,
        searchCondition : {
            type:'',
            retail:'',
            passenger_flow:'',
            space_type : '',
            budget_amount:'',
            area_size:'',
            storey:'',
            position:'',
            cities:'',
            group:'',
            space_type:'',
            areas:'',
            duration:'',
            business_district:{
                city_id:1,
                name:''
            }
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
        position:'',
        inquiryCount : '',
        inquiryList: [],
        personalData : {
            uid:'',
            
        },
        placeSearchCondition:{
            q:{},
            arrPlaceType:[],
            arrArea:[],
            arrSort:[]
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
            //console.log(state)
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
        },
        objConcat(a,b){
            return $.extend({}, a,b);
        },
       


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

                if(values.type == -1){
                    delete state.inquiryList[values.id]
                }

                if(values.type == 1){ // -1 减 , 1 加

                    state.inquiryList[values.id] = values.name

                }

                if(values.type === 2){ // 2为toggle
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
            LS.set('selectedCity',id)
        },
        getSelectedCity(state){
            var selectedCityId = LS.get('selectedCity')
            if(selectedCityId){
                state.city_id = selectedCityId
            }else{
                state.city_id = 1
            }
        },
        positionChange(state,item){
            if(item){
                state.position = item
            }else{
                state.position = ""
            }
        },
         activityTypeChange(state,item){
            if(item){
                state.activity_type = item
            }else{
                state.activity_type = ""
            }
        },
         areaSizeChange(state,item){
            if(item){
                state.area_size = item
            }else{
                state.area_size = ""
            }
        },
        placeSearchConditionChange(state,value){
            state.placeSearchCondition = value
        },
        // retailChange(state,item){
        //     if(item){
        //         state.retail = item
        //     }else{
        //         state.retail = ""
        //     }
        // },
        back(){
            router.back()
        }
    },
    actions : {

    }
});
window.isGetPhoneCode = false;
window.GlobleFun = {
        objConcat(a,b){
            return $.extend({}, a,b);
        },
        sendPhoneCode : function (phone,success,$ele) {
        if(!phone){
            $.toptip('请输入手机号',2000,'error');
            return;
        }
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        // console.log(mobile.test(mobile))
        if(phone.length == 11 && mobile.test(phone)){

        }else{

            $.toptip('手机号格式不正确',2000,'error');
            return;
        }

        if(isGetPhoneCode){
            return
        }
        isGetPhoneCode = true
        // console.log(111)
        $.ajax({
            url: window.YUNAPI.sendPhoneCode,
            data : {
                phone : phone
            },
            success: function (data) {

                var status = data.status == 1 ? 'success' : 'error';
                $.toptip(data.message,2000,status);

                if(data.status == 1){
                    GlobleFun.codeTiming($ele)
                }
                isGetPhoneCode = false
                if(typeof success == 'function'){
                    success(data);
                }
            },
            error : function () {
                isGetPhoneCode = false
            }
        });
    },
    codeTiming : function ($ele) {
        var time = 60;
        var btn = $($ele);
        btn.text('60s重新发送');
        btn.attr('disabled',true);
        var interval = setInterval(function () {
            time -- ;
            if(time < 0){
                time == 60;
                clearInterval(interval);
                btn.text('发送验证码');
                btn.attr('disabled',false);
            }else{
                btn.text(time+'s重新发送')
            }

        },1000)
    },
    httpError(){
        $.toptip('网络链接失败!',2000,'error');
    },
    httpMessage(data,successMsg,errorMessage){

        if(data.status == 1){
            $.toptip(successMsg || data.message,2000,'success');
        }else{
            $.toptip(errorMessage || data.message,2000,'error');
        }
    },
    changeCollectPromise : '',
    changeCollect(urlData,success,error){
        var self = this;
        if( this.changeCollectPromise && this.changeCollectPromise.state() == 'pending'){
            return
        }
        if(!urlData.user_id){
            $.toptip('请先登录!',2000,'error');
            router.push('/order/Login')
            return
        }
        self.changeCollectPromise = $.post({
            url: window.YUNAPI.changeCollect,
            data : urlData,
            success: function (data) {
                GlobleFun.httpMessage(data)
                success(data)
                // console.log(data)
            },
            error : function () {
                GlobleFun.httpError()
            }
        });
    },

}

window.APP = new Vue({
    store,
    render: h => h(App),
    router: router
}).$mount('#app');

function countProperties (obj) { // 计算对象长度
    var count = 0;
    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }
    return count;
}
function back(){
    loation.href=histroy.go(-1);
}
