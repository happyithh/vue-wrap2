<template>
    <div class="askprice page-cell">
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
        <!--<div class="inquiry-list">
            <ul >
                <li class="clearfix" v-for='item in spaceList'>
                    <router-link :to="item.special_url ? item.special_url : '/space/detail/' + item.id">
                        <div class="local-price"><strong>{{item.market_price_real}}{{item.units}}</strong> {{item.name}}</div>
                        <div class="local-price-detail clearfix">
                            <div class='max-people fl ml10'>最大容纳 {{item.Max_seating_capacity}}人 面积{{item.area}}㎡ 地址 {{item.address}}</div>
                            <div class='max-square fl ml10'></div>
                            <div class='add fl ml10'></div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>-->
        <!--空间收藏-->
         <div class="inquiry-list">
            <ul >
                <li class="clearfix" v-for='item in spaceList'>
        <mt-cell-swipe
        :right="[
            {
            content: '删除',
            style: { background: 'red', color: '#fff' },
            handler: () =>deleteData('确认删除？')
            }
        ]">
                <!--<li class="clearfix" v-for='item in spaceList'>-->
                    <router-link :to="item.special_url ? item.special_url : '/space/detail/' + item.id">
                        <div class="local-price"><strong>{{item.market_price_real}}{{item.units}}</strong> {{item.name}}</div>
                        <div class="local-price-detail clearfix">
                            <div class='max-people fl ml10'>最大容纳 {{item.Max_seating_capacity}}人 面积{{item.area}}㎡ 地址 {{item.address}}</div>
                            <div class='max-square fl ml10'></div>
                            <div class='add fl ml10'></div>
                        </div>
                    </router-link>
        <!--<p>标题文字</p>-->
        </mt-cell-swipe>
                      
                </li>
            </ul>
        </div>
        <!--场地收藏-->
         <div class="inquiry-list">
            <ul >
                <li class="clearfix" v-for='item in placeList'>
                <mt-cell-swipe :right="[ { content: '删除', style: { background: 'red', color: '#fff' }, handler: () =>deletePlaceData('确认删除？') } ]">
                <!--<li class="clearfix" v-for='item in spaceList'>-->
                    <router-link :to="item.special_url ? item.special_url : '/space/detail/' + item.id">
                        <div class="local-price"><strong>{{item.lower_price}}{{item.units}}</strong> {{item.title}}</div>
                        <div class="local-price-detail clearfix">
                            <div class='max-people fl ml10'>最大容纳 {{item.max_people}}人 面积{{item.max_size}}㎡ 地址 {{item.address}}</div>
                            <div class='max-square fl ml10'></div>
                            <div class='add fl ml10'></div>
                        </div>
                    </router-link>
        <!--<p>标题文字</p>-->
        </mt-cell-swipe>
                      
                </li>
            </ul>
        </div>

        <!--<mt-cell-swipe
            v-for="n in 10"
            :right="rightButtons"
            title="swipe me">
        </mt-cell-swipe>-->
        <!--<mt-cell title="标题文字"></mt-cell>-->
        <!--表单填写-->
        
    </div>
</template>
<script>
    import Vue from 'vue'
    import 'assets/css/form.css';
    // import { Cell } from 'mint-ui';
     import { CellSwipe } from 'mint-ui';
    //  Vue.component(Cell.name, Cell);
     Vue.component(CellSwipe.name);

    export default {
        name: 'home',
        
        data () {
            return {
                spaceList:[],
                placeList:[],
                followable_id:'',
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
            self.collecPlacetList()//调用场地数据
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
                            i_types:40
                        }
                            ),
                        success: function (data) {
                            self.spaceList=data.follows
                        }   
                    });
                    
                
            },
            collecPlacetList : function(){
                var self = this;
                    $.get({
                        // type:'put',
                        url: window.YUNAPI.collection+'.json',
                        data : GlobleFun.objConcat(this.$store.getters.validationData,{
                            followable_type:'Site',
                            i_types:40
                        }
                            ),
                        success: function (data) {
                            // console.log(data.follows)
                            self.placeList=data.follows
                        }   
                    });
                    
                
            },
            deleteData:function(){
                var self = this;
                console.log( self)
                    $.post({
                        // type:'put',
                        url: window.YUNAPI.collection,
                        data : GlobleFun.objConcat(this.$store.getters.validationData,{
                            followable_type:'Space',
                            followable_id: self.spaceList.id, 
                        }
                            ),
                        success: function (data) {

                            // $('li').remove();
                            // console.log(data)
                            // console.log(self.$el.children[1].children[0].children[0].attributes.uid)
                            // console.log(self)
                           // console.log(self.spaceList.id)
                            // self.spaceList=data.follows
                            //console.log(self.spaceList)
                        }   
                    });
            },
            deletePlaceData:function(){
                 var self = this;
                 console.log($(this))
                    $.post({
                        // type:'put',
                        url: window.YUNAPI.collection,
                        data : GlobleFun.objConcat(this.$store.getters.validationData,{
                            followable_type:'Site',
                            followable_id:self.placeList[0].id,  
                        }
                            ),
                        success: function (data) {
                            self.collecPlacetList()
                        }   
                    });
            },
            leftButtonHandler(evt) {
                console.log(123);
            }
        }

        }
    
           
    
</script>
<style scoped>
    .inquiry-list li{
        background: #f4f4f4;
       
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
    .clearfix{
        /*padding: 8px 0px;*/
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