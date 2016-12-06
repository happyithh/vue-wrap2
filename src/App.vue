<template>
    <div id="app">
        <router-view class="child-view"></router-view>
    </div>
</template>

<script>
    import Hello from './components/Hello'
    import 'assets/css.css';

//    const host = "http://api.yunspace.com.cn/";
        const host = "http://172.16.1.33:3000/";

    window.YUNAPI = {
        host: host,
        cities : host + 'api/cities',
        home : host + 'api/index/wap_index',
        homeSearch : host + 'api/tags/get_home_search',
        article : host + 'api/informations',
        articleTags : host + 'api/tags/get_information_tags',
        articleHot : host + 'api/informations/get_hot_recommend',
        articleKeyword : host + 'api/informations/get_keyword',
        findIp : host + 'api/projects/ip_project',
        ipList : host + 'api/projects',
        active : host + 'api/activities',
        submitConsult : host + 'api/consults',
        submitHoldEvent : host + 'api/orders',
        sendPhoneCode : host + 'api/auth_codes/send_code',
        openShop : host + 'api/informations/get_retail',
        SpaceList: host + 'api/spaces',
        SpaceDtl: host + 'api/spaces',
        placeDtl : host + 'api/sites',
        feedBack: host + 'api/feedback',
        inquiry: host + 'api/orders/create_inquiry',
        collection: host + 'api/follows',
        login : host + 'api/auth/sign_in',
        register : host + 'api/auth',
        tags : host + 'api/tags/all_tags',
        createInquiry : host + 'api/orders/create_inquiry',
        createBooking : host + 'api/orders/create_booking',
        inquiryContent : host + 'api/demands/',
        spaceDtlOnly : host + 'api/spaces/detail',
        changeCollect : host + 'api/follows',
        articleZan : host + 'api/informations/add_like_amount',
    };

    export default {
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
            $.ajax({
                url: window.YUNAPI.tags, context: document.body, success: function (data) {
                    self.$store.state.searchCondition = data;
                    self.$store.state.cities = data.cities

                }
            });
        },
        components: {}
    }
</script>

<style>

</style>
