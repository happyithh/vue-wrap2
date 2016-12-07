<template>
    <div class="box">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                <a href="" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
            </div>
            <div class="fl center">
                <p class="display-center">个人中心</p>
            </div>
            <div class="right fr">
                <a class="btn-inquiry fr in" href="javascript:;">询价</a>
            </div>
            
        </header>
        <div class="personal-box">
            <div class="img-box">
               <a href=""><img src="/static/images/test_logo.png" alt=""></a>
               <div class="person-name">张大春</div>
            </div>
           
            <a href="">
                <div class="infor-show">
                    <div class="collect-line">
                        <img class="fl mt" src="../../../static/images/icon/password.png" alt="">
                        <div class="fl">密码设置</div>
                        <i class="icon-arrowright mt fr"></i>
                    </div>
                </div>
            </a>
            <a href="">
                <div class="infor-show">
                    <div class="collect-line">
                        <img class="fl mt" src="../../../static/images/icon/collect.png" alt="">
                        <div class="fl">我的收藏</div>
                        <i class="icon-arrowright mt fr"></i>
                    </div>
                </div>
            </a>
            <a href="">
                <div class="infor-show">
                    <div class="collect-line">
                        <img class="fl mt" src="../../../static/images/icon/feed_back.png" alt="">
                        <div class="fl">意见反馈</div>
                        <i class="icon-arrowright mt fr"></i>
                    </div>
                </div>
            </a>
             <div class="onekey-rentail-wrap">
                    <a href="" class="btn-onekey">提交</a>
            </div>
         </div>     
        
        
    </div>
    
</template>
<script>
    import 'assets/css.css'
    import 'assets/css/form.css'
    export default {
      
        data () {
            return {
               
            }
        }
    }
           
    
</script>
<style scoped>
    .red::-webkit-input-placeholder { color: #999999; }
    .up-photo-text{
        font-size:.6rem;
        color:#999999;
        text-align:left;
        margin-top: 7px;
        margin-bottom:20px; 
    }
    .up-photo-text span{
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
    .personal-box{
        width: 100%;
        height: auto;
        padding:17px 15px 0;
        
    }
    .img-box{
        text-align: center;
    }
    .img-box img{
        width: 75px;
        height: 75px;
      
    }
    .infor-show{
        margin: 0 15px;
        height: 46px;
        line-height: 46px;
        border-bottom:1px solid #222222;
        overflow: hidden;
        font-size: .8rem;
    }

    .infor-show i{
        margin: 15px 10px;
    }


    .infor-show img{
        margin-right: 15px;
        width:15px;
        height: 15px;
    }
    .mt{
        margin-top:15px;
    }
    .person-name{
        margin: 8px 0;
        font-size: .8rem;
    }

</style>
