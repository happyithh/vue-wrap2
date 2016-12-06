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
                <a class="in" href="javascript:;">登录/注册</a>
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
                    <router-link to="/openshop">
                        <span class="icon openshop"></span>
                        <p>我要开快闪店</p>
                    </router-link>
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
                        <a href="javascript:;" target="_blank">
                            <!--<img src="/static/images/test.png" alt="">-->
                            <img class="lazy" v-bind:data-original="item.img_paths.length > 0 ? item.img_paths[0]['url_400_267'] : ''">
                            <p>{{item.title}}</p>
                        </a>
                    </div>
                </div>
            </div>
        </div><!--精选专题-end-->

        <!--场地推荐-star-->
        <div class="space-list home">
            <div class="list-title clearfix">
                <h2 class="fl">场地推荐</h2>
                <a class="fr more" href="javascript:;">查看所有<span class="icon icon-arrowright"></span></a>
            </div>
            <ul>
                <li v-for="item in recommendSite">
                    <a class="img" href="javascript:;">
                        <!--<img src="/static/images/test.png">-->
                        <img class="lazy" v-bind:data-original="item.site_pictures.length > 0 ? item.site_pictures[0]['url_790_526'] : ''">
                        <!--<div class="price">-->
                            <!--<sup>￥</sup>{{}} 元/天<span>起</span>-->
                        <!--</div>-->
                    </a>
                    <div class="text">
                        <h3>{{item.title}}</h3>
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
            <a href="">
                <img src="/static/images/icon/jiameng.png">
                <p>场地加盟</p>
                <p class="see-more-btn">了解更多</p>
            </a>
            <a href="">
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
    import 'assets/css/home.css'

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
            self.getData()
        },
        methods:{
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
                $.ajax({
                    url: window.YUNAPI.home,
                    data: {
                        city_id: self.$store.state.city_id
                    },
                    success: function (data) {
                        console.log(data)
                        self.recommendSite = data.home_recommend_site
                        self.citySpecial = data.home_city_special
                        setTimeout(function () {
                            self.init();//调用轮播
                        },300)
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
