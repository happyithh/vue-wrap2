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
                <p class="display-center">选择城市</p>
            </div>
        </header>

        <div class="container-citys">
            <div class="position">
                <div class="title">定位城市</div>
                <div class="wrap clearfix">
                    <i class="fl icon-position"></i>
                    <input class="fl city" type="text" value="上海市" readonly="readonly" onfocus="this.blur()">
                </div>
            </div>
            <div class="select-city">
                <div class="title">选择城市</div>
                <div class="tags clearfix">
                    <span class="active">北京市</span>
                    <span>重庆市</span>
                    <span>沈阳市</span>
                    <span>上海市</span>
                    <span>北京市</span>
                    <span>重庆市</span>
                    <span>沈阳市</span>
                    <span>上海市</span>
                    <span>北京市</span>
                    <span>重庆市</span>
                    <span>沈阳市</span>
                    <span>上海市</span>
                    <span>北京市</span>
                </div>
            </div>

            <!--了解更多-->
            <div class="see-more">
                <a href="">
                    <img src="/static/images/icon/friends.png">
                    <p>城市合伙人</p>
                    <p class="see-more-btn">了解更多</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import 'assets/list.css'
    import 'assets/css/citys.css'

    export default {
        data () {
            return {
                places: [1,2,3]
            }
        },
        mounted () {
            var self = this;

            //悬浮搜索导航
            self.headerSearchFixed();
        },
        methods:{
            //悬浮搜索导航
            headerSearchFixed:function () {
                var htop=$('.ev-onekey-rentail-wrap').offset().top;
                $(document).scroll(function () {
                    var scrolltop=$(document).scrollTop();
                    if(scrolltop>htop){
                        $('header.fixed').css({
                            top:0
                        });
                    }else{
                        $('header.fixed').css({
                            top:-120
                        });
                    }
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
