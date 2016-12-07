<template>
    <div class="box">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                 <router-link to="/" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <p class="display-center">案例文章</p>
            </div>
            
        </header>
        <div class="case-container">
            <div class="case-content" >
                <div class="notice-tit">抱歉，您没有任何收藏</div>
            </div>
            <div class="hot-tit">热门推荐</div>
            <div class="hottit-box">
                <ul>
                    <li v-for='showplace in showplaces' class="fl">{{showplace.showmsg}}</li>
                </ul>
            </div>
        </div>
        
    </div>
    
</template>
<script>
    import 'assets/css.css'
    export default {
      
        data () {
            return {
                showplaces:[
                    {showmsg:'秀场展馆'},
                    {showmsg:'影院剧院'},
                    {showmsg:'商业广场'},
                    {showmsg:'艺术馆画廊'},
                    {showmsg:'星级酒店'},
                    {showmsg:'咖啡馆书店'}
                ]
            }
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
    .case-container{
        width:100%;
        height: auto;
        padding:0 15px;
        
        
    }
    .case-content{
    width: 100%;
    height: auto;
    text-align: center;
    }
    .case-content .notice-tit{
        padding:20px 0;
        font-size: 1rem;
        color:#666666;
        border-bottom: 1px solid #ffffff;
    }
    .case-container .hot-tit{
        font-size: 1rem;
    }
    .case-container .hottit-box{
        overflow: hidden;
        height: auto;
        border-bottom: 1px solid #222222;
        

    }
    .case-container .hottit-box ul{
        width: 100%;
        height: auto;
    }

    .case-container .hottit-box li{
        text-align: center;
        margin: 10px 3px;
        border: 1px solid #000000;
        padding:12px 8px;
        color: #999999;
        font-size: .8rem;
    }
   
</style>
