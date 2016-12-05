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
           
            <div class="base-info">空间详情</div>
                
               
            </div>
            
            
        </div>
        <!--<div class="infor-show">
            <div class="base-info">预定须知</div>
            <div class="base-info-detail-booking"> <span>100人以内，12小时以内。超出100人，每人加收500元，最多允许超出150人。</span></div>
        </div>-->
        <!--<div class="infor-show">
            <div class="base-info">场地相关案例</div>
                <div class="selectedtopic-cont">
                <div class="swiper-wrapper swiper-container">
                    <div class="swiper-slide" v-for="item in topicOfSelect">
                       <img src="/static/images/test.png" alt=""/>
                     </div>
                   
                </div>
                <p class="">当超级IP遇到商业地产 魔兽成各大购物中心最火吸金王</p>
                
                
            </div>
        </div>-->
    
    
        <!--信息展示结束-->


        


    </div>
</template>

<script>
    import 'assets/libs/swiper/swiper.js'
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
