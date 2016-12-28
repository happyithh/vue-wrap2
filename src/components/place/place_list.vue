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
                <h1 class="display-center">场地列表</h1>
            </div>
            <div class="right fr">
                <span class="numb fr">{{inquiryCount}}</span>
                <router-link class="btn-inquiry fr in" to="/form/askprice">询价</router-link>
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
                    <input type="text" placeholder="搜索" readonly="readonly" :value="placeSearchCondition.q.keyword">
                </router-link>
            </div>
            <div class="right fr">
                <span class="numb fr">{{inquiryCount}}</span>
                <a class="btn-inquiry fr in" href="/form/askprice">询价</a>
            </div>
        </header>

        <!--搜索框-->
        <div class="search-input-wrap-bg">
            <router-link to="/place/search" class="search-input-wrap clearfix">
                <input type="text" placeholder="搜索" readonly="readonly" :value="placeSearchCondition.q.keyword">
            </router-link>
        </div>

        <!--列表-star-->
        <div class="space-list">
            <ul>
                <li v-for="item in places">
                    <router-link :to="'/place/detail/'+item.id" class="img">
                        <img class="lazy" :title="item.title" v-bind:data-original="item.site_pictures.length > 0 ? item.site_pictures[0]['url_400_267'] : ''">
                        <div class="price">
                            {{item.lower_price}}
                        </div>
                    </router-link>
                    <div class="text clearfix">
                        <div class="fl">
                            <h3><router-link :to="'/article/'+item.site_id" class="title">{{item.title}}</router-link></h3>
                            <p>
                                <span>最大容纳 {{item.max_people}}人</span>
                                <span>面积 {{item.max_size}}㎡</span>
                            </p>
                            <p>地址 {{item.city_name}} {{item.district}}｜{{item.address}}</p>
                        </div>
                        <!--<a @click="addInquiry(spacesub.id,spacesub.name)" class="btn-join fr"-->
                                       <!--v-bind:class=" {'hv' : inquiryList.hasOwnProperty(spacesub.id)}" href="javascript:;"-->
                                        <!--v-text="inquiryList.hasOwnProperty(spacesub.id) ? '已加入询价' : '加入询价' ">-->
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
                places: []
            }
        },
        mounted () {
            var self = this;

            //悬浮搜索导航
            self.headerSearchFixed();
            self.getData();

        },
        computed:{
            inquiryCount () {
                return this.$store.state.inquiryCount
            },
            inquiryList () {
                return this.$store.state.inquiryList
            },
            placeSearchCondition(){
                return this.$store.state.placeSearchCondition;
            }
        },
        methods:{
            //悬浮搜索导航
            headerSearchFixed:function () {
                var htop=$('.space-list').offset().top;
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
            init : function () {
                $("img.lazy").lazyload({
                    effect : "fadeIn",
                    placeholder : '/static/images/placeholder.jpg'
                });
            },

            getData(){
                var self = this;
                self.$store.commit('loading',true);
                $.ajax({
                    url: window.YUNAPI.placeList,
                    data: self.placeSearchCondition,
                    success: function (data) {
//                        console.log(data,22222)
                        self.places = data.sites
                        setTimeout(function () {
                            self.init();//调用轮播
                            self.$store.commit('loading',false);
                        },300)
                    }
                })
            },
            addInquiry : function (id,name) {
//                LS.set('inquiry',[id,name])
                this.$store.commit('inquiryChange',{id : id, name : name, type : 2});
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
