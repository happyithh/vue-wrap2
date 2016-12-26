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
                <h1 class="display-center">密码设置</h1>
            </div>
            
            
        </header>
        <div class="personal-box">
            
            <div class="input-box">
                <div class="base-info-name">手机号</div>
                <input type="text"v-model='consult.mobile' class="base-detail-name" placeholder="请输入11位手机号"/>
            </div>
            <div class="input-box">
                <div class="base-info-name">短信验证码</div>
                <div class="check-box">
                    <input type="text" class="base-detail-name send-msg1 fl" placeholder="请输入6位验证码" v-model="consult.auth_code"/>
                   <a href="javascript:;" class="send-msg fr" @click="sendPhoneCode">发送验证码</a>
                </div>
             </div>
            <div class="input-box">
                <div class="base-info-name">新密码</div>
                <input type="password" v-model="consult.password" class="base-detail-name" placeholder="输入新密码"/>

            </div>
            <div class="input-box">
                <div class="base-info-name">确认密码</div>
                <input type="password"v-model="consult.password_confirmation"  class="base-detail-name" placeholder="请确认新密码"/>

            </div>
            <div class="onekey-rentail-wrap">
                    <a href="javascript:;" class="btn-onekey" @click="authPassword">提交</a>
            </div>
        </div>
        
        
    </div>
    
</template>
<script>
    import 'assets/css.css'
    import 'assets/css/form.css'
    export default {
      name:'home',
        data () {
            return {
               consult:{
                type:'sms',
                auth_code : '',
                code_token : '',
                password:'',
                mobile:'',
                password_confirmation:'',
                
               },
            }
        },
        computed: {
            personalData (){
                return this.$store.state.personalData
            },
            loading(){
                return this.$store.state.loading
            },
        },
        methods:{
            sendPhoneCode(e){
                var self = this;
              
                var success = function (data) {
                    self.consult.code_token = data.data;
                };
                GlobleFun.sendPhoneCode(this.consult.mobile,success,e.target)
            },
            authPassword : function () {
                var self = this;
                    if(!self.consult.mobile){
                        $.toptip('手机号不能为空!',2000,'error');
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
                        $.toptip('验证码错误',2000,'error');
                        return;
                    }
                    if(self.consult.password.length<6){
                        $.toptip('新密码不少于6位',2000,'error');
                        return;
                    }
                    if(!self.consult.password_confirmation){
                        $.toptip('请确认新密码',2000,'error');
                        return;
                    }
                   
                    if(self.consult.password!=self.consult.password_confirmation){
                        $.toptip('两次密码不相同',2000,'error');
                        return;
                    }
                     $.ajax({
                        type:'put',
                        url: window.YUNAPI.authPassword,
                        data : self.consult,
                        success: function (data) {
                            console.log(data)
                            var status = data.status == 1 ? 'success' : 'error';
                            if(data.status == 1){
                                $.alert({
                                    title: '修改成功',
                                    text: '请重新登录',
                                    onOK: function () {
                                        router.replace('/')
                                        //window.location.href='/'
                                    }
                                });
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
    .personal-box{
        width: 100%;
        height: auto;
        padding:17px 15px 0;
        
    }
    

</style>
