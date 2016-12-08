<template>
    <div class="box">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                 <router-link to="/form/personal-center" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <h1 class="display-center">个人信息</h1>
            </div>
            <div class="right fr">
                <a class="btn-inquiry fr in" href="javascript:;">保存</a>
            </div>
            
        </header>
        <div class="personal-box">
            <div class="img-box">
               <a href=""> <img src="/static/images/test_logo.png" alt=""/></a>
            </div>
            
            <div class="input-box">
            <div class="base-info-name">您的称呼</div>
            <input type="text" class="base-detail-name" placeholder="请输入您的称呼"/>

        </div>
        <div class="input-box">
            <div class="base-info-name">手机号</div>
            <input type="text" class="base-detail-name" placeholder="请输入11位手机号"/>

        </div>
        <div class="input-box">
            <div class="base-info-name">公司名称</div>
            <input type="text" class="base-detail-name" placeholder="请输入公司名称"/>

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
    .img-box a{
        width: 75px;
        height: 75px;
        margin: 0 auto;
    }
    
    .img-box img{
        width: 75px;
        height: 75px; 
      
    }

</style>
