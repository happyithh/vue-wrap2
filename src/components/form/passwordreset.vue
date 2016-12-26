<template>
    <div class="box">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                 <router-link to="/form/passwordfind" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <h1 class="display-center">密码重置</h1>
            </div>
            
            
        </header>
        <div class="personal-box">
            
            <div class="input-box">
                <div class="base-info-name">新密码</div>
                <input type="password" class="base-detail-name" v-model='consult.password' placeholder="输入新密码"/>

            </div>
            <div class="input-box">
                <div class="base-info-name">确认密码</div>
                <input type="password" class="base-detail-name"v-model='consult.password_confirmation' placeholder="请确认新密码"/>

            </div>
            <div class="onekey-rentail-wrap">
                    <a href="javascript:;" class="btn-onekey"@click='authPassword'>提交</a>
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
                type:'sms',
                password:'',
                password_confirmation:'',
                mobile:'',
               },
               personalDataChange:'',
            }
        },
        computed:{
             personalData (){
                return this.$store.state.personalData
            },
        },
        mounted(){
             this.$store.commit('getPersonalData');
         },
         methods:{
            sendPhoneCode(e){
                var self = this;
                var success = function (data) {
                    self.consult.code_token = data.data;
                };
                GlobleFun.sendPhoneCode(this.consult.mobile,success,e.target)
            },
             personalDataChange(data){
                this.$store.commit('personalDataChange',data)
            }, 
            authPassword : function () {
                var self = this;
                 console.log(self.$store.state.personalData)
                    if(!self.consult.password){
                        $.toptip('请输入新密码',2000,'error');
                        return;
                    }
                    if(self.consult.password.length<6){
                        $.toptip('新密码不能少于6位',2000,'error');
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

                    var dataOne = GlobleFun.objConcat(this.$store.getters.validationData,{
                           password:self.consult.password,
                           password_confirmation:self.consult.password_confirmation,
                           moblie:self.consult.moblie,
                           type:"sms"
                            }
                        )

                    GlobleFun.objConcat()
                     $.ajax({
                        type:'put',
                        url: window.YUNAPI.authPassword,
                        data : GlobleFun.objConcat(dataOne,LS.get('changePasswordData')),
                        success: function (data,status,xhr) {
                            console.log(data)
                            self.consult.moblie =self.$store.state.personalData.mobile;
                            console.log(self.consult)
                           var status = data.status == 1 ? 'success' : 'error';
                            if(data.status == 1){
                                $.alert({
                                    title: '密码设置成功',
                                    text: '请重新登录',
                                    onOK: function () {
                                         router.replace('/order/Login')
                                        setTimeout('',5000)
                                    },
                                
                                });
                                data.data.access_token = xhr.getResponseHeader('access-token');
                                data.data.client = xhr.getResponseHeader('client');
                                self.$store.commit('personalDataChange',data.data);//保存个人信息
                                // console.log(xhr.getResponseHeader('access-token'),111)
                                // console.log(xhr.getResponseHeader('client'),222)
                                LS.remove('changePasswordData')
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
