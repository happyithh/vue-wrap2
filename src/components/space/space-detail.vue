<template>
    <div class="container pbottom-37">
        <!--头部-->
        <header class="clearfix">
            <div class="left fl">
                 <a onclick='router.back()' class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
            </div>
            <div class="fl center">
                <h1 class="display-center">空间详情</h1>
            </div>
        </header>
        <!--头部end-->
        <!--轮播图start-->
            <div class="selectedtopic-cont top-banner">
                <div class="swiper-wrapper swiper-container">
                    <div class="swiper-slide" v-for="item in spaceDtl.img_paths">
                       <img :src="item.url_790_526" alt="首页banner图片01"/>
                    </div>
                </div>
                <!-- Add Pagination -->
                 <img class="pic-classfiy" src="/static/images/icon/pic.png" alt=""/>
                 <div class="swiper-pagination"></div>
             </div>
        <!--轮播图end-->
       <!--信息展示开始-->
        <div class="infor-show">
            <h2>{{spaceDtl.site_name}}</h2>
            <div class="base-info1">基本信息</div>
            <div class="base-info-detail"> 最大容量：<span>{{spaceDtl.Max_seating_capacity}}人</span></div>
            <div class="base-info-detail"> 空间面积<span>：{{
            spaceDtl.area}}㎡</span></div>
            <div class="base-info-detail"> 场地类型：<span>{{spaceDtl.site_type}}</span></div>
            <div class="base-info-detail"> 活动类型：<span>{{spaceDtl.service_type}}</span></div>
            <div class="base-info-detail"> 行业类型：<span>{{spaceDtl.industry_field}}</span></div>
        </div>
         <div class="infor-show" >
           <div class="base-info2"  >空间配套</div>
                <div class="pic-icon" v-for="item in arrSort">
                <img :src="'/static/images/assort/'+assortList[item]+'.png'" alt=""/>
                <div class="pic-icon-exp">{{item}}</div>
            </div>
           
        </div>
        <div class="infor-show">
            <div class="base-info2">预定须知</div>
           <div class="pic-icon-exp pic-icon-expl">{{spaceDtl.booking_notes}}</div>
            
        </div>
        <!--场地详情相关案例数据-->
        <div class="infor-show clearfix">
            <div class="base-info2">场地相关案例</div>
            <div class="selectedtopic-cont1 about-cases">
                  <div class="swiper-wrapper swiper-container">
                        <div class="swiper-slide"  v-for="item in relate_topics">
                            <router-link :to="item.img_paths.url ? item.img_paths.url : '/article/' + item.id">
                            <img :src="item.img_paths.length > 0 ? item.img_paths[0]['url_420_300'] : ''">

                            <h3>{{item.title}}</h3>
                        </router-link>
                        </div>
                    </div>
            </div>
        </div>  
        <!--收藏与分享-->
        <div class="infor-show1">
            <a href="javascript:;" class="fl btn-onekey1"><i class="icon icon-share"></i>分享</a>
            <!--<a href="" class="fr btn-onekey"><img src="/static/images/icon/collect.png" alt="">收藏</a>-->
           <a href="javascript:;" @click='changeCollect' class="fr btn-onekey1" :class=" {'hv': spaceDtl.follow }"><i class="icon icon-collection"></i>{{spaceDtl.follow ? "已收藏" : " 收藏"}}</a>
        </div>
       <!--电话-->
        <div class="tel-wrap">
            <a href="tel:400-056-0599" class="event-tel clearfix">
                <i class="fl tel"></i>
                <p class="fr">场地咨询热线：400-056-0599</p>
            </a>
        </div>
        <!--一键询价固定悬浮-->
        <div class="infor-show infor-show-shadow">
           <div class="infor-price fl">
               <span>{{spaceDtl.market_price_real}}{{spaceDtl.units}}</span>
               <p class="price-underline clearfix ">{{spaceDtl.market_price}}</p>
            </div>
            <a id='aksprice' @click="addInquiry" class="btnjoin btn-onekey1 fr"
                                       href="javascript:;"
               v-text="inquiryList.hasOwnProperty(spaceDtl.id) ? '已加入询价' : '一键询价' ">
            </a>
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
                
                assortList: {
                    '卫生间':'wc',
                    '化妆间':'dressing_room',
                    '休息室':'rest',
                    '空调暖气':'air_conditioning',
                    '网络WIFI':'wifi',
                    '投影LED':'led',
                    '灯光音响':'video',
                    '空间吊点':'ceiling',
                    '停车泊位':'parking',
                    '货运电梯':'lift',
                    '餐饮':'drink'
                },
                arrSort:[],
                spacesubs: [
                    1, 2, 3, 4
                ],
                site:{},
                relate_topics:'',
                spaceDtl : [],
                otherSpace : [],
                placeDtl : [],

            }
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
        mounted () {
            var self = this;
            self.getData();//调用数据
            
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
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween: 10,
                    autoplay: false
//                    freeMode: true
                });
            },
          
            getData(){
                var self = this;
                self.$store.commit('loading',true);
                $.get({
                    url: window.YUNAPI.SpaceDtl +'/'+ this.$route.params.id,
                    //  url: window.YUNAPI.placeDtl +'/'+ this.$route.params.id,
                    data : self.$store.getters.validationData,
                    success: function (data) {
                        self.spaceDtl = data.space;
                        self.otherSpace = data.other_spaces;
                        self.relate_topics = data.relate_topics
                        //场地配套
                        if(self.spaceDtl.facilities){
                            self.arrSort=self.spaceDtl.facilities.split(',');
                        }
                        setTimeout(function () {
                            self.init1();//调用轮播
                            self.init2();//调用轮播
                        },300)
                        setTimeout(function () {
                            $("img.lazy").lazyload({
                                effect : "fadeIn",
                                placeholder : '/static/images/placeholder.jpg'
                            });
                        },400)
                        self.$store.commit('loading',false);
                    },
                    error : function () {

                    }
                });
            },
            
            addInquiry : function () {
              // LS.set('inquiry',[id,name])
                var self = this
                self.$store.commit('inquiryChange',{id : self.spaceDtl.id, name : {
                    market_price : self.spaceDtl.market_price,
                    address : self.spaceDtl.address,
                    name : self.spaceDtl.name,
                    area : self.spaceDtl.area,
                    Max_seating_capacity : self.spaceDtl.Max_seating_capacity,
                    id : self.spaceDtl.id
                }, type : 1});
            //    if(self.personal.id==''){
            //         $.toptip('请先登录!',2000,'error');
            //             setTimeout(function(){
            //                 router.push('/form/askprice')
            //             },1000)
            //     }
                router.push('/form/askprice')
             },
            changeCollect(){
                var self = this
                var data = GlobleFun.objConcat(self.$store.getters.validationData, {
                    user_id: self.personalData.id,
                    followable_type: 'Space',
                    followable_id: self.spaceDtl.id
                })
                        // console.log(data)
                var success = function (data) {
                     if(data.status == 1){
                         self.spaceDtl.follow = !self.spaceDtl.follow
                     }else{
                        // console.log(1111)
                        // $.toptip(data.message,2000,status);
                        router.push('/order/Login')
                    }
                };
                GlobleFun.changeCollect(data,success)
            }
        },
        watch:{
            '$route':'getData'
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
