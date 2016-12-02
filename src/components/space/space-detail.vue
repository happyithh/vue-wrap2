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
                        <a href="javascript:;" target="_blank">
                            <img src="/static/images/test.png" alt="">
                            
                        </a>
                    </div>
                </div>
            </div>
        <!--轮播图end-->

        
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
