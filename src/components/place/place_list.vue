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
                            <h3><router-link :to="'/place/detail/'+item.id" class="title">{{item.title}}</router-link></h3>
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

            <!--加载更多-->
            <a id="morePlace" class="more-place" v-if="!isNoMoreData" @click="getData('more')" href="javascript:;">
                <span>加载更多</span>
                <i class="icon-arrowbottom"></i>
            </a>
            <p style="text-align: center" v-if="isNoMoreData">没有更多了...</p>
        </div><!--列表-end-->

        <!--回到顶部-->
        <div class="listSlideUp img" @click="listSlideUp">
            <span class="icon-arrowtop"></span>
        </div>

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
                places: [],
                isNoMoreData : false,
                page : 1,
            }
        },
        mounted () {
            var self = this;

            //悬浮搜索导航
            self.headerSearchFixed();
            self.getData();

            $(document).on('scroll',function () {
                var scrollTop = $('body').scrollTop();
                if(scrollTop > 400){
                    $('.listSlideUp').show();
                }else {
                    $('.listSlideUp').hide();
                }

                //console.log(scrollTop,55)
            });
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
            //置顶
            listSlideUp(){
                $('html,body').animate({scrollTop:0},300);
            },

            //悬浮搜索导航
            headerSearchFixed:function () {
                //var htop=$('.space-list ul').offset().top; //会被首页的css污染，暂弃，直接用具体数字134px
                $(document).scroll(function () {
                    var scrolltop=$(document).scrollTop();
                    if(scrolltop>134){
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

            getData(type){
                var self = this;
                self.$store.commit('loading',true);

                //参数
                if(type == 'more'){
                    self.page++;
                    $('#morePlace span').text('正在加载...')
                }

                if(this.$route.query.type == 'all'){
                    self.placeSearchCondition.city_id = self.$store.state.city_id;
                }
                var ajaxdata = self.placeSearchCondition.page = self.page
                $.ajax({
                    url: window.YUNAPI.placeList,
                    data: ajaxdata,
                    success: function (data) {
//                        console.log(data,22222)
                        if(type == 'more'){
                            self.places = self.places.concat(data.sites);
                        }else{
                            self.places = data.sites
                        }

                        //self.places = data.sites
                        setTimeout(function () {
                            self.init();//调用轮播
                            self.$store.commit('loading',false);
                            $('#morePlace span').text('加载更多')
                        },300)
                    },
                    error: function (data) {
                        $('#morePlace span').text('加载更多')
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
