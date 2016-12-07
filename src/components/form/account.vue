<template>
    <div class="askprice">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                 <router-link to="/" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <p class="display-center">创建账号</p>
            </div>
            
        </header>

       
        <!--表单填写-->
        <form class="ifrom">
           <div class="base--detail ml">
                <div class="input-box">
                    <div class="base-info-name">您的称呼</div>
                    <input type="text" class="base-detail-name" placeholder="请输入您的称呼"/>
                </div>
                <div class="input-box">
                    <div class="base-info-name">手机号</div>
                    <input type="text" class="base-detail-name"placeholder="请输入11位手机号"/>
                 
                </div>
                <div class="input-box">
                    <div class="base-info-name">短信验证码</div>
                    <div class="check-box">
                        <input type="text" class="base-detail-name send-msg1 fl" placeholder="请输入6位验证码"/>
                        <div  class="send-msg fr"><a href="">40 S</a></div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">设置密码</div>
                    <input type="text" class="base-detail-name"placeholder="输入密码"/>
                </div>
                <div class="input-box">
                    <div class="base-info-name">确认密码</div>
                    <input type="text" class="base-detail-name"placeholder="输入密码"/>
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

</style>
