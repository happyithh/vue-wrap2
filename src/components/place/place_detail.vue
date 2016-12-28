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
                <h1 class="display-center">场地详情</h1>
            </div>

        </header>
        <!--头部end-->
        <!--轮播图start-->
        <div class="selectedtopic-cont top-banner">
            <div class="swiper-wrapper swiper-container">
                <div class="swiper-slide" v-for="item in placeDtl.site_pictures">
                    <img :src="item.url_790_526" alt=""/>
                </div>
            </div>
            <!-- Add Pagination -->
            <img class="pic-classfiy" src="/static/images/icon/pic.png" alt=""/>
            <div class="swiper-pagination"></div>
        </div>
        <!--轮播图end-->
        <!--信息展示开始-->
        <div class="infor-show">
            <h2>{{placeDtl.title}}</h2>
            <div class="base-info-adress">地址：{{placeDtl.city_name}} {{placeDtl.district}}|{{placeDtl.address}}</div>

            <!--地图-->
            <div class="map-wrap">
                <div class="base-info-map map" id="placeMap">
                </div>
            </div>

            <div class="base-info">基本信息</div>
            <div class="base-info-detail"> 最大容量：<span>{{placeDtl.max_people}}人</span></div>
            <div class="base-info-detail"> 空间面积：<span>{{placeDtl.max_size}}㎡</span></div>
            <div class="base-info-detail"> 场地类型：<span>{{placeDtl.site_type}}</span></div>
            <div class="base-info-detail"> 活动类型：<span>{{placeDtl.service_type}}</span></div>
            <div class="base-info-detail"> 行业类型：<span>{{placeDtl.industry_field}}</span></div>
        </div>
        <div class="infor-show">
            <div class="base-info">场地配套</div>
            <div class="pic-icon" v-for="item in arrSort">
                <img :src="'/static/images/assort/'+assortList[item]+'.png'" alt=""/>
                <div class="pic-icon-exp">{{item}}</div>
            </div>
            <!--<div class="pic-icon">-->
                <!--<img src="/static/images/icon/wc.png" alt=""/>-->
                <!--<div class="pic-icon-exp">洗手间</div>-->
            <!--</div>-->
            <!--<div class="pic-icon">-->
                <!--<img src="/static/images/icon/dressing_room.png" alt=""/>-->
                <!--<div class="pic-icon-exp">化妆间</div>-->
            <!--</div>-->
            <!--<div class="pic-icon">-->
                <!--<img src="/static/images/icon/rest.png" alt=""/>-->
                <!--<div class="pic-icon-exp">休息室</div>-->
            <!--</div>-->
            <!--<div class="pic-icon">-->
                <!--<img src="/static/images/icon/ceiling.png" alt=""/>-->
                <!--<div class="pic-icon-exp">吊点</div>-->
            <!--</div>-->

        </div>
        <div class="infor-show">
            <div class="base-info">场地介绍</div>
            <div class="pic-icon-exp pic-icon-expl">{{placeDtl.brand_story}}</div>

        </div>
        <div class="infor-show">
            <div class="base-info">场地其他空间</div>
            <ul class="pic-icon-exp other-spaces">
                <li class="clearfix" v-for="item in spaces">
                    <router-link :to="'/space/detail/'+item.id" class="clearfix">
                        <div class="fl img">
                            <img :src="item.img_paths.length > 0 ? item.img_paths[0]['url_400_267'] : ''">
                        </div>
                        <div class="fr cont">
                            <h3 class="title">{{item.name}}</h3>
                            <p>
                                <span>最大容纳 {{item.Max_seating_capacity}}人</span>
                                <span>面积{{item.area}}㎡</span>
                            </p>
                            <div class="price">￥1350000 元／天</div>
                        </div>
                    </router-link>
                </li>
            </ul>

        </div>
        <div class="infor-show">
            <div class="base-info">场地相关案例</div>
            <div class="selectedtopic-cont about-cases">
                <div class="swiper-wrapper swiper-container">
                    <div class="swiper-slide" v-for="item in relate_topics">
                        <!--<img src="/static/images/test.png" alt=""/>-->
                        <router-link :to="item.special_url ? item.special_url : '/article/' + item.id">
                            <img :src="item.img_paths.length > 0 ? item.img_paths[0]['url_150_100'] : ''">

                            <h3>{{item.title}}</h3>
                        </router-link>
                    </div>
                </div>
            </div>

            <!--<div class="selectedtopic-cont about-cases">-->
                <!--<div class="swiper-wrapper swiper-container">-->
                    <!--<div class="swiper-slide" v-for="item in topicOfSelect">-->
                        <!--<img src="/static/images/test.png" alt=""/>-->
                        <!--<h3>标题是的噶看了啥快递过来 </h3>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <div class="infor-show1">
            <a href="" class="fl btn-onekey1"><i class="icon icon-share"></i>分享</a>
            <!--<a href="" class="fr btn-onekey"><img src="/static/images/icon/collect.png" alt="">收藏</a>-->
            <a href="javascript:;" @click='changeCollect' class="fr btn-onekey1" :class=" {'hv': placeDtl.follow }"><i class="icon icon-collection"></i>收藏</a>


        </div>

        <!--电话-->
        <div class="tel-wrap">
            <a href="tel:400-056-0599" class="event-tel clearfix">
                <i class="fl tel"></i>
                <p class="fr">场地咨询热线：400-056-0599</p>
            </a>
        </div>


        <!--<div class="infor-show-shadow place fixed">-->
            <!--<router-link to="/form/askprice" class="btn-onekey">-->
                <!--一键询价-->
            <!--</router-link>-->
        <!--</div>-->
    </div>
    <!--信息展示结束-->





    </div>
