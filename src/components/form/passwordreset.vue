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
        
            <div class="input-box">
                <div class="base-info-name">新密码</div>
                <input type="password" class="base-detail-name" v-model='consult.password' placeholder="输入新密码"/>

            </div>
            <div class="input-box">
                <div class="base-info-name">确认密码</div>
                <input type="password" class="base-detail-name"v-model='consult.password_confirmation' placeholder="请确认新密码"/>

            </div>
            <div class="onekey-rentail-wrap">
                    <a class="btn-onekey"@click='authPassword'>提交</a>
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
                // type:'sms',
                password:'',
                // mobile:'',
                password_confirmation:'',

                mobile:'',
               },
            }
        },
        computed:{
             personalData (){
                return this.$store.state.personalData
            },
        },
        mounted(){
             this.consult.mobile = this.personalData.mobile
        },
         methods:{
            sendPhoneCode(e){
                var self = this;
              
                var success = function (data) {
                    self.consult.code_token = data.data;
                };
                GlobleFun.sendPhoneCode(this.consult.mobile,success,e.target)
            },
             getPersonalData(data){
                this.$store.commit('getPersonalData',data)
            // router.replace('/')
            }, 
            authPassword : function () {
                var self = this;
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
                     $.post({
                        // type:'put',
                        url: window.YUNAPI.authPassword,
                        //data : self.consult,
                        
                        success: function (data) {
                           // console.log(self.consult)
                           // data=self.consult;
                            data:self.consult;
                            console.log(data)
                           // console.log( data==self.consult)
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
