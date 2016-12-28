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
                <h1 class="display-center">找回密码</h1>
            </div>
            
            
        </header>
        <div class="personal-box">
            
            <div class="input-box">
                <div class="base-info-name">手机号</div>
                <input type="text" class="base-detail-name"v-model='consult.mobile' placeholder="请输入11位手机号"/>
            </div>
             <div class="input-box">
                <div class="base-info-name">短信验证码</div>
                <div class="check-box">
                    <input type="text" class="base-detail-name send-msg1 fl red "v-model='consult.auth_code' placeholder="请输入6位验证码"/>
                    <button class="send-msg fr"@click='sendPhoneCode'>发送验证码</button>
                </div>
             </div>
            <div class="onekey-rentail-wrap">
                <!--<router-link to="/form/passwordreset" class="back">-->
                 <a href='javascript:;' class="btn-onekey"@click='authPassword'>下一步</a>
                    <!--<i class="icons icon-arrowleft white"></i>
                    返回-->
                <!--</router-link>-->
                   
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
                auth_code : '',
                code_token : '',
                mobile:'',
              },
            }
            personalDataChange:''
        },
        computed:{
           personalData (){
                return this.$store.state.personalData
            }    
        },
        mounted(){
            // var self = this;
            // self.$store.commit('getPersonalData')
        },
        methods:{
          sendPhoneCode(e){
                //console.log($(".base-detail-name").val())
                //window.localStorage.setItem("moble",$(".base-detail-name").val());
                var self = this;
                var success = function (data) {
                    self.consult.code_token = data.data;
                };
                GlobleFun.sendPhoneCode(this.consult.mobile,success,e.target)
            },
       
            authPassword : function (data) {
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
                        $.toptip('请输入正确的验证码!',2000,'error');
                        return;
                    }

                    LS.set('changePasswordData',self.consult)
                    router.push('/form/passwordreset')
                    
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
