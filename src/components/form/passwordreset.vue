<template>
    <div class="box">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                 <router-link to="/" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <p class="display-center">密码重置</p>
            </div>
            
            
        </header>
        <div class="personal-box">
            
            <div class="input-box">
                <div class="base-info-name">新密码</div>
                <input type="text" class="base-detail-name" placeholder="输入新密码"/>

            </div>
            <div class="input-box">
                <div class="base-info-name">确认密码</div>
                <input type="text" class="base-detail-name" placeholder="请确认新密码"/>

            </div>
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
    

</style>