</template>

<script>
    import 'assets/libs/swiper/swiper.js'
    import 'assets/css.css'
    import 'assets/css/space-detail.css'

    export default {
        data () {
            return {
                site_pictures: [
                    1,2,3,4
                ],
                placeDtl : [],
                spaces : [],
                relate_topics : '',
                relate_articles : '',

                assortList: {
                    '卫生间':'wc',
                    '化妆间':'dressing_room',
                    '休息室':'rest',
                    '空调暖气':'air_conditioning',
                    '网络WIFI':'wifi',
                    '投影LED':'led',
                    '灯光音响':'video',
                    '空间吊点':'ceiling',
                    '停车泊位':'parking',
                    '货运电梯':'lift',
                    '餐饮':'drink'
                },
                arrSort:[]
            }
        },
        computed : {
            inquiryList () {
                return this.$store.state.inquiryList
            },
            inquiryCount () {
                return this.$store.state.inquiryCount
            },
            personalData (){
                return this.$store.state.personalData
            }
        },
        mounted () {
            var self = this;

            self.getData()//调用数据
        },
        methods:{
            /*顶部轮播*/
            init1 : function () {
                var citySelectionSwiper = new Swiper('.top-banner', {
                    pagination: '.swiper-pagination',
                    //    nextButton: '.citysubject .btnright',
                    //    prevButton: '.citysubject .btnleft',
                    paginationType : 'custom',
                    paginationCustomRender: function (swiper, current, total) {
                        return current + ' / ' + total;
                    },
//                    loop : true,
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween: 0,
                    autoplay: false
//                    freeMode: true
                });
            },
            /*案例轮播*/
            init2 : function () {
                var citySelectionSwiper2 = new Swiper('.about-cases', {
                    paginationType : 'custom',
                    paginationCustomRender: function (swiper, current, total) {
                        return current + ' / ' + total;
                    },
//                    loop : true,
                    slidesPerView: 1.2,
                    paginationClickable: true,
                    spaceBetween: 10,
                    autoplay: false
//                    freeMode: true
                });
            },
            getData(){
                var self = this;
                //self.$store.commit('loading',true);
                $.get({
                    url: window.YUNAPI.placeDtl + '/' + this.$route.params.id,
                    //data: self.$store.getters.validationData,
                    success: function (data) {
                        self.placeDtl = data.site
                        console.log(data.site)
                        self.spaces = data.site_spaces
                        self.relate_topics = data.relate_topics
                        self.relate_articles = data.relate_articles
                        self.placeDtl.follow = (self.placeDtl.follow == true)

                        //场地配套
                        if(self.placeDtl.facilities){
                            self.arrSort=self.placeDtl.facilities.split(',');
                        }

                        setTimeout(function () {
                            self.init1();//调用轮播
                            self.init2();//调用轮播
                            self.initMap();//调用地图
                        },300)
                    },
                    error: function () {
                        GlobleFun.httpError()
                    }
                });
            },

            initMap(){
                var self = this;
                var map = new BMap.Map("placeMap");

                var myGeo = new BMap.Geocoder();

                myGeo.getPoint(self.placeDtl.address, function(point){
                    if (point) {
                        map.centerAndZoom(point, 16);  // 初始化地图,设置中心点坐标和地图级别
                        var marker = new BMap.Marker(point);  // 创建标注
                        map.addOverlay(marker);
                        //self.request();
                    }else{
                        //TODO //没有这个点的提示
                    }

                },self.placeDtl.city_name);
            },
            changeCollect(){
                var self = this
                var data = GlobleFun.objConcat(self.$store.getters.validationData, {
                    user_id: self.personalData.id,
                    followable_type: 'Site',
                    followable_id: self.placeDtl.id
                })
                var success = function (data) {
                    if(data.status == 1){
                        self.placeDtl.follow = !self.placeDtl.follow
                    }
                };

                GlobleFun.changeCollect(data,success)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
