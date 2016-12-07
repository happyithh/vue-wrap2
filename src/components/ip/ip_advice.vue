<template>
    <div class="askprice">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                <router-link to="/ip" class="back" >
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <p class="display-center">合作咨询</p>
            </div>

        </header>


        <!--表单填写-->
        <form class="ifrom">
            <div class="base--detail ml">
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的称呼</div>
                    <input type="text" v-model="consult.the_contact" class="base-detail-name" placeholder="请输入您的真实姓名">

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的联系方式</div>
                    <input type="text" v-model="consult.phone" class="base-detail-name"placeholder="请输入您的11位手机号">

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>短信验证码</div>
                    <div class="check-box">
                        <input type="text" v-model="consult.auth_code" class="base-detail-name send-msg1 fl" placeholder="请输入6位验证码">
                        <div  class="send-msg fr"><a href="javascript:;" @click="sendPhoneCode">发送验证码</a></div>
                    </div>
                </div>
                <!--<div class="input-box">-->
                    <!--<div class="base-info-name"><span>*</span>活动城市</div>-->
                    <!--<div class="triangle">-->
                        <!--<input type="text" class="base-detail-name fl" placeholder="请选择目的地，城市">-->
                        <!--<div class="triangle-right fr">-->
                            <!--<div class="icon-triangedown icon-triangedown1"></div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动城市</div>
                    <div class="triangle">
                        <select v-model="consult.city_id">
                            <option value="">请选择目的地，城市</option>
                            <option v-for="item in cities" :value="item.id">{{item.name}}</option>
                            <!--<option>活动类型</option>-->
                        </select>
                    </div>
                </div>

                <div class="input-box">
                    <div class="base-info-name"><span>*</span>其他要求</div>
                    <div class="advise">
                        <textarea v-model="consult.consulting_content" placeholder="请填写更多的详细信息，帮助您快速找到合适的场所"> </textarea>
                        <div class="font120">120字</div>
                    </div>

                </div>
                <div class="onekey-rentail-wrap">
                    <a href="javascript:;" @click="submitConsult" class="btn-onekey">提交</a>
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
                ],
                consult : {
                    the_contact : '',
                    phone : '',
                    consulting_content : '',
                    project_id : '',
                    city_id : '',
                    code_token : '',
                    auth_code : '',
                    title : '',
                },
            }
        },
        computed: {
            cities (){
                return this.$store.state.cities
            },
            personalData (){
                return this.$store.state.personalData
            },
            loading(){
                return this.$store.state.loading
            },
            city_id(){
                var cityId = this.$store.state.city_id
//                if (cityId){
//                    this.consult.city_id = cityId
//                }
                return cityId
            }
        },
        methods:{
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
                if(!self.consult.consulting_content){
                    $.toptip('其他要求不能为空!',2000,'error');
                    return;
                }
                $.post({
                    url: window.YUNAPI.submitConsult,
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
        }
    }


</script>
<style scoped>

</style>
