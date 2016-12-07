<template>
    <div class="askprice">
        <!--头部-->
        <header class="clearfix">
            <div class="left fl">
                <router-link to="/form/collect" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <p class="display-center">场地空间</p>
            </div>
        </header>
        <div class="inquiry-list">
            <ul>
                <li class="clearfix">
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
                </li>
                <li class="clearfix">
                    <div class="local-price"><strong>￥90000元/天</strong> 东方万国会议中心</div>
                    <div class="local-price-detail clearfix">
                        <div class='max-people fl ml10'>最大容纳 200人</div>
                         <div class='max-square fl ml10'>面积 200人</div>
                          <div class='add fl ml10'>地址 上海市 浦东新区 | 陆家嘴</div>
                    </div>
                </li>
            </ul>
        </div>
        <!--表单填写-->
        
    </div>
</template>
<script>
    import 'assets/css/form.css'
    export default {
        name: 'home',
        data () {
            return {

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
        methods:{

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