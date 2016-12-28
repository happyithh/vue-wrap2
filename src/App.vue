<template>
    <div>
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
        <div v-if="loading" class="loader-wrap">
            <div class="loader">Loading...</div>
        </div>
    </div>

</template>

<script>
    import Hello from './components/Hello'
    import 'assets/css.css';
    import 'assets/css/weui-change.css';

    // const host = "http://api.yunspace.com.cn/";
    const host = "http://172.16.0.145/";

    window.YUNAPI = {
        host: host,
        cities: host + 'api/cities',
        home: host + 'api/index/wap_index',
        openShop: host + 'api/sites/get_wap_retail',
        findIp: host + 'api/projects/wap_ip_project',

        article: host + 'api/informations',
        articleTags: host + 'api/tags/get_information_tags',
        articleHot: host + 'api/informations/get_hot_recommend',
        articleKeyword: host + 'api/informations/get_keyword',
        logout:host+'/api/auth/sign_out',
        ipList: host + 'api/projects',
        active: host + 'api/activities',
        activeForm: host + 'api/activities/activities_form',
        submitConsult: host + 'api/consults',
        submitHoldEvent: host + 'api/orders',
        sendPhoneCode: host + 'api/auth_codes/send_code',
        SpaceList: host + 'api/spaces',
        SpaceDtl: host + 'api/spaces',
        placeDtl: host + 'api/sites',
        placeList: host + 'api/sites/search',
        feedBack: host + 'api/feedback',
        inquiry: host + 'api/users/1/demands',
        collection: host + 'api/follows',
        login: host + 'api/auth/sign_in',
        register: host + 'api/auth',
        tags: host + 'api/tags/all_tags',
        createInquiry: host + 'api/demands/create_inquiry',
        createBooking: host + 'api/orders/create_booking',
        inquiryContent: host + 'api/demands/',
        spaceDtlOnly: host + 'api/spaces/detail',
        changeCollect: host + 'api/follows',
        articleZan: host + 'api/informations/add_like_amount',
        authPassword: host + 'api/auth/password',
        createRetail: host+'api/demands/create_retail',
        checkCode:host+'api/auth_codes/check_code',
        personalInfo:host+'api/users/update',
        consultTags:host+'api/tags/get_consult_tags',
        retailSearch:host+'api/spaces/retail_search'

    };

    export default {
        data(){
            return {
                transitionName: 'slide-left'
            }
        },
        computed: {
            cities (){
                return this.$store.state.cities
            },
            personalData (){
                return this.$store.state.personalData
            },
            loading(){
                return this.$store.state.loading
            }
        },
        mounted () {
            var self = this;
            self.$store.commit('getSelectedCity');
            self.$store.commit('getPersonalData');
            this.$store.commit('inquiryChange');
          $.ajax({
                url: window.YUNAPI.tags,
                context: document.body,
                success: function (data) {
                    self.$store.state.searchCondition = data;
                    self.$store.state.cities = data.cities
                }
            });
        },
        components: {},
        watch: {
            '$route' (to, from) {
                const toDepth = this.skipEmptyElementForArray(to.path.split('/')).length
                const fromDepth = this.skipEmptyElementForArray(from.path.split('/')).length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
        methods: {
            skipEmptyElementForArray(arr){
                var a = [];
                $.each(arr, function (i, v) {
                    var data = $.trim(v);//$.trim()函数来自jQuery
                    if ('' != data) {
                        a.push(data);
                    }
                });
                return a;
            }
        }
    }
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }

    .child-view {
        position: absolute;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
        width: 100%;
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }

    .loader-wrap{
        width: 100%;
        position: fixed;
        top:56px;
        background: rgba(255,255,255,1);
        z-index: 9999;
        bottom: 0;
    }

    /*.loader {*/
        /*font-size: 10px;*/
        /*text-indent: -9999em;*/
        /*width: 4em;*/
        /*height: 4em;*/
        /*border-radius: 50%;*/
        /*background: #ffffff;*/
        /*background: -moz-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);*/
        /*background: -webkit-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);*/
        /*background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);*/
        /*background: -ms-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);*/
        /*background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);*/
        /*position: relative;*/
        /*-webkit-animation: load3 1.4s infinite linear;*/
        /*animation: load3 1.4s infinite linear;*/
        /*-webkit-transform: translateZ(0);*/
        /*-ms-transform: translateZ(0);*/
        /*transform: translateZ(0);*/

        /*margin: 150px auto;*/

    /*}*/

    /*.loader:before {*/
        /*width: 50%;*/
        /*height: 50%;*/
        /*background: #f7c73f;*/
        /*border-radius: 100% 0 0 0;*/
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*content: '';*/
    /*}*/

    /*.loader:after {*/
        /*background: #fff;*/
        /*width: 75%;*/
        /*height: 75%;*/
        /*border-radius: 50%;*/
        /*content: '';*/
        /*margin: auto;*/
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*bottom: 0;*/
        /*right: 0;*/
    /*}*/

    /*@-webkit-keyframes load3 {*/
        /*0% {*/
            /*-webkit-transform: rotate(0deg);*/
            /*transform: rotate(0deg);*/
        /*}*/
        /*100% {*/
            /*-webkit-transform: rotate(360deg);*/
            /*transform: rotate(360deg);*/
        /*}*/
    /*}*/

    /*@keyframes load3 {*/
        /*0% {*/
            /*-webkit-transform: rotate(0deg);*/
            /*transform: rotate(0deg);*/
        /*}*/
        /*100% {*/
            /*-webkit-transform: rotate(360deg);*/
            /*transform: rotate(360deg);*/
        /*}*/
    /*}*/

    .loader,
    .loader:after {
        border-radius: 50%;
        width: 4em;
        height: 4em;
    }
    .loader {
        margin: 150px auto;
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        border-top: 0.4em solid #f7c73f;
        border-right: 0.4em solid #f7c73f;
        border-bottom: 0.4em solid #f7c73f;
        border-left: 0.4em solid #ffffff;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: load8 1.1s infinite linear;
        animation: load8 1.1s infinite linear;
    }
    @-webkit-keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>
