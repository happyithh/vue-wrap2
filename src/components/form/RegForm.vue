<template>
    <div class="askprice">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                 <a onclick='router.back()' class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
            </div>
            <div class="fl center">
                <h1 class="display-center">创建账号</h1>
            </div>
            
        </header>

       
        <!--表单填写-->
        <form class="ifrom">
           <div class="base--detail ml">
                <div class="input-box">
                    <div class="base-info-name">您的称呼</div>
                    <input type="text" class="base-detail-name" v-model='consult.name'placeholder="请输入您的称呼"/>
                </div>
                <div class="input-box">
                    <div class="base-info-name">手机号</div>
                    <input type="text" v-model='consult.mobile' class="base-detail-name"placeholder="请输入11位手机号"/>
                 
                </div>
                <div class="input-box">
                    <div class="base-info-name">短信验证码</div>
                    <div class="check-box">
                        <input type="text" v-model='consult.auth_code' class="base-detail-name send-msg1 fl" placeholder="请输入6位验证码"/>
                        <button type="button" class="send-msg fr"@click='sendPhoneCode'>发送验证码</button>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">设置密码</div>
                    <input type="password" v-model='consult.password' class="base-detail-name"placeholder="输入密码"/>
                </div>
                <div class="input-box">
                    <div class="base-info-name">确认密码</div>
                    <input type="password"v-model='consult.password_confirmation' class="base-detail-name"placeholder="输入密码"/>
                </div>
                <div class="onekey-rentail-wrap">
                    <a href="javascript:;" class="btn-onekey" @click='register'>提交</a>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    import 'assets/css.css'
    import 'assets/css/form.css'
    export default {
        name: 'home',
        data () {
            return {
                informations:[
                    {}
                ],
                consult:{
                    mobile:'',
                    password:'',
                    password_confirmation:'',
                    auth_code:'',
                    code_token:'',
                    name:'',
                }

            }
        },
        methods:{
            sendPhoneCode(e){
                var self = this;
              
                var success = function (data) {
                    self.consult.code_token = data.data;
                };
                GlobleFun.sendPhoneCode(this.consult.mobile,success,e.target)
            },
            register : function () {
                var self = this;
                    if(!self.consult.name){
                        $.toptip('请输入您的称呼',2000,'error');
                        return;
                    }
                    if(!self.consult.mobile){
                        $.toptip('请输入您的手机号',2000,'error');
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
                    if(!self.consult.password){
                        $.toptip('请设置密码',2000,'error');
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
                     $.post({
                        // type:'put',
                        url: window.YUNAPI.register,
                        data : GlobleFun.objConcat(self.$store.getters.validationData,self.consult),
                        success: function (data) {
                            var status = data.status == 1 ? 'success' : 'error';

                            if(data.status == 1){
                                $.post({
                                    url: window.YUNAPI.login,
                                    data : self.consult,
                                    success: function (data,status,xhr) {
                                        // console.log(self.consult)
                                        // console.log(data)
                                        var status = data.status == 1 ? 'success' : 'error';

                                            if(data.status == 1){
                                                data.data.access_token = xhr.getResponseHeader('access-token');
                                                data.data.client = xhr.getResponseHeader('client');
                                                self.$store.commit('personalDataChange',data.data);//保存个人信息
                                                router.replace(self.$route.path);  // 刷新页面
                                                // console.log(xhr.getResponseHeader('access-token'),111)
                                                // console.log(xhr.getResponseHeader('client'),222)
                                            
                                                // self.$store.commit('personalDataChange',data.data)
                                            }
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

</style>
