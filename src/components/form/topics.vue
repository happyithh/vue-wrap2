<template>
    <div class="box">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                <a href="" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
            </div>
            <div class="fl center">
                <p class="display-center">精选专题</p>
            </div>
            
        </header>
        <div class="case-container">
            <ul class="case-content" id='case-content' >
                <a href=""><li v-for="casecontent in casecontents">{{casecontent.contentexp}}</li></a>
            </ul>
        </div>
        
    </div>
    
</template>
<script>
    import 'assets/css.css'
    export default {
      
        data () {
            return {
                casecontents:[
                    {contentexp:'当超级IP遇到商业地产 魔兽成各大购物中心最火吸金'},
                    {contentexp:'当超级IP遇到商业地产 魔兽成各大购物中心最火吸金王'},
                    {contentexp:'当超级IP遇到商业地产 魔兽成各大购物中心最火吸金王'},
                    {contentexp:'[TG BUS]Mini Cooper空降奥林匹克水上公园 云SPACE助奥运场馆振风采 云SPACE公关部'}
                    
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
    .case-content{
    width: 100%;
    height: auto;
    background:#f4f4f4;
    }
    .case-content li{
        padding:20px 15px;
        font-size: .7rem;
        border-bottom: 1px solid #ffffff;
    }
</style>
