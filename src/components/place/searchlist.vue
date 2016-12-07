<template>
    <div class="container">

        <!--头部-->
        <header class="clearfix">
            <div class="fl left p20">
                <router-link to="/" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
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
                    <div class="base-info-name">城市</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择目的地、城市">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">场地位置</div>
                    <div class="tags select clearfix">
                        <span class="active">不限</span>
                        <select>
                            <option>不限</option>
                            <option>行政区nbjjj1</option>
                            <option>行政区2</option>
                        </select>
                        <select>
                            <option>不限</option>
                            <option>商圈1</option>
                            <option>商圈2</option>
                        </select>
                        <select>
                            <option>不限</option>
                            <option>地铁1</option>
                            <option>地铁2</option>
                        </select>
                        <span>环线</span>
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
                    <div class="base-info-name">活动类型</div>
                    <div class="triangle">
                        <select>
                            <option>不限</option>
                            <option>活动类型</option>
                            <option>活动类型</option>
                            <option>活动类型</option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">容纳人数</div>
                    <div class="tags clearfix">
                        <span>不限</span>
                        <span>50人以下</span>
                        <span>50-100人</span>
                        <span>100-300人</span>
                        <span>300-500人</span>
                        <span>500-1000人</span>
                        <span>1000人以上</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">预算范围</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择预算">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">面积范围</div>
                    <div class="tags clearfix">
                        <span>不限</span>
                        <span>小于200m²</span>
                        <span>50-100人</span>
                        <span>100-300人</span>
                        <span>300-500人</span>
                        <span>500-1000人</span>
                        <span>1000人以上</span>
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
                    <div class="base-info-name">配套服务</div>
                    <div class="tags area clearfix">
                        <span class="active">不限</span>
                        <span>洗手间</span>
                        <span>化妆间</span>
                        <span>休息室</span>
                        <span>吊点</span>
                        <span>空调</span>
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
    .input-box .tags select{
        float: left;
        display: block;
        width: 25%;
        height: 40px;
        line-height: 20px;
        padding: 10px 20px 10px 6px;
        text-align: center;
        background: #f4f4f4;
        color: #999;
        font-size: 0.7rem;
        margin-bottom: 10px;
        box-sizing: border-box;
        border-right: 1px solid #fff;
        border-radius: 0;
        background-image: url("/static/images/icon/arrow_down.png");
        background-repeat: no-repeat;
        background-size: 0.66rem auto;
        background-position: 88% 17px;
    }
    .input-box .tags span{
        height: 40px;
        line-height: 20px;
    }

    @media screen and (min-width: 640px) {
        .input-box .tags select,
        .input-box .tags span{
            height: 50px;
            line-height: 30px;
        }
    }

</style>
