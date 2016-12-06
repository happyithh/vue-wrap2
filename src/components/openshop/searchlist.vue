<template>
    <div class="container">

        <!--头部-->
        <header class="clearfix">
            <div class="fl left p20">
                <a href="" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
            </div>
            <div class="fl center p78">
                <div class="search-input-wrap lg clearfix">
                    <input type="text" placeholder="商圈／地标／机场／火车站／场地名">
                </div>
            </div>
        </header>

        <!--表单填写-->
        <form class="ifrom">
            <div class="base--detail ml">
                <div class="input-box">
                    <div class="base-info-name">区域范围</div>
                    <div class="tags clearfix">
                        <span class="active">不限</span>
                        <span>市中心</span>
                        <span>区中心</span>
                        <span>社区中心</span>
                        <span>学校</span>
                        <span>交通枢纽</span>
                        <span>商务区</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">行政区域</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择行政区域">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">场地类型</div>
                    <div class="tags clearfix">
                        <span>不限</span>
                        <span>秀场展馆</span>
                        <span>商业广场</span>
                        <span>艺术馆画廊</span>
                        <span>星级酒店</span>
                        <span>影院剧院</span>
                        <span>咖啡馆书店</span>
                        <span>秀场展馆</span>
                        <span>商业广场</span>
                        <span>艺术馆画廊</span>
                        <span>星级酒店</span>
                        <span>影院剧院</span>
                        <span>咖啡馆书店</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">价格</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择价格">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">落位区域</div>
                    <div class="tags clearfix">
                        <span class="active">不限</span>
                        <span>室内</span>
                        <span>室外</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">可用面积</div>
                    <div class="tags area clearfix">
                        <span class="active">不限</span>
                        <span>小于200m²</span>
                        <span>200-500m²</span>
                        <span>800-1000m²</span>
                        <span>1000-2000m²</span>
                        <span>2000m²以上</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">空间层高</div>
                    <div class="triangle">
                        <input style="width: 120px" type="text" class="base-detail-name" placeholder="请输入层高">
                        <span>米 以上</span>
                    </div>
                </div>

                <div class="onekey-rentail-wrap">
                    <a href="" class="btn-onekey">搜索</a>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
    import 'assets/css/event.css'
    import 'assets/css/form.css'

    export default {
        data () {
            return {

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
