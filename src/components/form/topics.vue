<template>
    <div class="box">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                 <router-link to="/form/collect" class="back">
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
                        <router-link :to=" '/article/' + item.id">
                            {{item.title}}
                        </router-link>
                    </li>
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
                                console.log(data)
                                self.casecontents= data.follows ;
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
        padding:20px 15px;
        font-size: .9rem;
        border-bottom: 1px solid #ffffff;
    }
</style>
