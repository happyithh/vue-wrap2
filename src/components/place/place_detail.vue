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
                <div class="swiper-slide" v-for="item in topicOfSelect">
                    <img src="/static/images/test.png" alt=""/>
                </div>
            </div>
            <!-- Add Pagination -->
            <img class="pic-classfiy" src="/static/images/icon/pic.png" alt=""/>
            <div class="swiper-pagination"></div>
        </div>
        <!--轮播图end-->
        <!--信息展示开始-->
        <div class="infor-show">
            <h2>中国金融信息中心-六楼展厅</h2>
            <div class="base-info-adress">地址：上海市 黄浦区|蒙古路207号</div>

            <div class="map-wrap">
                <div class="base-info-map"> </div>
            </div>
            <div class="base-info">基本信息</div>
            <div class="base-info-detail"> 最大容量：<span>50人</span></div>
            <div class="base-info-detail mj"> 空间面积：<span>150m<sup>2</sup></span></div>
            <div class="base-info-detail"> 场地类型：<span>演讲会议</span></div>
            <div class="base-info-detail"> 活动类型：<span>文体娱乐 | 会议会务 | 培训演讲</span></div>
            <div class="base-info-detail"> 行业类型：<span>金融 | 奢侈品 | 消费品 | IT类 | 公益事业</span></div>
        </div>
        <div class="infor-show">
            <div class="base-info">场地配套</div>
            <div class="pic-icon">
                <img src="/static/images/icon/wc.png" alt=""/>
                <div class="pic-icon-exp">洗手间</div>
            </div>
            <div class="pic-icon">
                <img src="/static/images/icon/dressing_room.png" alt=""/>
                <div class="pic-icon-exp">化妆间</div>
            </div>
            <div class="pic-icon">
                <img src="/static/images/icon/rest.png" alt=""/>
                <div class="pic-icon-exp">休息室</div>
            </div>
            <div class="pic-icon">
                <img src="/static/images/icon/ceiling.png" alt=""/>
                <div class="pic-icon-exp">吊点</div>
            </div>

        </div>
        <div class="infor-show">
            <div class="base-info">场地介绍</div>
            <div class="pic-icon-exp pic-icon-expl">是继Playze与Tony合作有机农庄之后的第二个项目。多利有机屋旨在向上海市民展示他们的农庄产品及推广有机生活方式，为城市生活居民引入自然生活理念。像素化的方木箱出现在建筑的每一层，成为空间关联的主线。采用立体化的可移动模块将中央楼梯打造成一个灵活的居善地，这里可以适应演讲，展览，接待，非正式回应等多种活动。</div>

        </div>
        <div class="infor-show">
            <div class="base-info">场地其他空间</div>
            <ul class="pic-icon-exp other-spaces">
                <li class="clearfix" v-for="item in recommends">
                    <a class="fl img" href="javascript:;">
                        <img src="/static/images/test.png">
                    </a>
                    <div class="fr cont">
                        <h3><a class="title" href="">中国金融信息中心-上海厅</a></h3>
                        <p>
                            <span>最大容纳 1 ~ 14人</span>
                            <span>面积30㎡</span>
                        </p>
                        <div class="price">￥1350000 元／天</div>
                    </div>
                </li>
            </ul>

        </div>
        <div class="infor-show">
            <div class="base-info">场地相关案例</div>
            <div class="selectedtopic-cont about-cases">
                <div class="swiper-wrapper swiper-container">
                    <div class="swiper-slide" v-for="item in topicOfSelect">
                        <img src="/static/images/test.png" alt=""/>
                        <h3>当超级IP遇到商业地产 魔兽成各大购物中心最火吸金王</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="infor-show1">
            <a href="" class="fl btn-onekey"><img src="/static/images/icon/share.png" alt="">分享</a>
            <a href="" class="fr btn-onekey"><img src="/static/images/icon/collect.png" alt="">收藏</a>

        </div>

        <!--电话-->
        <div class="tel-wrap">
            <a href="tel:400-056-0599" class="event-tel clearfix">
                <i class="fl tel"></i>
                <p class="fr">场地咨询热线：400-056-0599</p>
            </a>
        </div>


        <div class="infor-show-shadow place">
            <router-link to="/form/askprice" class="btn-onekey">
                一键询价
            </router-link>
        </div>
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
                topicOfSelect: [
                    1,2,3,4
                ],
                recommends: [1,2,3]

            }
        },
        mounted () {
            var self = this;
            self.init1();//调用轮播
            self.init2();//调用轮播

            console.log(this.$route.params.id)
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
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
