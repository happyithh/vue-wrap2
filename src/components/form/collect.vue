<template>
    <div class="askprice">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                <router-link to="/form/personal-center" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <h1 class="display-center">我的收藏</h1>
            </div>
            
        </header>
         <router-link to="/form/space-list" class="back">
            <div class="infor-show">
                <div class="collect-line">
                    <img class="fl mt" src="../../../static/images/icon/collect_hv.png" alt=""/>
                    <div class="fl">场地空间</div>
                    <i class="icon-arrowright mt fr"></i>
                </div>
            </div>
       </router-link>
         <router-link to="/form/case-article" class="back">
            <div class="infor-show">
                <div class="collect-line">
                    <img class="fl mt" src="../../../static/images/icon/collect_hv.png" alt=""/>
                    <div class="fl">案例文章</div>
                    <i class="icon-arrowright mt fr"></i>
                </div>
            </div>
      </router-link>
         <router-link to="/form/topics" class="back">
            <div class="infor-show">
                <div class="collect-line">
                    <img class="fl mt" src="../../../static/images/icon/collect_hv.png" alt=""/>
                    <div class="fl">精选专题</div>
                    <i class="icon-arrowright mt fr"></i>
                </div>
            </div>
       </router-link>
    </div>
    
</template>
<script>
    
    import 'assets/css.css'
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
    .infor-show{
        margin: 0 15px;
        height: 46px;
        line-height: 46px;
        border-bottom:1px solid #222222;
        overflow: hidden;
        font-size: 1rem;
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



</style>
