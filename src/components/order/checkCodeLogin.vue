<template>
    <div class="box">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                  <a onclick='router.back()' class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
            </div>
            <div class="fl center">
                <h1 class="display-center">验证码登录</h1>
            </div>
            
            
        </header>
        <div class="personal-box">
            
            <div class="input-box">
                <div class="base-info-name">手机号</div>
                <input type="text" class="base-detail-name" v-model='consult.mobile' placeholder="请输入11位手机号"/>

            </div>
           <div class="input-box">
                <div class="base-info-name">短信验证码</div>
                <div class="check-box">
                    <input type="text" class="base-detail-name send-msg1 fl red "v-model='consult.auth_code' placeholder="请输入6位验证码"/>
                    <button class="send-msg fr"@click='sendPhoneCode'>发送验证码</button>
                </div>
             </div>
            <div class="remeberBox clearfix">
                <div class="fl checkBox"@click='checked'>
                    <input class="fl " v-model="isRememberPhone" type="checkbox" @click='remember()'/>
                    <p class="fl">记住我</p>
                </div>
                <div class="forgetBox fl"><a href="/form/passwordfind">忘记密码？</a></div>
            </div>
            <div class="onekey-rentail-wrap clearfix">
                    <a href="javascript:;" class="btn-onekey"@click='login'>登录</a>
            </div>
            <div class="remeberBox clearfix">
                <div class="fl checkBox">
                    <p><a href="/form/RegForm">创建账号</a></p>
                </div>
                <div class="forgetBox fl">
                    <router-link to="/order/Login">
                        <a href="javascrpit:;">改用密码登录</a>
                    </router-link>
                </div>
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
                isRememberPhone : false,
                consult:{
                    
                    auth_code:'',
                    code_token:'',
                    mobile:'',
                    sign_in_type:'sms',
               },
            }
        },
         methods:{
             checked:function(){
                    var self = this;
                    $(self).hasClass("checkedBox")? $(self).removeClass("checkedBox"):$(self).addClass("checkedBox");
            },
             personalDataChange(id){
                this.$store.commit('personalDataChange',id)
                // router.replace('/')
            },
            remember:function(){
                var self = this;
                if(self.isRememberPhone){ // 是否记住手机号
                    // self.isRememberPhone=!self.isRememberPhone;
                    LS.remove('loginPhone')
                    console.log(self.consult.mobile)
                }else{
                    LS.set('loginPhone',self.consult.mobile)
                     // LS.set('loginPhone',self.consult.mobile)
                     
                }
             },
            
            sendPhoneCode(e){
                var self = this;
                var success = function (data) {
                    self.consult.code_token = data.data;
                };
                GlobleFun.sendPhoneCode(this.consult.mobile,success,e.target)
            },
            login : function () {
                var self = this;
                if(!self.consult.mobile){
                        $.toptip('请输入手机号',2000,'error');
                        return;
                    }
                    if(!self.consult.code_token){
                        $.toptip('请先获取验证码!',2000,'error');
                        return;
                    }
                    if(!self.consult.auth_code){
                        $.toptip('验证码不能为空!',2000,'error');
                        return;
                    }
                    if(self.consult.auth_code.length<6){
                        $.toptip('验证码错误!',2000,'error');
                        return;
                    }
                    $.post({
                        // type:'put',
                        url: window.YUNAPI.login,
                        data : self.consult,
                        success: function (data,status,xhr) {
                            var status = data.status == 1 ? 'success' : 'error';

                            if(data.status == 1){
                               $.alert({
                                    title: '登录成功',
                                    // text: '客服专员将尽快联系你,请耐心等待!<br>客服热线 : 400-056-0599',
                                    onOK: function () {
                                        router.replace('/')
                                        setTimeout('',5000)
                                    }
                                });
                                data.data.access_token = xhr.getResponseHeader('access-token');
                                data.data.client = xhr.getResponseHeader('client');
                                self.$store.commit('personalDataChange',data.data)
                            }else{
                                $.toptip(data.message,2000,status);
                            }

                        },
                        error : function () {

                        }
                    });
                
            },
           
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
    .checkBox input{
        width:20px;
        height:20px;
        border: 1px solid #999999;
        -webkit-appearance: none;
    }
    .checkBox input:checked{
        background-image: url(/static/images/icon/selected.png);
        background-size:cover;
        border: none;
    }
    .personal-box{
        width: 100%;
        height: auto;
        padding:17px 15px 0;
        
    }
    .remeberBox{
        width:100%;
        height:50px;
        font-size:.9rem;
       color: #999999;
    }
    .remeberBox a{
        color: #999999;
    }
    .checkBox, .forgetBox{
        margin-top: 10px;
        width:50%;
        height: 50px;

    }
    .checkBox input{
        width:20px;
        height:20px;
        border: 1px solid #999999;
    }
    .checkedBox {
        background: url('/static/images/icon/selected.png');
     }
    .checkBox p{ 
         margin-left: 10px;
         font-size: .9rem;
    }
    .forgetBox{
        text-align: right;
    }
    .onekey-rentail-wrap{
        padding:0;
    }
   
    
    

    

</style>
