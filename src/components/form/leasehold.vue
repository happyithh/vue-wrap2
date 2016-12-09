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
                <h1 class="display-center">一键租场地</h1>
            </div>
            
        </header>

       
        <!--表单填写-->
        <form class="ifrom"  id='submit-consult'>
           <div class="base--detail ml">
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的称呼</div>
                    <input type="text" class="base-detail-name red" v-model='consult.contact' placeholder="请输入您的真实姓名"/>
                   
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的联系方式</div>
                    <input type="text" class="base-detail-name red" v-model='consult.phone' placeholder="请输入您的11位手机号"/>
                    <!--<div class="warning"><i class="icons icon-warningbg"></i>请输入正确的11位手机号码</div>-->
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>短信验证码</div>
                    <div class="check-box">
                        <input type="text" class="base-detail-name send-msg1 fl red " v-model='consult.auth_code' placeholder="请输入6位验证码"/>
                        <div  class="send-msg fr" id="sendCode" @click="sendPhoneCode">发送验证码</div>
                    </div>
                    
                   
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动城市</div>
                    <div class="triangle">
                        <select v-model="consult.order_city">
                            <option v-for="item in searchCondition.cities":label="item.name":value="item.id">请选择目的地，城市</option>
                            <!--<option>上海</option>
                            <option>北京</option>
                            <option>深圳</option>
                            <option>成都</option>-->
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动人数</div>
                    <div class="triangle">
                        <select v-model="consult.number_of_activities">
                            <option v-for="(value,key) in searchCondition.activity_people":label="value":value="key"></option>
                           
                        </select>

                        
                    </div>
                    
                    
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动时间</div>
                    <input type="text" class="base-detail-name" placeholder="请选择日期范围"/>
                   
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动类型</div>
                    
                    <div class="triangle">
                        <select v-model="consult.activity_type">
                          <option v-for="(value,key) in searchCondition.activity_type":label="value":value="key"></option>
                        </select>

                        
                    </div>
                   
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>其他要求</div>
                    <div class="advise">
                        <textarea v-model='consult. activities_required' placeholder="请填写更多的详细信息，帮助您快速找到合适的场所"> </textarea>
                       <div class="font120">120字</div>
                    </div>
                    
                </div>
                <div class="onekey-rentail-wrap">
                    <a href="javascript:;" class="btn-onekey " @click="submitConsult">提交</a>
                </div>
            </div>
           
        </form>
    </div>
</template>
<script type="text/javascript">
    import 'assets/css/form.css'
    export default {
        name: 'home',
        data () {
          return {
                consult:{
                    contact:'',
                    phone:'',
                    auth_code:'验证码',
                    code_token:'token',
                    order_city:'活动城市',
                    number_of_activities:'活动人数',
                    activity_type:'类型',
                    activities_required:'其他要求',
                    }

            }
       
        },
         computed : {
            searchCondition (){
                return this.$store.state.searchCondition
            },
            personalData (){
                return this.$store.state.personalData
            }
        },
          mounted () {
            var self = this;
            setTimeout(function () {
                self.$parent.loading = false;
            },300)

           
        },
        methods: {
             sendPhoneCode(e){
                var self = this;
                var success = function (data) {
                    self.consult.code_token = data.data;
                };
                GlobleFun.sendPhoneCode(this.consult.phone,success,e.target)
            },
            submitConsult : function () {
                var self = this;
                if(!self.consult.the_contact){
                    $.toptip('姓名不能为空!',2000,'error');
                    return;
                }
                if(!self.consult.phone){
                    $.toptip('手机号不能为空!',2000,'error');
                    return;
                }
                if(!self.consult.auth_code){
                    $.toptip('验证码不能为空!',2000,'error');
                    return;
                }
                if(!self.consult.code_token){
                    $.toptip('请先获取验证码!',2000,'error');
                    return;
                }
                if(!self.consult.order_city){
                    $.toptip('请先获取活动城市!',2000,'error');
                    return;
                }
                if(!self.consult.number_of_activities){
                    $.toptip('请先获取活动人数!',2000,'error');
                    return;
                }
                if(!self.consult.activity_type){
                    $.toptip('请先获取活动类型!',2000,'error');
                    return;
                }
                if(!self.consult.consulting_content){
                    $.toptip('其他要求不能为空!',2000,'error');
                    return;
                }
                   $.post({
                    url: window.YUNAPI.createBooking,
                    data : self.consult,
                    success: function (data) {
                        var status = data.status == 1 ? 'success' : 'error';

                        if(data.status == 1){
                            $.alert({
                                title: '提交成功',
                                text: '客服专员将尽快联系你,请耐心等待!<br>客服热线 : 400-056-0599',
                                onOK: function () {
                                    router.back()
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
               

        },
    }
           
    
</script>
<style scoped>
    /*错误提示*/
.warning{
    float:left;
    width: 100%;
    height: 30px;
    line-height: 32px;
    background: #ff0000;
    color: #fff;
    position: relative;
}
.warning:before{
    display: block;
    float: left;
    margin-left: 24px;
    margin-right: 5px;
    margin-top: 6px;
    content: '';

    width: 18px;
    height: 18px;
    background: url(/static/images/yun.png) no-repeat;
    background-position: -623px -200px;
}
.warning .icons{
    display: block;
    float: left;
    margin-left: 24px;
    margin-right: 5px;
}
.warning .icon-warningbg{
    margin-top: 6px;
}

</style>
