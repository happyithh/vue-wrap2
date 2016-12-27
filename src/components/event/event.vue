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
                <h1 class="display-center">我要办活动</h1>
            </div>
            <div class="right fr">
                <a class="btn-inquiry in" href="/form/askprice">询价</a>
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
                <router-link to="/place" class="search-input-wrap clearfix">
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
                <li v-for="item in venues">
                    <router-link :to="'/place/detail/'+item.site_id" class="img">
                        <img :src="item.img_paths.length > 0 ? item.img_paths[0]['url_400_267'] : ''" :title="item.site_name">
                        <div class="price">
                            {{item.special_price}}
                        </div>
                    </router-link>
                    <div class="text clearfix">
                        <div class="fl">
                            <h3><router-link :to="'/event/'+item.site_id">{{item.site_name}}</router-link></h3>
                            <p>
                                <span>最大容纳 {{item.site_max_people}}人</span>
                                <span>面积 {{item.area}}㎡</span>
                            </p>
                            <p>地址 {{item.city_name}} {{item.areas}}｜{{item.address}}</p>
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
                venues:[]
            }
        },
        mounted () {
            var self = this;

            //悬浮搜索导航
            self.headerSearchFixed();
            self.getData();
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

                        //移动端去价格单位
//                        for(var i = 0; i < data.space_recommend.length; i++){
//                            if(data.space_recommend[i].special_price=='面议'){
//                                $('.space-list li:eq('+i+')').find('.price').find('sup').remove();
//                            }else {
//                                self.venues[i].special_price=data.space_recommend[i].special_price.toString().replace('￥','');
//                            }
//                        }
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
