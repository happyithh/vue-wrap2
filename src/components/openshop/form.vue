<template>
    <div class="askprice">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                <a href="" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
            </div>
            <div class="fl center">
                <p class="display-center">我要开快闪店</p>
            </div>

        </header>


        <!--表单填写-->
        <form class="ifrom">
            <div class="base--detail ml">
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的称呼</div>
                    <input type="text" class="base-detail-name" placeholder="请输入您的真实姓名">

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的联系方式</div>
                    <input type="text" class="base-detail-name" placeholder="请输入您的11位手机号">

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>公司名称</div>
                    <input type="text" class="base-detail-name" placeholder="请输入公司名称">

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动城市</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择目的地、城市">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动区域</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="不限">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>落位区域</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择落位区域">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>商业客流</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择商业客流">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>

                <div class="op-title">
                    补充条件<span>(完善信息会优先处理)</span>
                </div>

                <div class="input-box">
                    <div class="base-info-name">目标客群</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择目标客群">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">开店类型</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择开店类型">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">数量</div>
                    <input style="width: 120px" type="text" class="base-detail-name" placeholder="请输入数量">
                    <span>米 以上</span>
                </div>
                <div class="input-box">
                    <div class="base-info-name">面积</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择面积">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">层高</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择层高">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">档期周期</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择档期周期">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">装置尺寸</div>
                    <div class="size first">
                        <input type="text" class="base-detail-name" placeholder="长＊高＊宽 40*50*80">
                        <span>/m</span>
                    </div>
                    <div class="size">
                        <input type="text" class="base-detail-name" placeholder="用电功率 10-100">
                        <span>/m</span>
                    </div>
                    <div class="size">
                        <input type="text" class="base-detail-name" placeholder="上下水 10-100">
                        <span>/m</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">其他要求（可多选）</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择其他要求">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>

                <div class="onekey-rentail-wrap">
                    <a href="" class="btn-onekey">提交</a>
                </div>
            </div>
        </form>
    </div>

</template>
<script>
    import 'assets/css/form.css'
    export default {
        name: 'home',
        data () {
            return {
                informations:[
                    {}
                ]
            }
        }
    }


</script>
<style scoped>
    .red::-webkit-input-placeholder { color: #999999; }
    .up-photo-text{
        font-family:PingFangSC-Regular;
        font-size:.6rem;
        color:#999999;
        text-align:left;
        margin-top: 7px;
        margin-bottom:20px;
    }
    .up-photo-text span{
        font-family:PingFangSC-Regular;
        font-size:.6rem;
        color:#000000;
        text-align:left;
    }
    .input-box select{
        width: 100%;
        background: #ffffff;

    }
    .up-photo .site-pic{
        width: 150px;
        height: 150px
    }


    .input-box select option{
        background: #ffffff;
    }


</style>
