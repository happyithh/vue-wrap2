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
                <p class="display-center">我的收藏</p>
            </div>
            
        </header>
        <a href="">
            <div class="infor-show">
                <div class="collect-line">
                    <img class="fl mt" src="../../../static/images/icon/collect_hv.png" alt="">
                    <div class="fl">场地空间</div>
                    <i class="icon-arrowright mt fr"></i>
                </div>
            </div>
        </a>
        <a href="">
            <div class="infor-show">
                <div class="collect-line">
                    <img class="fl mt" src="../../../static/images/icon/collect_hv.png" alt="">
                    <div class="fl">案例文章</div>
                    <i class="icon-arrowright mt fr"></i>
                </div>
            </div>
        </a>
        <a href="">
            <div class="infor-show">
                <div class="collect-line">
                    <img class="fl mt" src="../../../static/images/icon/collect_hv.png" alt="">
                    <div class="fl">精选专题</div>
                    <i class="icon-arrowright mt fr"></i>
                </div>
            </div>
        </a>
    </div>
    
</template>
<script>
    
    import 'assets/css.css'
    import 'assets/css/collect.css'
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
