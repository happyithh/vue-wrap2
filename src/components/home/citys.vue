<template>
        <transition :name="transitionName">
        <div class="container child-view">
            <!--头部-->
            <header class="clearfix">
                <div class="left fl">
                    <a onclick='router.back()' class="back">
                        <i class="icons icon-arrowleft white"></i>
                        返回
                    </a>
                </div>
                <div class="fl center">
                    <h1 class="display-center">选择城市</h1>
                </div>
            </header>

            <div class="container-citys">
                <div class="position">
                    <div class="title">定位城市</div>
                    <div class="wrap clearfix">
                        <i class="fl icon-position"></i>
                        <input class="fl city" type="text" v-model="geoCity" readonly="readonly" onfocus="this.blur()">
                    </div>
                </div>
                <div class="select-city">
                    <div class="title">选择城市</div>
                    <div class="tags clearfix">
                        <!--<span class="active">北京市</span>-->
                        <span  v-bind:class="{'active': city_id == item.id}" @click="cityChange(item.id)" v-for="item in cities">{{item.name}}</span>
                    </div>
                </div>

                <!--了解更多-->
                <div class="see-more">
                    <a href="http://www.yunspace.com.cn/m/city_collaborate">
                        <img src="/static/images/icon/friends.png">
                        <p>城市合伙人</p>
                        <p class="see-more-btn">了解更多</p>
                    </a>
                </div>
            </div>
        </div>
        </transition>
</template>

<script>
    import 'assets/list.css'
    import 'assets/css/citys.css'

    export default {
        data () {
            return {
                places: [1, 2, 3],
                transitionName: 'slide-left',
                geoCity : '正在定位...'
            }
        },
        computed: {
            cities (){
                return this.$store.state.cities
            },
            personalData (){
                return this.$store.state.personalData
            },
            loading(){
                return this.$store.state.loading
            },
//            currentCityId(){
//                return this.$store.state.city_id
//            },
            city_id(){
                 return this.$store.state.city_id
            }
        },
        mounted () {
            var self = this;
            self.$store.commit('loading',false);
            $('.container').css({
                'min-height':$(window).height()
            })

            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
//            var mk = new BMap.Marker(r.point);
//            map.addOverlay(mk);
//            map.panTo(r.point);
                    self.geoCity = r.address.city
                }
                else {
                    alert('failed'+this.getStatus());
                }
            },{enableHighAccuracy: true})
        },
        methods: {
          
            cityChange(id){
                this.$store.commit('cityChange',id)
                router.replace('/')
            },
            skipEmptyElementForArray(arr){
                var a = [];
                $.each(arr, function (i, v) {
                    var data = $.trim(v);//$.trim()函数来自jQuery
                    if ('' != data) {
                        a.push(data);
                    }
                });
                return a;
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = this.skipEmptyElementForArray(to.path.split('/')).length
                const fromDepth = this.skipEmptyElementForArray(from.path.split('/')).length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container{
        height: 100%;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }


    /*!* Enter and leave animations can use different *!*/
    /*!* durations and timing functions.              *!*/
    /*.slide-fade-enter-active {*/
        /*transition: all .3s ease;*/
    /*}*/
    /*.slide-fade-leave-active {*/
        /*transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    /*}*/
    /*.slide-fade-enter, .slide-fade-leave-active {*/
        /*transform: translateX(10px);*/
        /*opacity: 0;*/
    /*}*/


    /*.fade-enter-active, .fade-leave-active {*/
        /*transition: opacity .5s ease;*/
    /*}*/

    /*.fade-enter, .fade-leave-active {*/
        /*opacity: 0*/
    /*}*/

    /*.child-view {*/
        /*position: absolute;*/
        /*transition: all .5s cubic-bezier(.55, 0, .1, 1);*/
    /*}*/

    /*.slide-left-enter, .slide-right-leave-active {*/
        /*opacity: 0;*/
        /*-webkit-transform: translate(30px, 0);*/
        /*transform: translate(30px, 0);*/
    /*}*/

    /*.slide-left-leave-active, .slide-right-enter {*/
        /*opacity: 0;*/
        /*-webkit-transform: translate(-30px, 0);*/
        /*transform: translate(-30px, 0);*/
    /*}*/

</style>
