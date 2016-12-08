<template>
    <div class="askprice">
        <!--头部-->
        <header class="clearfix">
            <div class="left fl">
                <router-link to="/" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <h1 class="display-center">一键询价</h1>
            </div>
        </header>
        <div class="inquiry-list">
            <ul>
                <!--<li class="clearfix">
                    <div class="local-price"><strong>￥90000元/天</strong> 东方万国会议中心</div>
                    <div class="local-price-detail clearfix">
                        <div class='max-people fl ml10'>最大容纳 200人</div>
                         <div class='max-square fl ml10'>面积 200人</div>
                          <div class='add fl ml10'>地址 上海市 浦东新区 | 陆家嘴</div>
                    </div>
                </li>
                <li class="clearfix">
                    <div class="local-price"><strong>￥30000元/天</strong> 深圳科兴科学园国际会议中心-深圳科学园国际会议中心</div>
                    <div class="local-price-detail clearfix">
                        <div class='max-people fl ml10'>最大容纳 200人</div>
                         <div class='max-square fl ml10'>面积 200人</div>
                          <div class='add fl ml10'>地址 上海市 浦东新区 | 陆家嘴</div>
                    </div>
                </li>-->
                <li class="clearfix" v-for="item in recommendSite">
                    <div class="local-price"><strong>￥{{item.market_price}}元/天</strong> {{item.title}}</div>
                    <div class="local-price-detail clearfix">
                        <div class='max-people fl ml10'>最大容纳 {{item.max_people}}人</div>
                         <div class='max-square fl ml10'>面积 {{item.max_size}}㎡</div>
                          <div class='add fl ml10'>地址 {{item.address}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <!--表单填写-->
        <div class="ifrom">
            <div class="base-info-tit">基本信息</div>
            <div class="base--detail">
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的称呼</div>
                    <input type="text" class="base-detail-name" placeholder="请输入您的真实姓名"/>

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的联系方式</div>
                    <input type="text" class="base-detail-name" placeholder="请输入您的11位手机号"/>

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>邮箱</div>
                    <input type="text" class="base-detail-name" placeholder="请填写您的邮箱地址"/>
                </div>
               <div class="onekey-rentail-wrap">
                    <a href="javascript:;" class="btn-onekey pop-sucess">提交</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import 'assets/css/form.css'
    export default {
        name: 'home',
        data () {
            return {
                 recommendSite : [],//定义变量

            }
        },
        mounted () {
            var self = this;

            $('.pop-sucess').click(function () {
                $.modal({
                    title: "提交成功",
                    text: "客服专员将尽快联系你，请耐心等待！<br>客服热线：400-056-0599",
                    buttons: [
                        { text: "关闭", onClick: function(){ console.log(1)} },

                    ]
                });
            })

        },
         mounted () {
            var self = this;
            self.getData()
        },
        methods:{
            getData(){
                var self = this
                $.ajax({
                    url: window.YUNAPI.home,
                    data: {
                        city_id: self.$store.state.city_id
                    },
                    success: function (data) {
                        console.log(data)
                        self.recommendSite = data.home_recommend_site
                        
                        
                    }
                })
            }
        }
    }
           
    
</script>
<style scoped>
    .inquiry-list li{
        background: #f4f4f4;
        padding: 15px;
        border-bottom: 2px solid #fff;
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
        color: #666;
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