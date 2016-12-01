<template>
    <div class="askprice">
        <header class="clearfix">
            <div class="left fl">
                <i class="icon-arrowleft white comeback-img fl"></i>
                <div class="comeback-text fl">返回</div>
                
            </div>
            <div class="title-right fl">
                <div class="title-askprice">一键询价</div>
            </div> 
        </header>
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
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的称呼</div>
                    <input type="text" class="base-detail-name">
                    <div class="border-bottom"></div>
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的联系方式</div>
                    <input type="text" class="base-detail-name">
                    <div class="border-bottom"></div>
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>邮箱</div>
                    <input type="text" class="base-detail-name" placeholder="请填写您的邮箱地址">
                    <div class="border-bottom"></div>
                </div>
                <button type="" class="submit">提交</button>
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
    .ml{
        margin-left:10px; 
    }
    header{
        width:100%;
        padding:0 10px;
        font-size:.6rem;
    }
    
    header .left{
        width:16%;
        height: 50px;
       
    }
    
    .comeback-img{
        margin:20px 5px;
    }
    
    
    .comeback-text{
        font-family:PingFangSC-Regular;
        font-size:13px;
        color:#ffffff;
        text-align:left;
        line-height: 50px;
    }
    .title-right{
        width:80%;
        height: 50px;
    }
    .title-askprice{
        width:30%;
        height: 50px;
        font-size:.8rem;
        line-height: 50px;
        margin: 0 auto;
    }
    
    
    

    .list{
        width:100%;
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
        width:100%;
        height: 2px;
        background: #ffffff;
    }
    .ifrom{
        height: auto;
        background: #ffffff;
    }
    .ifrom input{
        width:100%;
    }
    .base--detail{
        margin: 0 15px;
    }
    .base-info{
        width:100%;
        height: 0.8rem;
        text-align:center;
        background: #ffffff;
    }
    .base-info-name span{
        color:red;
        font-size:20px; 
        
    }
    
    .base-info-tit{
        padding:30px 0;
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
    .border-bottom{
        border:1px solid #222222;
        width:100%;
        height:1px;
    }
    .input-box{
        padding-top:31px; 
    }
    .base-info-name{
        padding-bottom: 15px;
    }
    .submit{
        width:100%;
        margin-top:20px; 
        height: 40px;
        background:#f7c73f;
        font-family:PingFangSC-Regular;
        font-size:.8rem;
        color:#000000;
        text-align:center;
        line-height:40px;

    }
</style>