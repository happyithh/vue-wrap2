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
                <p class="display-center">我要办活动</p>
            </div>
            <div class="right fr">
                <a class="btn-inquiry in" href="javascript:;">询价</a>
            </div>
        </header>

        <!--搜索框-->
        <div class="input-wrap-bg">
            <div class="input-wrap clearfix">
                <input type="text" placeholder="搜索">
            </div>
        </div>

        <!--一键租场地-->
        <div class="onekey-rentail-wrap">
            <h2>我们只做一件事 精耕线下场地</h2>
            <p>免收服务费，一站式搞定，低于市场价20%</p>
            <a href="" class="btn-onekey">一键租场地</a>
        </div>

        <!--列表-star-->
        <div class="space-list">
            <ul>
                <li v-for="item in places">
                    <a class="img" href="javascript:;">
                        <img src="/static/images/test.png">
                        <div class="price">
                            <sup>￥</sup>30000 元/天<span>起</span>
                        </div>
                    </a>
                    <div class="text clearfix">
                        <div class="fl">
                            <h3>骥海商业文化传播有限公司会议骥海商业文化传播有限公司会议</h3>
                            <p>
                                <span>最大容纳 200人</span>
                                <span>面积 200㎡</span>
                            </p>
                            <p>地址 上海市 浦东新区｜陆家嘴</p>
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
                places: [1,2,3]
            }
        },
        mounted () {
            var self = this;

        },
        methods:{

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
