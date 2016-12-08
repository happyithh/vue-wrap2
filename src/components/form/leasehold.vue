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
        <form class="ifrom"  id='submit-demand'>
           <div class="base--detail ml">
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的称呼</div>
                    <input type="text" class="base-detail-name red" v-model='demand.contact' placeholder="请输入您的真实姓名"/>
                   
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的联系方式</div>
                    <input type="text" class="base-detail-name red" v-model='demand.phone' placeholder="请输入您的11位手机号"/>
                    <!--<div class="warning"><i class="icons icon-warningbg"></i>请输入正确的11位手机号码</div>-->
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>短信验证码</div>
                    <div class="check-box">
                        <input type="text" class="base-detail-name send-msg1 fl red " v-model='demand.auth_code' placeholder="请输入6位验证码"/>
                        <div  class="send-msg fr" id="sendCode" @click="sendPhoneCode">发送验证码</div>
                    </div>
                    
                   
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动城市</div>
                    <div class="triangle">
                        <select v-model="demand.order_city">
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
                        <select v-model="demand.number_of_activities">
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
                        <select v-model="demand.activity_type">
                          <option v-for="(value,key) in searchCondition.activity_type":label="value":value="key"></option>
                        </select>

                        
                    </div>
                   
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>其他要求</div>
                    <div class="advise">
                        <textarea v-model='demand. activities_required' placeholder="请填写更多的详细信息，帮助您快速找到合适的场所"> </textarea>
                       <div class="font120">120字</div>
                    </div>
                    
                </div>
                <div class="onekey-rentail-wrap">
                    <a href="javascript:;" class="btn-onekey " @click="submitHoldEvent">提交</a>
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
                loginerror: '',
                //是否记住密码
                remember_paw: 1,
                login_height: 500,
                peoplenumbs: [
                    111,222
                ],
                subjects:[
                    1,2,3
                ],
                shownumbs: 0,
                showtype: 0,
                showcitys: 0,
                showstate: 0,
                showcooper:0,
                demand : {
                    phone : '',
                    contact : '',
                    order_city : 1,
                    number_of_activities : "50",
                    time : ['',''],
                    user_id : 1,
                    activity_type : 0,
                    auth_code : '',
                    activities_required : '',
                    code_token : '',
                    s_time:'',
                    e_time:'',
                    ip_city:'上海'
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

            $('.pop-sucess').click(function () {
                $.modal({
                    title: "提交成功",
                    text: "客服专员将尽快联系你，请耐心等待！<br>客服热线：400-056-0599",
                    buttons: [
                        { text: "关闭", onClick: function(){ console.log(1)} },

                    ]
                });
            })
            $(function() {

                window.submitDemand = $("#submit-demand").validate({
                    debug: false,
                    errorElement: "div",
                    errorPlacement: function(error, element) {
                        error.addClass('warning').appendTo(element.parent("li"));
                        error.parent('li').addClass('war')
                    },
                    success : function (e) {
                        e.parents('li').removeClass('war');
                        e.parents('li').find('.warning').remove();
                    },
                    rules : {
                        phone : {
                            required : true,
//                            minlength : 11,
                            // 自定义方法：校验手机号在数据库中是否存在
                            // checkPhoneExist : true,
                            isMobile : true
                        },
                    }
                })
            })
            if(typeof this.$route.query.activity_type != 'undefined'){
                this.demand.activity_type = this.$route.query.activity_type * 1
            }
            if(typeof this.$route.query.number_of_activities != 'undefined'){
                this.demand.number_of_activities = this.$route.query.number_of_activities
            }
        },
        methods: {
            //获取活动人数、类型
            submitHoldEvent : function () {
                 
                var self = this;

                if(!this.personalData.uid){ // 本地验证是否登陆
                     console.log(1);
                    this.$parent.showForm.login = true//?
                   
                    return
                }

                var isValid = $("#submit-demand").valid();

                var sd = new Date(self.demand.time[0]);
                var ed = new Date(self.demand.time[1]);
                self.demand.s_time = sd.getFullYear() + '-' + (sd.getMonth() + 1) + '-' + sd.getDate() ;
                self.demand.e_time = ed.getFullYear() + '-' + (ed.getMonth() + 1) + '-' + ed.getDate() ;

                //验证是否登陆
                self.demand.uid = this.personalData.uid
                self.demand['access-token'] = this.personalData.access_token
                self.demand.client= this.personalData.client

                if(isValid){
                    self.$parent.loading = true;
                    $.post({
                        url: window.YUNAPI.submitHoldEvent,
                        data : self.demand,
                        success: function (data) {

                            self.$parent.loading = false;
                            if (data.status == 1){
                                self.$message({
                                    message: data.message,
                                    type: 'success'
                                });
//                                for( var key in self.demand){ // 提交成功清空数据
//                                    self.demand[key] = ''
//                                }
                                router.push('/event')

                            }else{
                                self.$message({
                                    message: data.message,
                                    type: 'error'
                                });
                            }

                        },
                        error : function () {

                        }
                    });
                }
            },
                sendPhoneCode : function () {
                    var self = this;
                    var success = function (data) {
                        if (data.status == 1){
                            self.demand.code_token = data.data;
                        }
                    };
                    GlobleFun.sendPhoneCode(self.demand.phone,success,'#sendCode');
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
