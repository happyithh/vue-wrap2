<template>
    <div class="container">

        <!--头部-->
        <header class="clearfix">
            <div class="left fl">
                 <a onclick='router.back()' class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
            </div>
            <div class="fl center">
                <h1 class="display-center">我要找IP文创</h1>
            </div>
        </header>

        <!--合作品牌-->
        <div class="co-brands">
            <div class="list-title clearfix">
                <h2>合作品牌</h2>
            </div>
            <div class="co-brands-cont">
                <div class="swiper-wrapper swiper-container">
                    <div class="swiper-slide" v-for="item in ipBrand">
                        <!--<img :src="/static/images/test_logo.png" alt="">-->
                        <img class="lazy" v-bind:data-original="item.img_paths.length > 0 ? item.img_paths[0]['url_400_267'] : ''">
                    </div>
                    <!--<div class="swiper-slide">-->
                        <!--<img src="/static/images/test_logo.png" alt="">-->
                    <!--</div>-->

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
                    <a :class="{ 'current':  !chooseType}" @click="typeChange('')" href="javascript:;">全部</a>
                    <a :class="{ 'current': key == chooseType}" @click="typeChange(key)" v-for="(key,value) in ipType" href="javascript:;">{{value}}</a>
                    <!--<a href="javascript:;">卡通</a>-->
                    <!--<a href="javascript:;">游戏</a>-->
                    <!--<a href="javascript:;">市集</a>-->
                    <!--<a href="javascript:;">动漫</a>-->
                    <!--<a href="javascript:;">卡通</a>-->
                    <!--<a href="javascript:;">游戏</a>-->
                </div>
            </div>
            <ul class="ip-cont">
                <li v-for="item in ipProject">
                    <a class="img" href="javascript:;">
                        <!--<img src="/static/images/test.png">-->
                        <img class="lazy" v-bind:data-original="item.img_paths.length > 0 ? item.img_paths[0]['url_400_267'] : ''">

                    </a>
                    <div class="cont">
                        <div class="title clearfix">
                            <div class="price">预算 <span>¥</span> {{item.budget_amount}}</div>
                            {{item.title}}
                        </div>
                        <div class="tags clearfix">
                            <span>国家地理</span>
                            <span>互动</span>
                            <span>路跑</span>
                        </div>
                        <div class="about">
                            <span>类别 {{item.p_type}}</span>
                            <span>来源 {{item.source}}</span>
                            <span>空间面积 {{item.area}}㎡</span>
                            <span>适用人群 {{item.applicable_people}}</span>
                        </div>
                        <div class="text">
                            {{item.p_notes}}
                        </div>
                        <!--<a class="btn-big" href="javascript:;">合作咨询</a>-->
                        <router-link :to=" '/ip/consult?id='+item.id+'&title='+item.title" class="btn-big">
                            合作咨询
                        </router-link>
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
                iplisst:[1,2,3],
                ipProject : [],
                ipBrand : [],
                ipType :[],
                chooseType :''
            }
        },
        mounted () {
            var self = this;
            self.$store.commit('loading',true);
            self.getData()
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
                    spaceBetween: 10,
                    autoplay: false
//                    freeMode: true
                });
            },
            getData(){
                var self = this
//
                $.ajax({
                    url: window.YUNAPI.findIp,
                    data: {
                        city_id: self.$store.state.city_id,
                        p_type:self.chooseType
                    },
                    success: function (data) {
                        self.ipProject = data.projects

                        if(self.ipBrand.length <= 0){
                            self.ipBrand = data.ip_brand
                        }

                        if(self.ipType.length > 0){

                        }else{
                            self.ipType = data.ip_type
                        }
                        console.log(data)
                        setTimeout(function () {
                            self.init();//调用轮播
                            $("img.lazy").lazyload({
                                effect : "fadeIn",
                                placeholder : '/static/images/placeholder.jpg'
                            });
                            self.$store.commit('loading',false);

                            //ip文创关键词滚动
                            var num=$('.ip-tags a').length;
                            var ipAwidth=$('.ip-tags a').outerWidth();

                            $('.ip-tags').width(num*ipAwidth+40);

                        },200)
                    }
                })
            },
            typeChange(type){
                this.chooseType = type
                this.getData()
            }
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
