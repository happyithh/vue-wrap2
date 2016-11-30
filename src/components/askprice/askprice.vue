<template>
    <div class="askprice">
        <div class="title">
            <div class="title-left">
                <div class="comeback">
                    <div class="comeback-img"></div>
                    <div class="comeback-text">返回</div>
                </div>
            </div>      
            <div class="title-right">
                <div class="title-askprice ml">一键询价</div>
            </div>      
        </div>
        <div class="list">
            <ul>
                <li v-for='info in informations'class="ml">
                    <div class="local-price"><strong>￥90000元/天</strong> 东方万国会议中心</div>
                    <div class="local-price-detail">
                        <div class='max-people fl ml10'>最大容纳200人</div>
                         <div class='max-square fl ml10'>面积200人</div>
                          <div class='add fl ml10'>地址 上海市 浦东新区 | 陆家嘴</div>
                    </div>
                    
                </li>
                <div class="blank"></div>
                <li v-for='info in informations' class="ml">
                    <div class="local-price"><strong>￥30000元/天</strong> 深圳科兴科学园国际会议中心-深圳科学园国际会议中心</div>
                    <div class="local-price-detail">
                        <div class='max-people fl ml10'>最大容纳200人</div>
                         <div class='max-square fl ml10'>面积200人</div>
                          <div class='add fl ml10'>地址 上海市 浦东新区 | 陆家嘴</div>
                    </div>
                </li>
                <div class="blank"></div>
                <li v-for='info in informations' class="ml">
                    <div class="local-price"><strong>￥90000元/天</strong> 东方万国会议中心</div>
                    <div class="local-price-detail">
                        <div class='max-people fl ml10'>最大容纳200人</div>
                         <div class='max-square fl ml10'>面积200人</div>
                          <div class='add fl ml10'>地址 上海市 浦东新区 | 陆家嘴</div>
                    </div>
                </li>
                <div class="blank"></div>

            </ul>
        </div>
        <!--表单填写-->
        <div class="ifrom">
            <div class="base-info">
                <div class="base-info-tit">基本信息</div>
            </div>
            <div class="base--detail ml">
                <div class="base-info-name"><img src="../../../static/images/＊ 必填icon.png" alt="">您的称呼</div>
                <input type="text" class="base-detail-name">
            </div>
        </div>
    </div>
        
   
   
</template>
<script>
    export default {
        name: 'home',
        data () {
            return {
                informations:[
                    {}
                ]
            }
        }
    }
           
    
</script>
<style scoped>
    html{
        font-size: 125%!important;
    }
    .fl{
        float: left;
    }
    .ml{
        margin-left:0.75rem; 
    }
    .ml10{
        margin-left: 5px;
    }
    
    .title{
        background:#222222;
        width:100vw;
        height:2.2rem;
    }
    .title-left{
        background:#222222;
        width:6rem;
        height:2.2rem;
        float: left;
    }
    .title-right{
        background:222222;
       line-height: 2rem;
        width:12.25rem;
        height:2.2rem;
        float: left;

    }
    .comeback{
        margin-left: 20px;
    }
    .comeback-text{
        font-family:PingFangSC-Regular;
        font-size:0.6rem;
        color:#ffffff;
        text-align:left;
        line-height: 2rem;
    }
    .title-askprice{
        font-size: 0.8rem;
        text-align: left;
        color:#ffffff;
    }
    .list{
        width:100vw;
        height:11.5rem;
        background:#f4f4f4;
        


    }
    
    
    .local-price{
        padding-top: 1rem;
    }
    .local-price-detail{
        height: 0.6rem;
        font-family:PingFangHK-Regular;
        font-size:0.6rem;
        color:#666666;
        line-height:0.6rem;
        text-align:justify;
        margin: 0.35rem 0;
    }
    .blank{
        width:100vw;
        height: 2px;
        background: #ffffff;
    }
    .ifrom{
        height: auto;
        background: #ffffff;
    }
    .base-info{
        width:100vw;
        height: 0.8rem;
        text-align:center;
        background: #ffffff
    }

    
    .base-info-tit{
        margin:0.75rem 0;
        font-family:PingFangHK-Regular;
        font-size:0.8rem;
        color:#000000;
        line-height:0.8rem;
        
    }
    .base-info-name{
        font-family:PingFangHK-Regular;
        font-size:0.7rem;
        color:#000000;
        line-height:0.7rem;
        text-align:left;
    }
</style>