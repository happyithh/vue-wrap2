<template>
    <div class="container">

        <!--头部-->
        <header class="clearfix">
            <div class="left fl">
                <a onclick="router.back()" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
            </div>
            <div class="fl center">
                <h1 class="display-center">我要办活动</h1>
            </div>
            <div class="right fr">
                <span class="numb fr">{{inquiryCount}}</span>
                <router-link class="btn-inquiry in" to="/form/askprice">询价</router-link>
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
                <router-link to="/place/search" class="search-input-wrap clearfix">
                    <input type="text" placeholder="搜索" readonly="readonly">
                </router-link>
            </div>
            <div class="right fr">
                <span class="numb fr">{{inquiryCount}}</span>
                <router-link class="btn-inquiry fr in" to="/form/askprice">询价</router-link>
            </div>
        </header>

        <!--搜索框-->
        <div class="search-input-wrap-bg">
            <router-link to="/place" class="search-input-wrap clearfix">
                <input type="text" placeholder="搜索" readonly="readonly">
            </router-link>
        </div>

        <!--一键租场地-->
        <div class="ev-onekey-rentail-wrap">
            <h2>我们只做一件事 精耕线下场地</h2>
            <p>免收服务费，一站式搞定，低于市场价20%</p>
            <router-link to="/form/leasehold" class="btn-onekey">一键租场地</router-link>
        </div>

        <!--列表-star-->
        <div class="space-list">
            <ul>
                <li v-for="item in sites">
                    <router-link :to="'/place/detail/'+item.id" class="img">
                        <img class="lazy"  v-bind:data-original="item.site_pictures.length > 0 ? item.site_pictures[0]['url_400_267'] : ''" :title="item.site_name">
                        <div class="price">
                            {{item.lower_price}}
                        </div>
                    </router-link>
                    <div class="text clearfix">
                        <div class="fl">
                            <h3><router-link :to="'/place/detail/'+item.site_id">{{item.title}}</router-link></h3>
                            <p>
                                <span>最大容纳 {{item.max_people}}人</span>
                                <span>面积 {{item.max_size}}㎡</span>
                            </p>
                            <p>地址 {{item.city_name}} {{item.district}}｜{{item.address}}</p>
                        </div>
                        <!--<a class="fr btn-join" href="javascript:;">加入询价</a>-->
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
                venues:[],
                sites:[]
            }
        },
        mounted () {
            var self = this;

            //悬浮搜索导航
            self.headerSearchFixed();
            self.getData();
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
                $.ajax({
                    url: window.YUNAPI.active,
                    success: function (data) {
                        //console.log(data)
                        self.venues=data.space_recommend;
                        self.sites = data.site_recommend;

                        setTimeout(function () {
                            $("img.lazy").lazyload({
                                effect : "fadeIn",
                                placeholder : '/static/images/placeholder.jpg'
                            });
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
