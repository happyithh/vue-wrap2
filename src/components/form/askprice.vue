<template>
    <div class="askprice">
        <!--头部-->
        <header class="clearfix">
            <div class="left fl">
                 <a onclick='router.back()' class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
            </div>
            <div class="fl center">
                <h1 class="display-center">一键询价</h1>
            </div>
        </header>
        <div class="inquiry-list">
            <ul>
                <li class="clearfix" v-for="item in inquiryList">
                    <div class="local-price">
                        <strong>{{item.market_price}}</strong> {{item.name}}</div>
                    <div class="local-price-detail clearfix">
                        <div class='max-people fl ml10'>最大容纳 {{item.Max_seating_capacity}}人面积 {{item.area}}㎡ 地址 {{item.address}}</div>
                         <!--<div class='max-square fl ml10'>{{item.city_name}} {{item.district}}|{{item.address}}</div>
                          <div class='add fl ml10'></div>-->
                    </div>
                </li>
            </ul>
        </div>
        <!--表单填写-->
        <form class="ifrom">
            <div class="base-info-tit">基本信息</div>
            <div class="base--detail">
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的称呼</div>
                    <input type="text" v-model='consult.contact' class="base-detail-name" placeholder="请输入您的真实姓名"/>

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的联系方式</div>
                    <input type="text" v-model='consult.phone' class="base-detail-name" placeholder="请输入您的11位手机号"/>

                </div>
               <div class="input-box">
                    <div class="base-info-name"><span>*</span>短信验证码</div>
                    <div class="check-box">
                        <input type="text" class="base-detail-name send-msg1 fl red " v-model='consult.auth_code' placeholder="请输入6位验证码"/>
                       <button type="button" class="send-msg fr" @click="sendPhoneCode">发送验证码</button>
                    </div>
                </div>
               <div class="onekey-rentail-wrap">
                    <a href="javascript:;" class="submit pop-sucess" @click='createInquiry'>提交</a>
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
                recommendSite : [],//定义变量
                inquiryListChange : {},
                // inquiryList:[],
                area:'',
                address:'',
                consult:{
                    contact:'',
                    phone:'',
                    auth_code:''
                },
                Max_seating_capacity:'',
                site_name:'',
                market_price_real:'',
                contact:'',
                phone:'',

            }
        },
        computed:{
            inquiryList () {
                return this.$store.state.inquiryList
            },
            personalData (){
                var personalData = this.$store.state.personalData
               return personalData
            }

        },
        mounted(){
            //获取 询价 列表
            // var e = {}
            // for( var i in this.inquiryList){
            //     e[i] = true
            // }
            var self = this;
            var inquirys = LS.get('inquiry')
            var ids = []
                for( var i in inquirys){
                    ids.push(i)
                }
                self.consult.space_ids = ids
            // this.inquiryListChange = e;
            if(self.consult.space_ids.length==0){
                    $.toptip('请先添加询价空间!',2000,'error');
                      setTimeout(function () {
                       router.back('/place') 
            },1500)
                    return;     
                }
            var self = this;
            setTimeout(function () {
                if(self.personalData.name){
                    self.consult.phone = self.personalData.mobile
                    self.consult.contact = self.personalData.name
                    self.consult.email = self.personalData.email
                }else{
                    $.toptip('请先登录!',2000,'error');
                    setTimeout(function () {
                        router.replace('/order/Login'); 
                    },1500)
                        return;  
                }
            },300)
        },
        // },
        methods:{
             sendPhoneCode(e){
                var self = this;
                var success = function (data) {
                   self.consult.code_token = data.data;
                };
                GlobleFun.sendPhoneCode(this.consult.phone,success,e.target)
            },
           createInquiry : function () {
                var self = this;
                if(!self.consult.contact){
                    $.toptip('姓名不能为空!',2000,'error');
                    return;
                }
                if(!self.consult.phone){
                    $.toptip('手机号不能为空!',2000,'error');
                    return;
                }
                var self = this;
                $.post({
                    url: window.YUNAPI.inquiryContent,
                    //data : self.consult,
                    data : GlobleFun.objConcat(self.$store.getters.validationData,self.consult, self.consult.space_ids),
                    success: function (data,status,xhr) {
                        //console.log(self.$store.getters.validationData)
                        var status = data.status == 1 ? 'success' : 'error';
                        if(data.status == 1){
                            $.alert({
                                title: '提交成功',
                                text: '客服专员将尽快联系你,请耐心等待!<br>客服热线 : 400-056-0599',
                                onOK: function () {
                                    LS.remove('inquiry')
                                    self.$store.state.inquiryCount=0;
                                    self.$store.state.inquiryList=0;
                                    // self.$store.commit('inquiryList');
                                    router.back('/place')
                                }
                            });
                        }else{
                            $.toptip(data.message,2000,status);
                        }
                        // data.data.access_token = xhr.getResponseHeader('access-token');
                        // data.data.client = xhr.getResponseHeader('client');
                        // self.$store.commit('personalDataChange',data.data);//保存个人信息

                    },
                    error : function () {

                    }
                });
           
            
                
                
                  
            },
        }
    }
           
    
</script>
<style scoped>
    .inquiry-list li{
        background: #f4f4f4;
        padding: 15px;
        border-bottom: 2px solid #ffffff;
    }
    .local-price{
        font-size: 0.9rem;
        margin-bottom: 5px;
    }
    .local-price strong{
        font-family:PingFangSC-Semibold;
    }
    .local-price-detail{
        font-size: 0.8rem;
        color: #666666;
    }
    .local-price-detail .fl{
        margin-right: 10px;
    }

    .base-info-tit{
        font-size: 1.06rem;
        padding: 15px 0 10px;
        text-align: center;
    }


   
</style>