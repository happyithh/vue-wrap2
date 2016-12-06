<template>
    <div class="container">

        <!--头部-->
        <header class="clearfix">
            <div class="left fl">
                <a href="" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
            </div>
            <div class="fl center">
                <p class="display-center">空间详情</p>
            </div>
            
        </header>
        <!--头部end-->
        <!--轮播图start-->
            <div class="selectedtopic-cont">
                <div class="swiper-wrapper swiper-container">
                    <div class="swiper-slide" v-for="item in topicOfSelect">
                       <img src="/static/images/test.png" alt=""/>
                    </div>
                </div>
                <!-- Add Pagination -->
                 <img class="pic-classfiy" src="/static/images/icon/pic.png" alt="">
                 <div class="swiper-pagination"></div>
             </div>
        <!--轮播图end-->
        <!--信息展示开始-->
        <div class="infor-show">
            <h1>中国金融信息中心-六楼展厅</h1>
            <div class="base-info">基本信息</div>
            <div class="base-info-detail"> 最大容量：<span>50人</span></div>
            <div class="base-info-detail"> 空间面积：<span>150m<sup>2</sup></span></div>
            <div class="base-info-detail"> 场地类型：<span>演讲会议</span></div>
            <div class="base-info-detail"> 活动类型：<span>文体娱乐 | 会议会务 | 培训演讲</span></div>
            <div class="base-info-detail"> 行业类型：<span>金融 | 奢侈品 | 消费品 | IT类 | 公益事业</span></div>
        </div>
         <div class="infor-show">
           <div class="base-info">空间配套</div>
                <div class="pic-icon">
                <img src="/static/images/icon/wc.png" alt="">
                <div class="pic-icon-exp">洗手间</div>
            </div>
            <div class="pic-icon">
                <img src="/static/images/icon/dressing_room.png" alt="">
                <div class="pic-icon-exp">化妆间</div>
            </div>
            <div class="pic-icon">
                <img src="/static/images/icon/rest.png" alt="">
                <div class="pic-icon-exp">休息室</div>
            </div>
            <div class="pic-icon">
                <img src="/static/images/icon/ceiling.png" alt="">
                <div class="pic-icon-exp">吊点</div>
            </div>
            <div class="pic-icon">
                <img src="/static/images/icon/air_conditioning.png" alt="">
                <div class="pic-icon-exp">空调暖气</div>
            </div>
            <div class="pic-icon">
                <img src="/static/images/icon/wifi.png" alt="">
                <div class="pic-icon-exp">Wi-Fi</div>
            </div>
            <div class="pic-icon">
                <img src="/static/images/icon/parking.png" alt="">
                <div class="pic-icon-exp">停车位</div>
            </div>
            <div class="pic-icon">
                <img src="/static/images/icon/lift.png" alt="">
                <div class="pic-icon-exp">货运电梯</div>
            </div>
            <div class="pic-icon">
                <img src="/static/images/icon/led.png" alt="">
                <div class="pic-icon-exp">投影LED</div>
            </div>
            <div class="pic-icon">
                <img src="/static/images/icon/video.png" alt="">
                <div class="pic-icon-exp">灯光音响</div>
            </div>
            <div class="pic-icon">
                <img src="/static/images/icon/drink.png" alt="">
                <div class="pic-icon-exp">餐饮</div>
            </div>
               
        </div>
        <div class="infor-show">
            <div class="base-info">基本信息</div>
           <div class="pic-icon-exp pic-icon-expl">100人以内，12小时以内。超出100人，每人加收500元，最多允许超出150人。</div>
            
        </div>
        <div class="infor-show">
            <div class="base-info">场地相关案例</div>
            <div class="selectedtopic-cont">
                <div class="swiper-wrapper swiper-container">
                    <div class="swiper-slide" v-for="item in topicOfSelect">
                       <img src="/static/images/test.png" alt=""/>
                       <h3>当超级IP遇到商业地产 魔兽成各大购物中心最火吸金王</h3>
                    </div>
                </div>
            </div>
        </div>  
         <div class="infor-show1">
            <a href="" class="btn-onekey"><img src="/static/images/icon/share.png" alt="">分享</a>
            <a href="" class="btn-onekey"><img src="/static/images/icon/collect.png" alt="">收藏</a>
            
        </div>
        <div class="infor-show infor-showend">
           <!--电话-->
            <div class="tel-wrap">
                <a href="tel:400-056-0599" class="event-tel clearfix">
                    <i class="fl tel"></i>
                    <p class="fr">场地咨询热线：400-056-0599</p>
                </a>
            </div>
        </div>
        
        <div class="infor-show infor-show-shadow">
           <div class="infor-price fl">
               <span>￥2000000元/天</span>
               <span class="price-underline clearfix ">￥3500000元/天</span>
            </div>
            <a href="" class="btn-onekey1 fr">一键询价</a>
            
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

            }
        },
         mounted () {
            var self = this;
            self.init();//调用轮播
        },
           methods:{
            /*轮播*/
            init : function () {
                var citySelectionSwiper = new Swiper('.selectedtopic-cont', {
                   pagination: '.swiper-pagination',
                //    nextButton: '.citysubject .btnright',
                //    prevButton: '.citysubject .btnleft',
                    paginationType : 'custom',
                    paginationCustomRender: function (swiper, current, total) {
                        return current + ' / ' + total;
                    },
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
