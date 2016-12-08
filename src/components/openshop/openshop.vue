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
                <p class="display-center">我要开快闪店</p>
            </div>
            <div class="right fr">
                <span class="numb fr">3</span>
                <a class="btn-inquiry fr in" href="/form/askprice">询价</a>
            </div>
        </header>

        <!--悬浮搜索导航-->
        <header class="clearfix fixed">
            <div class="left fl">
                <router-link to="/" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <router-link to="/openshop/search" class="search-input-wrap clearfix">
                    <input type="text" placeholder="搜索" readonly="readonly">
                </router-link>
            </div>
            <div class="right fr">
                <span class="numb fr">3</span>
                <a class="btn-inquiry fr in" href="/form/askprice">询价</a>
            </div>
        </header>

        <!--搜索框-->
        <div class="search-input-wrap-bg">
            <router-link to="/openshop/search" class="search-input-wrap clearfix">
                <input type="text" placeholder="搜索" readonly="readonly">
            </router-link>
        </div>

        <!--一键租场地-->
        <div class="ev-onekey-rentail-wrap">
            <h2>打造未来商业移动的新体验</h2>
            <p>找到适合你的商业短租场地</p>
            <!--<a href="/openshop/form" class="btn-onekey">立即提交需求</a>-->
            <router-link to="/openshop/form" class="btn-onekey">
                立即提交需求
            </router-link>
        </div>

        <!--列表-star-->
        <div class="space-list">
            <ul>
                <li v-for="item in sites">
                    <a class="img" href="javascript:;">
                        <!--<img src="/static/images/test.png">-->

                        <img class="lazy" v-bind:data-original="item.site_pictures.length > 0 ? item.site_pictures[0]['url_790_526'] : ''">
                        <div class="price">
                            <!--<sup>￥</sup>30000 元/天<span>起</span>-->
                            {{item.lower_price}}
                        </div>
                    </a>
                    <div class="text clearfix">
                        <div class="fl">
                            <a class="title" href="javascript:;">{{item.title}}</a>
                            <p>
                                <span>最大容纳 {{item.max_people}}人</span>
                                <span>面积 {{item.max_size}}㎡</span>
                            </p>
                            <p>地址 {{item.city_name}} {{item.district}}｜{{item.address}}</p>
                        </div>
                        <a class="fr btn-join" href="javascript:;">加入询价</a>
                    </div>
                </li>
            </ul>
        </div><!--列表-end-->

        <!--电话-->
        <div class="tel-wrap">
            <a href="tel:400-056-0599" class="event-tel clearfix">
                <i class="fl tel"></i>
                <p class="fr">场地咨询热线：400-056-0599</p>
            </a>
        </div>
    </div>
</template>

<script>
    import 'assets/list.css'
    import 'assets/css/event.css'

    export default {
        data () {
            return {
                sites : []
            }
        },
        mounted () {
            var self = this;

            //悬浮搜索导航
            self.headerSearchFixed();

            self.getData()
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
            },
            getData(){
                var self = this
                self.$store.commit('loading',true);
                $.ajax({
                    url: window.YUNAPI.openShop,
                    data: {
                        city_id: self.$store.state.city_id
                    },
                    success: function (data) {
                        self.sites = data.sites

                        setTimeout(function () {
                            $("img.lazy").lazyload({
                                effect : "fadeIn",
                                placeholder : '/static/images/placeholder.jpg'
                            });
                            self.$store.commit('loading',false);
                        },200)
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
