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
                <h1 class="display-center">精选专题</h1>
            </div>
            
        </header>
       
            <div class="case-container">
                <ul class="case-content" id='case-content' >
                    <li v-for="item in casecontents">
                        <mt-cell-swipe :right="[ { content: '删除', style: { background: 'red', color: '#fff' }, handler: () =>deleteData('确认删除？') } ]">
                        <router-link :to="item.special_url ? item.special_url : '/Article/' + item.id">
                            {{item.title}}
                        </router-link>
                    </mt-cell-swipe>
                    </li>
                </ul>
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
                casecontents:[
                    
                ],
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
                   
                ]
            }
        },
         mounted(){
            var self = this;
            self.collectList()//调用数据
            //console.log(this.$store.getters.validationData)
           // console.log(GlobleFun.objConcat(this.$store.getters.validationData,{page:1,order_id:222}))
        },
        methods:{
            collectList : function(){
                var self = this;
                    $.get({
                        // type:'put',
                        url: window.YUNAPI.collection+'.json',
                        data : GlobleFun.objConcat(this.$store.getters.validationData,{
                            followable_type:'Article',
                            page:1,
                            i_types:40
                        }
                            ),
                        success: function (data,status,xhr) {
                            // console.log(data)
                            self.casecontents= data.follows ;
                        }   
                    });
            },
            deleteData:function(){
                var self = this;
                $.post({
                    // type:'put',
                    url: window.YUNAPI.collection,
                    data : GlobleFun.objConcat(this.$store.getters.validationData,{
                        followable_type:'Article',
                        followable_id: self.casecontents[0].id, 
                        //  console.log(data)
                    },
                
                        ),
                    success: function (data) {
                        self.collectList()
                        // console.log(self.casecontents)
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
        /*padding:20px 15px;*/
        font-size: .9rem;
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
    
    mint-cell mint-cell-swipe .mint-cell-wrapper{
    background:#999999;
    padding: 0!important;
    border: none;
    }
</style>
