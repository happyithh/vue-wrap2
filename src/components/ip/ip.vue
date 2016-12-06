<template>
    <div class="container">

        <!--头部-->
        <header class="clearfix">
            <div class="left fl">
                <router-link to="/" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <p class="display-center">我要找IP文创</p>
            </div>
        </header>

        <!--合作品牌-->
        <div class="co-brands">
            <div class="list-title clearfix">
                <h2>合作品牌</h2>
            </div>
            <div class="co-brands-cont">
                <div class="swiper-wrapper swiper-container">
                    <div class="swiper-slide">
                        <img src="/static/images/test_logo.png" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img src="/static/images/test_logo.png" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img src="/static/images/test_logo.png" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img src="/static/images/test_logo.png" alt="">
                    </div>
                </div>
            </div>
        </div>

        <!--ip文创-->
        <div class="ip">
            <div class="list-title clearfix">
                <h2>IP文创</h2>
            </div>
            <div class="ip-tags-wrap">
                <div class="ip-tags clearfix">
                    <a class="current" href="javascript:;">全部</a>
                    <a href="javascript:;">动漫</a>
                    <a href="javascript:;">卡通</a>
                    <a href="javascript:;">游戏</a>
                    <a href="javascript:;">市集</a>
                    <a href="javascript:;">动漫</a>
                    <a href="javascript:;">卡通</a>
                    <a href="javascript:;">游戏</a>
                </div>
            </div>
            <ul class="ip-cont">
                <li v-for="item in iplisst">
                    <a class="img" href="javascript:;">
                        <img src="/static/images/test.png">
                    </a>
                    <div class="cont">
                        <div class="title clearfix">
                            <div class="price">预算 <span>¥</span> 10万-30万</div>
                            国家地理经典影像盛宴路跑
                        </div>
                        <div class="tags clearfix">
                            <span>国家地理</span>
                            <span>互动</span>
                            <span>路跑</span>
                        </div>
                        <div class="about">
                            <span>类别 运动</span>
                            <span>来源 美国</span>
                            <span>空间面积 1000-3000㎡</span>
                            <span>适用人群 跑酷爱好者</span>
                        </div>
                        <div class="text">
                            是继Playze与Tony合作有机农庄之后的第二个项目。多利有机屋旨在向上海市民展示他们的农庄产品及推广有机生活方式，为城市生活居民引入自然生活理念。
                        </div>
                        <a class="btn-big" href="javascript:;">合作咨询</a>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import 'assets/libs/swiper/swiper.js'
    //import 'assets/css/ip.css'

    export default {
        data () {
            return {
                iplisst:[1,2,3]
            }
        },
        mounted () {
            var self = this;

            self.init();//调用轮播

            //ip文创关键词滚动
            var num=$('.ip-tags a').length;
            var ipAwidth=$('.ip-tags a').outerWidth();

            $('.ip-tags').width(num*ipAwidth+30);
        },
        methods:{
            /*轮播*/
            init : function () {
                var coBrandsCont = new Swiper('.co-brands-cont', {
//                    pagination: '.swiper-pagination',
//                    nextButton: '.citysubject .btnright',
//                    prevButton: '.citysubject .btnleft',
//                    loop : true,
                    slidesPerView: 2.2,
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

    .btn-big{
        width: 100%;
        padding: 10px 0;
        text-align: center;
        font-size: 1.07rem;
        background:#f7c73f;
        margin-top: 10px;
    }
    /*合作品牌轮播*/
    .co-brands-cont{
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

    /*ip文创*/
    .ip-tags-wrap{
        width:100%;
        overflow: auto;
    }
    .ip-tags{
        padding: 0 15px;
        margin-bottom: 15px;
        overflow: auto;
    }
    .ip-tags a{
        float: left;
        display: block;
        font-size: 0.90rem;
        padding: 0.6rem 1.2rem;
    }
    .ip-tags a.current{
        background:#f7c73f;
    }
    .ip-cont .cont{
        padding: 10px 15px 15px;
    }
    .ip-cont .title{
        font-size: 1.05rem;
        line-height: 1.35em;
        margin-bottom: 10px;
    }
    .ip-cont .title .price{
        float: left;
        font-family:PingFangSC-Semibold;
        font-size: 1.05rem;
        color:#e92332;
        margin-right: 10px;
    }
    .ip-cont .title .price span{
        font-size: 0.8rem;
        line-height: 1em;
    }
    .ip-cont .tags{margin-bottom: 5px;}
    .ip-cont .tags span{
        float: left;
        display: block;
        background:#f4f4f4;
        font-size: 0.8rem;
        color:#999999;
        padding: 8px 15px;
        margin-right: 5px;
        margin-bottom: 5px;
    }
    .ip-cont .about{margin-bottom: 10px;}
    .ip-cont .about span{
        font-size: 0.8rem;
        color:#666666;
        line-height: 1.25em;
        margin-right: 10px;
    }
    .ip-cont .text{
        font-size: 0.93rem;
        line-height: 1.5em;
    }

</style>
