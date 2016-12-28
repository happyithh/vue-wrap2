<template>
    <div class="askprice">
        <!--头部-->
        <header class="clearfix">
            <div class="left fl">
                <router-link to="/form/personal/collect" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <h1 class="display-center">场地空间</h1>
            </div>
        </header>
        <div class="inquiry-list">
            <ul >
                <li class="clearfix" v-for='item in spaceList'>
                    <router-link :to="item.special_url ? item.special_url : '/space/detail/' + item.id">
                        <div class="local-price"><strong>{{item.market_price_real}}{{item.units}}</strong> {{item.name}}</div>
                        <div class="local-price-detail clearfix">
                            <div class='max-people fl ml10'>最大容纳 {{item.Max_seating_capacity}}人</div>
                            <div class='max-square fl ml10'>面积{{item.area}}㎡</div><br/>
                            <div class='add fl ml10'>地址 {{item.address}}</div>
                        </div>
                    </router-link>
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
                spaceList:[]
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
                            followable_type:'Space',
                            page:1,
                            i_types:40
                        }
                            ),
                        success: function (data) {
                            //console.log(data.follows)
                            self.spaceList=data.follows
                            //console.log(self.spaceList)
                        }   
                    });
                    
                
            },
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