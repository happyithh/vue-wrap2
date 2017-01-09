<template>
    <div class="container">

        <!--头部-->
        <header class="clearfix">
            <div class="left fl">
                 <a onclick='router.back()' class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
            </div>
            <div class="fl center">
                <h1 class="display-center">案例文章</h1>
            </div>
            
        </header>
        <div class="imgbox">
            <!--<img src="/static/images/test.png" alt=""/>-->
            <img :src="article.img_paths.length > 0 ? article.img_paths[0]['url_400_267']: ''" alt=""/>
             
        </div>
        <div class="container-box">
            <div class="img-detail">
                <h1>{{article.title}}</h1>
                <div class="person-info clearfix">
                    <div class="fl">发布人:{{article.audit_people}} <span>&nbsp;&nbsp;{{article.created_at}}</span></div>
                    <div class="fr"><img src="/static/images/icon/skim.png" alt=""/> {{article.viewed}} </div>
                </div>
            </div>
            <div class="op-title">内容详情</div>
            <p class="img_detail_box" v-html="article.details"></p>
            
            <div class="infor-show1">
                <a href="javascript:;" class="fl btn-onekey1" @click="showShare('',article.title)"><i class="icon icon-share"></i>分享</a>
                <a href="javascript:;" style="margin-right:0;margin-left:13px;" @click='changeCollect' class="fr btn-onekey1" :class=" {'hv': article.follow }"><i class="icon icon-collection"></i>{{article.follow ? "已收藏" : " 收藏"}}</a>
                
            </div>
        </div>

       
       
    </div>
</template>

<script>
  
    import 'assets/css.css'

    export default {
        data () {
            return {
                places: [1,2,3],
                article : {
                    img_paths : []
                },
                //  follow: false,
            }
        },
        computed : {
            personalData (){
                return this.$store.state.personalData
            }
        },
        mounted () {
            var self = this;
            self.getData();
        },

       
        methods:{
            back(){
                router.back();
            },
             showShare(url,title){
                showShare(url,title)
            },
            getData(){
                 var self = this;
                $.ajax({
                    url: window.YUNAPI.article + "/" + this.$route.params.id, 
                        data: self.$store.getters.validationData,
                    success: function (data) {
                        self.article = data.information;
                        console.log( self.article)
                        self.article.follow = (self.article.follow == true)
                        // console.log( data.information )
                        self.$parent.loading = false;
                    }
                });
            },
            changeCollect(){
                var self = this
                console.log(self)
                var data = GlobleFun.objConcat(self.$store.getters.validationData, {
                    user_id: self.personalData.id,
                    followable_type: 'Article',
                    followable_id: self.article.id
                })
                var success = function (data) {
                    if(data.status == 1){
                        self.article.follow = !self.article.follow
                     }
                };

                GlobleFun.changeCollect(data,success)
            }
         
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .imgbox img{
        width: 100%;
        height: 250px;
        
    }
    .icon-collect-hv{
        background: url('/static/images/icon/collect_hv')
    }
    .container{
        overflow-x:hidden; 
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
    .infor-show1 .icon{
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: 10px;
        margin-top: -4px;
        background-repeat: no-repeat;
        background-position: center;
}
.icon-collection{
    background-image: url("/static/images/icon/collect.png");
}
    .container-box p{
        margin:15px 0;
        font-size: .9rem;
    }
    .imgboxp{
        padding:0 20px;
    }
    .btn-onekey1{
        height: 2.67rem;
        width:45%;
        line-height: 2.68rem;
        background:#f7c73f;
        font-size: 1.07rem;
        float: left;
        margin-top: 15px;
        margin-right:4%;
        margin-bottom: 15px;
        text-align: center;
        
}

    .infor-show1{
        border-top: 1px solid #999999;
        padding-top: 20px;
    }
    
    .btn-onekey1 img{
    width: 20px;
    height: 20px;
    padding-right:10px; 

}
.infor-show1 .btn-onekey1.hv .icon-collection{
    background-image: url("/static/images/icon/collect_hv.png");
}
.infor-show1 .icon {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-right: 10px;
    margin-top: -4px;
    background-repeat: no-repeat;
    background-position: center;
}
.icon-share {
    background-image: url(/static/images/icon/share.png);
}
</style>
<style>
    .img_detail_box  img{
    border: none;
    width: 100%!important;
    height: 100%!important;
    }
</style>
