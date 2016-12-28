<template>
    <div class="container child-view">

        <!--头部-->
        <header class="clearfix">
            <div class="left fl">
                <!--<div class="citys back">-->
                    <!--<input onfocus="this.blur()" class="weui_input" id="citys" type="text" value="上海" readonly="true">-->
                    <!--<i class="icons icon-arrowbottom white"></i>-->
                <!--</div>-->
                <router-link to="/city" class="citys back">
                    <input onfocus="this.blur()" class="weui_input" id="citys" type="text" v-model="city_name" readonly="true">
                    <i class="icons icon-arrowbottom white"></i>
                </router-link>
                <div v-for="i in cities"></div>
            </div>
            <div class="fl center">
                <div class="logo"><img src="/static/images/logo.png"></div>
            </div>
            <div class="right fr">
                <a class="in" @click="toggleLoginForm" v-text=" typeof personalData.name != 'undefined' ? personalData.name : '注册/登录' " ></a>
            </div>
        </header>

        <!--banner-star-->
        <div class="banner">
            <img src="/static/images/home_banner.jpg">
            <div class="cont">
                <div class="text">
                    <h2>中国最专业的商业空间短租平台</h2>
                    <p>省时，省力，找你所想…</p>
                </div>
                <div class="banner-cont clearfix">
                    <router-link to="/event">
                        <span class="icon hold-event"></span>
                        <p>我要办活动</p>
                    </router-link>
                    <!--<router-link to="/openshop">-->
                        <!--<span class="icon openshop"></span>-->
                        <!--<p>我要开快闪店</p>-->
                    <!--</router-link>-->
                    <router-link to="/ip">
                        <span class="icon ip"></span>
                        <p>我要找IP文创</p>
                    </router-link>
                </div>
            </div>
        </div><!--banner-end-->

        <!--精选专题-star-->
        <div class="selectedtopic">
            <div class="list-title clearfix">
                <h2>精选专题</h2>
            </div>

            <div class="selectedtopic-cont">
                <div class="swiper-wrapper swiper-container">
                    <div class="swiper-slide" v-for="item in citySpecial">
                        <a :href="item.special_url ? item.special_url : '/article/' + item.id">
                        <!--<router-link :to="'/article/'+item.id">-->
                            <!--<a href="javascript:;" target="_blank">-->
                                <!--<img src="/static/images/test.png" alt="">-->
                                <img class="lazy" :title="item.title" v-bind:data-original="item.img_paths.length > 0 ? item.img_paths[0]['url_400_267'] : ''">
                                <p>{{item.title}}</p>
                            </a>
                            <!--</router-link>-->
                    </div>
                </div>
            </div>
        </div><!--精选专题-end-->

        <!--场地推荐-star-->
        <div class="space-list home">
            <div class="list-title clearfix">
                <h2 class="fl">场地推荐</h2>
                <router-link class="fr more" to="/place">查看所有<span class="icon icon-arrowright"></span></router-link>
            </div>
            <ul>
                <li v-for="item in recommendSite">
                    <router-link :to="'/place/detail/'+item.id">
                        <a class="img" href="javascript:;">
                            <!--<img src="/static/images/test.png">-->
                            <img class="lazy" :title="item.title" v-bind:data-original="item.site_pictures.length > 0 ? item.site_pictures[0]['url_790_526'] : ''" >
                            <!--<div class="price">-->
                                <!--<sup>￥</sup>{{}} 元/天<span>起</span>-->
                            <!--</div>-->
                        </a>
                    </router-link>
                    <div class="text">
                        <h3><a class="title" href="javascript:;">{{item.title}}</a></h3>
                        <p>
                            <span>最大容纳 {{item.max_people}}人</span>
                            <span>面积 {{item.max_size}}㎡</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div><!--场地推荐-end-->

        <!--电话/了解更多-->
        <div class="see-more">
            <a href="tel:400-056-0599">
                <img src="/static/images/icon/tel_02.png">
                <p>场地咨询热线</p>
                <p>400-056-0599</p>
            </a>
            <a href="http://www.yunspace.com.cn/m/sitejoin">
                <img src="/static/images/icon/jiameng.png">
                <p>场地加盟</p>
                <p class="see-more-btn">了解更多</p>
            </a>
            <a href="http://www.yunspace.com.cn/m/city_collaborate">
                <img src="/static/images/icon/friends.png">
                <p>城市合伙人</p>
                <p class="see-more-btn">了解更多</p>
            </a>
        </div>
    </div>
