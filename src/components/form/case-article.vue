<template>
    <div class="box">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                <router-link to="/form/personal/collect" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <h1 class="display-center">案例文章</h1>
            </div>
            
        </header>
       
        <!--<div class="case-container">
            <ul class="case-content" id='case-content' >
                <li>
                   <mt-cell-swipe style="text-align: left" :right="[ { content: '删除', style: { background: 'red', color: '#fff' }, handler: () =>deleteData('确认删除？') } ]">
                        <router-link  to=''>
                            aaaaaaaaaaa
                        </router-link>
                    </mt-cell-swipe>
                </li>
            </ul>
        </div>-->
        <div class="case-container">
            <ul class="case-content" id='case-content' >
                <li v-for="item in casecontents">
                   <mt-cell-swipe style="text-align: left" :right="[ { content: '删除', style: { background: 'red', color: '#fff' }, handler: () =>deleteData('确认删除？') } ]">
                        <router-link  :to="item.special_url ? item.special_url : '/Article/' + item.id">
                            {{item.title}}
                        </router-link>
                    </mt-cell-swipe>
                </li>
            </ul>
        </div>
        <div class="case-container1">
            <div class="case-content1" >
                <div class="notice-tit1">抱歉，您没有任何收藏</div>
            </div>
            <div class="hot-tit1">热门推荐</div>
            <div class="hottit-box1">
                <ul>
                    <li v-for='showplace in showplaces' class="fl">{{showplace.showmsg}}</li>
                </ul>
            </div>
        </div>
    </div>
    
</template>
<script>
    import 'assets/css.css'
    import Vue from 'vue'
    import { CellSwipe } from 'mint-ui';
    Vue.component(CellSwipe.name);
    export default {
      
        data () {
            return {
                casecontents:[{}],
                rightButtons : [
                    {
                        content: 'Mark as Unread',
                        style: { background: 'lightgray', color: '#fff' }
                    },
                    {
                        content: 'Delete',
                        style: { background: 'red', color: '#fff' },
                        handler: () => this.deleteData('delete')
                    }
                   
                ],
                 showplaces:[
                    {showmsg:'秀场展馆'},
                    {showmsg:'影院剧院'},
                    {showmsg:'商业广场'},
                    {showmsg:'艺术馆画廊'},
                    {showmsg:'星级酒店'},
                    {showmsg:'咖啡馆书店'}
                ]

            }
        },     
        mounted(){
            var self = this;
            self.collectList()//调用数据
            
           // console.log(this.$store.getters.validationData)
           // console.log(GlobleFun.objConcat(this.$store.getters.validationData,{page:1,order_id:222}))
        },
        methods:{
            collectList : function(){
                var self = this;
                    $.get({
                        url: window.YUNAPI.collection+'.json',
                        data : GlobleFun.objConcat(this.$store.getters.validationData,{
                            followable_type:'Article',
                            i_types:40,
                            page:1
                        }),
                        success: function (data){
                           self.casecontents= data.follows ;
                            console.log( self.casecontents);
                             if(self.casecontents.length==0){
                                $('.case-container1').css('display','block')
                            }else{
                                $('.case-container1').css('display','none')
                            }
                        }   
                    });
                   

             },
             deleteData:function(){  
                var self = this;
               $.post({
                    url: window.YUNAPI.collection,
                    data : GlobleFun.objConcat(this.$store.getters.validationData,{
                        followable_type:'Article',
                        followable_id: self.casecontents[0].id, 
                        //  console.log(data)
                    },
                    
                        ),
                    success: function (data) {
                            self.collectList()
                        console.log(self.casecontents)
                    }   
                });
            },
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
    .list-ul {
        overflow: hidden;
        }
        
    .list-li {
        /*line-height: 60px;*/
        border-bottom: 1px solid #fcfcfc;
        position: relative;
        /*padding: 0 12px;*/
        color: #666;
        background: #f2f2f2;
        -webkit-transform: translateX(0px);
        }
        
        .btn {
        position: absolute;
        top: 0;
        right: -80px;
        text-align: center;
        background: red;
        color: #fff;
        width: 80px
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
        width: 100%;
        font-size: .9rem;
        text-align: left;
        border-bottom: 1px solid #ffffff;
    }
    .mint-cell{
        background: #f4f4f4;
        padding:15px;
        width:100%;
        border: none;
       
    }
    .mint-cell a{
         line-height: 1.2!important;
    }
    
   /*.case-content .mint-cell-wrapper{
        background:#999999;
        padding: 0!important;
        border: none;
    }*/
    .case-container1{
        width:100%;
        height: auto;
        padding:0 15px;
    }
    .case-content1{
    width: 100%;
    height: auto;
    text-align: center;
    }
    .case-content1 .notice-tit1{
        padding:20px 0;
        font-size: 1rem;
        color:#666666;
        border-bottom: 1px solid #ffffff;
    }
    .case-container1 .hot-tit1{
        font-size: 1rem;
    }
    .case-container1 .hottit-box1{
        overflow: hidden;
        height: auto;
        border-bottom: 1px solid #222222;
        

    }
    .case-container1 .hottit-box1 ul{
        width: 100%;
        height: auto;
    }

    .case-container1 .hottit-box1 li{
        text-align: center;
        margin: 10px 3px;
        border: 1px solid #000000;
        padding:12px 5px;
        color: #999999;
        font-size: .8rem;
    }
</style>
<style>
    .mint-cell .mint-cell-swipe{
        width:120%;
        line-height: 80px;
    }
    .mint-cell-title {
        -webkit-box-flex: 0;
        -ms-flex: 0;
        flex: 0;
    }
    .mint-cell-wrapper{
        padding: 0;
        background-image: none;
    }
    .mint-cell-right {
    position: absolute;
    height: 100%;
    right: -2px;
    }
</style>