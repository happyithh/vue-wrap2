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
                <h1 class="display-center">登录/注册</h1>
            </div>
            
            
        </header>
        <div class="personal-box">
            
            <div class="input-box">
                <div class="base-info-name">手机号</div>
                <input type="text" class="base-detail-name" v-model='consult.mobile' placeholder="请输入11位手机号"/>

            </div>
            <div class="input-box">
                <div class="base-info-name">密码</div>
                <input type="text" class="base-detail-name"v-model='consult.password' placeholder="请输入登录密码"/>
            </div>
            <div class="remeberBox clearfix">
                <div class="fl checkBox">
                    <input class="fl" type="checkbox"/>
                    <p class="fl">记住我</p>
                </div>
                <div class="forgetBox fl">
                    <router-link to="/order/checkCodeLogin" class="back">
                        <a href="javascrpit:;">忘记密码</a>
                    </router-link>
                </div>
            </div>
            <div class="onekey-rentail-wrap clearfix">
                    <a href="javascript:;" class="btn-onekey"@click='login'>登录</a>
            </div>
            <div class="remeberBox clearfix">
                <div class="fl checkBox">
                    <router-link to="/form/RegForm" class="back">
                        <a href="javascrpit:;">创建账号</a>
                     </router-link>
                </div>
                <div class="forgetBox fl">
                    <router-link to="/order/checkCodeLogin" class="back">
                        <a href="javascrpit:;">改用验证码登录</a>
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
                consult:{
                    password:'',
                    mobile:'',
               },
               personalDataChange:''
              
            }
        },
         computed: {
           personalData (){
                return this.$store.state.personalData
            },
            loading(){
                return this.$store.state.loading
            },
//         
        },
         methods:{
             personalDataChange(id){
                this.$store.commit('personalDataChange',id)
                // router.replace('/')
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
                    if(!self.consult.password){
                        $.toptip('请输入密码',2000,'error');
                        return;
                    }
                    $.post({
                        // type:'put',
                        url: window.YUNAPI.login,
                        data : self.consult,
                        success: function (data,status,xhr) {
                            console.log(self.consult)
                            console.log(data)
                            var status = data.status == 1 ? 'success' : 'error';

                            if(data.status == 1){
                                
                               $.alert({
                                    title: '登录成功',
                                    // text: '客服专员将尽快联系你,请耐心等待!<br>客服热线 : 400-056-0599',
                                    onOK: function () {
                                         router.replace('/')
                                        setTimeout('',5000)
                                    },
                                
                                });
                                data.data.access_token = xhr.getResponseHeader('access-token');
                                data.data.client = xhr.getResponseHeader('client');
                                self.$store.commit('personalDataChange',data.data);//保存个人信息
                                router.replace(self.$route.path);  // 刷新页面
                                console.log(xhr.getResponseHeader('access-token'),111)
                                console.log(xhr.getResponseHeader('client'),222)
                              
                                // self.$store.commit('personalDataChange',data.data)
                            }else{
                                $.toptip(data.message,2000,status);
                            }

                        },
                       error : function () {

                        }
                    });
                    
                
            },

        //记住密码
        rememberPassword(){}
           
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