</template>

<script>
    import 'assets/libs/swiper/swiper.js'
    import 'assets/list.css'
    //import 'assets/css/home.css'

    export default {
        data () {
            return {
                topicOfSelect: [
                    1,2,3,4
                ],
                places: [1,2,3],
                recommendSite : [],
                citySpecial : [],
                city_name:''

            }
        },
        computed: {
            cities (){
                var cities = this.$store.state.cities
                var self = this
                if(cities.length > 0){
                    cities.forEach(function (data) {
                        if(data.id == self.city_id){
                            self.city_name = data.name  // 需要获取城市名
                        }
                    })
                }else{
                    self.city_name = '请选择' // 需要获取城市名
                }
                return cities
            },
            
            personalData (){
                return this.$store.state.personalData
            },
            loading(){
                return this.$store.state.loading
            },
            city_id(){
                return this.$store.state.city_id
            },
//            city_name(){
//                var cities = this.$store.state.cities
//                var cityesArray = []
//                var self = this
//                if(cities.length > 0){
//                    cities.forEach(function (data) {
//                        cityesArray.push(data.name)
//                        if(data.id == self.city_id){
//                            console.log(data.name)
//                            return data.name
//                        }
//                    })
//                }else{
//                    return ''
//                }
//            }
        },
        mounted () {
            var self = this;
            this.$store.commit('getPersonalData')
            self.getData()
        },
        methods:{
             toggleLoginForm: function () {
                //  console.log(data)
                // this.personalData=data                
                if(this.personalData.uid){
                    //console.log(this.personalData.uid)
                    router.push('/form/aboutMe') //已登陆 跳到个人页面
                }else{
                    console.log(this.personalData.uid)
                     router.push('/order/login')
                    //this.$parent.$data.showForm.login = !this.$parent.$data.showForm.login
                }

            },
            //  getPersonalData(data){
            //      console.log(data)
                
            //     // router.replace('/')
            // },
            /*轮播*/
            init : function () {
                var citySelectionSwiper = new Swiper('.selectedtopic-cont', {
//                    pagination: '.swiper-pagination',
//                    nextButton: '.citysubject .btnright',
//                    prevButton: '.citysubject .btnleft',
//                    loop : true,
                    slidesPerView: 1.2,
                    paginationClickable: true,
                    spaceBetween: 10,
                    autoplay: false
//                    freeMode: true
                });
                $("img.lazy").lazyload({
                    effect : "fadeIn",
                    placeholder : '/static/images/placeholder.jpg'
                });
            },
            getData(){
                var self = this
                self.$store.commit('loading',true);
                $.ajax({
                    url: window.YUNAPI.home,
                    data: {
                        city_id: self.$store.state.city_id
                    },
                    success: function (data) {
                        self.recommendSite = data.home_recommend_site
                        self.citySpecial = data.home_city_special
                        setTimeout(function () {
                            self.init();//调用轮播
                        },300)
                        self.$store.commit('loading',false);
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    /*轮播*/
    .selectedtopic-cont{
        overflow: hidden;
        padding: 0 15px;
    }
    .swiper-container{
        width: 100%;
        height: auto;
        overflow: visible;
        position: relative;
    }
    .swiper-container .swiper-slide{
        background-color: #fff;
        /*height: 350px;*/
        margin-right: 10px !important;
        padding-bottom: 52px;
        position: relative;
    }
    .swiper-container .swiper-slide a{
        display: block;
        width: 100%;
        height: 100%;
    }

    .swiper-container .swiper-slide img{
        display: block;
        width: 100%;
        height: 100%;
        background: #aaa;
    }
    .swiper-container .swiper-slide p{
        width: 100%;
        font-size:0.9rem;
        color:#000;
        margin: 0;
        height: 42px;
        line-height: 1.35em;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        z-index: 2;

        transition: all .6s;
        -webkit-transition: all .6s;
        -moz-transition: all .6s;
    }


    /*头部*/
    .logo img{
        display: inline-block;
        height: 30px;
        margin-top: 13px;
    }
    header .citys{
        width: 60px;
        position: relative;
    }
    header .citys i{
        position: absolute;
        right: 2px;
        top: 6px;
    }

    /*banner*/
    .banner{
        width: 100%;
        position: relative;
    }
    .banner>img{
        display: block;
        width: 100%;
    }
    .banner .cont{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }
    .banner .text{
        width: 100%;
        padding: 0 20px;
        margin-top: 30px;
        color: #fff;
        text-shadow:1px 2px 0 rgba(0,0,0,0.5);
    }
    .banner .text h2{
        font-family:PingFangSC-Medium;
        font-size: 1.2rem;
    }
    .banner-cont{
        width: 90%;
        padding: 15px 0;
        margin: 30px 5%;
        background: #fff;
        border-radius: 5px;
    }
    .banner-cont>a{
        display: block;
        float: left;
        /*width: 33.33%;*/
        width: 50%;
        height: 50px;
        overflow: hidden;
        color: #000;
        border-left: 1px solid #979797;
        text-align: center;
    }
    .banner-cont>a:first-child{border: none;}
    .banner-cont>a .icon{
        display: block;
        width: 24px;
        height: 24px;
        margin: 0 auto;
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center;
    }
    .banner-cont>a .icon.hold-event{
        background-image: url("/static/images/icon/hold_event.png");
    }
    .banner-cont>a .icon.openshop{
        background-image: url("/static/images/icon/openshop.png");
    }
    .banner-cont>a .icon.ip{
        background-image: url("/static/images/icon/ip.png");
    }
    .banner-cont>a p{margin-top: 7px;}

    /*列表*/
    .home.space-list .text .title{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
    }

    /*了解更多*/
    .see-more{
        width: 100%;
        padding:10px 0 15px;
        background: #f4f4f4;
    }
    .see-more a{
        display: block;
        width: 150px;
        padding: 17px 0 15px;
        border-bottom: 2px solid #999;
        margin: 0 auto;
        text-align: center;
        font-size: 17px;
        color: #999;
    }
    .see-more a:last-child{
        border: none;
    }
    .see-more a img{
        width: 28px;
    }
    .see-more-btn,.see-more-btn:active,.see-more-btn:focus{
        color:#f7c73f;
    }


    @media screen and (min-width: 320px) and (max-width: 360px){
        .banner-cont{margin: 25px auto;}
    }
    @media screen and (min-width: 640px) {
        .banner .text{margin-top: 65px;padding: 0 30px;}
        .banner .text h2{
            font-size: 40px;
        }
        .banner .text p{
            font-size: 32px;
        }
        .banner-cont{margin: 45px auto;}
        .banner-cont>a{
            height: 80px;
        }
        .banner-cont>a p{
            font-size: 24px;
            line-height: 24px;
            margin-top: 25px;
        }
        .banner-cont>a .icon{
            width: 30px;
            height: 30px;
        }
    }
    @media screen and (min-width: 750px) {
        .banner .text{margin-top: 80px;}
        .banner .text h2{
            font-size: 48px;
        }
        .banner-cont{margin: 60px auto;}
    }

</style>
