<template>
    <div class="container">

        <!--头部-->
        <header class="clearfix">
            <div class="left fl">
                <div class="citys back">
                    <input class="weui_input" id="job" type="text" value="上海" readonly="true">
                    <i class="icons icon-arrowbottom white"></i>
                </div>
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
                    <a href="javascript:;">
                        <span class="icon hold-event"></span>
                        <p>我要办活动</p>
                    </a>
                    <a href="javascript:;">
                        <span class="icon openshop"></span>
                        <p>我要开快闪店</p>
                    </a>
                        <a href="javascript:;">
                        <span class="icon ip"></span>
                        <p>我要找IP文创</p>
                    </a>
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
                    <div class="swiper-slide" v-for="item in topicOfSelect">
                        <a href="javascript:;" target="_blank">
                            <img src="/static/images/test.png" alt="">
                            <p>从户外到室内，冬日集市场地新选择</p>
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
                <li v-for="item in places">
                    <a class="img" href="javascript:;">
                        <img src="/static/images/test.png">
                    </a>
                    <div class="text">
                        <h3>骥海商业文化传播有限公司会议骥海商业文化传播有限公司会议</h3>
                        <p>
                            <span>最大容纳 200人</span>
                            <span>面积 200㎡</span>
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
                places: [1,2,3]
            }
        },
        mounted () {
            var self = this;
            self.init();//调用轮播

            $("#job").select({
                title: "请选择",
                items: [
                    {
                        title:"上海",
                        value:"01",
                    },
                    {
                        title:"北京",
                        value:"02",
                    },
                    {
                        title:"深圳",
                        value:"03",
                    }
                ]
            });

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
                    spaceBetween: 2,
                    autoplay: false
//                    freeMode: true
                });
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
