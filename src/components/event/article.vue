<template>
    <div class="container">

        <!--头部-->
        <header class="clearfix">
            <div class="left fl">
                <router-link to="/space/detail" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <h1 class="display-center">案例文章</h1>
            </div>
            
        </header>
        <div class="imgbox">
            <img src="/static/images/test.png" alt=""/>
        </div>
        <div class="container-box">
            <div class="img-detail">
                <h1>当超级IP遇到商业地产 魔兽成各大购物中心最火吸金王</h1>
                <div class="person-info clearfix">
                    <div class="fl">发布人:张大春 <span>2016-09-16</span></div>
                    <div class="fr"><img src="/static/images/icon/skim.png" alt=""/> 233 </div>
                </div>
            </div>
            <div class="op-title">空间详情</div>
            <p>Mini Cooper为了突破如今国内驾校应试型培训的弊端，为品牌客户量身打造了“少年驾驶训练营”，旨在通过趣味性的实境体验培养驾驶者良好的道路素养。经过云Space推荐，训练营场地最终确定为顺义奥林匹克水上公园，这座建设规划面积约162.59公顷，总建筑面积约3.2万方米的公园以开阔的场地条件满足了多辆轿车试驾的需求，更以其绰约优美的独特水岸风情为活动平添一道亮丽的风景。</p>
            <p>赛前风光赛后闲置是众多赛事场馆的真实写照，众多由一流设计师量身打造、硬件设施一流、地理位置优越的场馆往往在赛后因宣传、线上流量、线下渠道等资源配置不到位而面临尴尬的困境。放眼全球，游泳池变身污水池，皮划艇场馆干涸，垒球场遭废弃，满目荒凉的场馆比比皆是，场馆的赛后使用正成为全球城市规划设计争相关注的焦点。云SPACE商业空间短租平台首先通过平台互联网渠道的强势流量导入，盘活闲置体育场资源，提升使用率，目标是协助中国体育馆业进入商业活动时代，为体育场馆实现收支平衡甚至盈余。以鸟巢为例，今年以来已经在主场、附场以及南广场等主要活动场地上演了各类赛事、演出、驻场秀等各类活动70余场次。</p>
            <div class="imgbox imgboxp">
                <img src="/static/images/test.png" alt=""/>
            </div>
            <div class="img-detail">
                <p>Mini Cooper为了突破如今国内驾校应试型培训的弊端，为品牌客户量身打造了“少年驾驶训练营”，旨在通过趣味性的实境体验培养驾驶者良好的道路素养。经过云Space推荐，训练营场地最终确定为顺义奥林匹克水上公园，这座建设规划面积约162.59公顷，总建筑面积约3.2万方米的公园以开阔的场地条件满足了多辆轿车试驾的需求，更以其绰约优美的独特水岸风情为活动平添一道亮丽的风景。</p>
            </div>
            <div class="infor-show1">
                <a href="" class="btn-onekey1"><img src="/static/images/icon/share.png" alt="">分享</a>
                <a href="" class="btn-onekey1"><img src="/static/images/icon/collect_hv.png" alt="">收藏</a>
                
            </div>
        </div>

       
       
    </div>
</template>

<script>
  
   

    export default {
        data () {
            return {
                places: [1,2,3]
            }
        },
        mounted () {
            var self = this;

        },
        methods:{
         
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .imgbox img{
        width: 100%;
        height: 250px;
        
    }
    .container-box{
        margin:15px;
    }
    .container-box h1{
       font-size: 1rem;
    }
     .img-detail{
        border-bottom: 2px solid #999999;
     }
    .container-box .person-info {
       font-size: .8rem;
       color: #999999;
       height: 25px;
       line-height: 25px;
       margin: 10px 0;

    }
     .container-box .person-info img {
        width: 18px;
        height: 12px; 
    }
    .op-title{
        font-size: 1.07rem;
        margin: 15px 0;
        color: #999999;
    }
    .container-box p{
        margin:15px 0;
        font-size: .9rem;
    }
    .imgboxp{
        padding:0 20px;
    }
    .btn-onekey1{
    width:45%;
    height: 2.67rem;
    line-height: 2.68rem;
    border-radius: 5px;
    background:#f7c73f;
    font-size: 1.07rem;
    float: left;
    margin-top: 15px;
    margin-right:5% ;
    margin-bottom: 15px;
    text-align: center;
}
    .infor-show1{
        margin: 0 15px;
        overflow: hidden;
    }
    .btn-onekey1 img{
    width: 20px;
    height: 20px;
    padding-right:10px; 

}
</style>
