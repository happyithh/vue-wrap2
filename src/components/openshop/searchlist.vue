<template>
    <div class="container">

        <!--头部-->
        <header class="clearfix">
            <div class="fl left p20">
                <router-link to="/openshop" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center p78">
                <div class="search-input-wrap lg clearfix">
                    <input type="text" placeholder="商圈／地标／机场／火车站／场地名">
                </div>
            </div>
        </header>

        <!--表单填写-->
        <form class="ifrom">
            <div class="base--detail ml">
                <div class="input-box">
                    <div class="base-info-name">区域范围</div>
                    <div class="tags clearfix">
                        <span  v-bind:class="{'active': position == item}" @click="positionChange(item)" v-for="item in searchCondition.position">{{item}}</span>
                     </div>
                </div>
               <div class="input-box">
                    <div class="base-info-name"><span>*</span>行政区域</div>
                    
                    <div class="triangle">
                        <select v-model="consult.business_district">
                            <option value=""placeholder='请选择行政区域'>请选择行政区域</option>
                            <option v-for="(value,key) in searchCondition.business_district":label="value.name":value="key"></option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">场地类型</div>
                    <div class="tags clearfix">
                        <!--<span class="active">不限</span>-->
                        <span v-bind:class="{'active': activity_type == item}"  @click="activityTypeChange(item)"
                        v-for="item in searchCondition.activity_type">{{item}}</span>
                        <!--<span>商业广场</span>
                        <span>艺术馆画廊</span>
                        <span>星级酒店</span>
                        <span>影院剧院</span>
                        <span>咖啡馆书店</span>
                        <span>秀场展馆</span>
                        <span>商业广场</span>
                        <span>艺术馆画廊</span>
                        <span>星级酒店</span>
                        <span>影院剧院</span>
                        <span>咖啡馆书店</span>-->
                    </div>
                </div>
               
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>价格</div>
                    
                    <div class="triangle">
                        <select v-model="consult.budget_amount">
                            <option value=""placeholder='请选择价格'>请选择价格</option>
                            <option v-for="(value,key) in searchCondition.budget_amount":label="value":value="key"></option>
                        </select>
                    </div>
                </div>
                <!--<div class="input-box">
                    <div class="base-info-name">落位地区</div>
                    <div class="tags clearfix">
                        <span  v-bind:class="{'active': retail == item}" @click="retailChange(item)" v-for="item in searchCondition.retail">{{item}}</span>
                     </div>
                </div>-->
                <div class="input-box">
                    <div class="base-info-name">可用面积</div>
                    <div class="tags area clearfix">
                         <!--<span class="active">不限</span>-->
                        <span v-bind:class="{'active': area_size == item}"  @click="areaSizeChange(item)"
                         v-for="item in searchCondition.area_size">{{item}}</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">空间层高</div>
                    <div class="triangle">
                        <select v-model="consult.storey" class="storeyList">
                             <option value=""placeholder='请输入'>请输入</option>
                           <option v-for="(value,key) in searchCondition.storey":label="value":value="key"></option>
                        </select>
                        <span>米 以上</span>
                    </div>
                </div>

                <div class="onekey-rentail-wrap">
                    <a href="javascript:;" class="btn-onekey" @click='tags'>搜索</a>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
    import 'assets/css/event.css'
    import 'assets/css/form.css'
    import 'assets/css.css'

    export default {
        data () {
            return {
                consult:{
                    activity_type:'',
                    storey:'',
                    budget_amount:'',
                    retail:'',
                },
            }
        },
        mounted () {
            var self = this;
            this.tags();//调用数据
            if($(".tags").hasClass("active")){
                alert("包含class a");
            }
         },
        computed:{
           searchCondition (){
                return this.$store.state.searchCondition
            },
            personalData (){
                return this.$store.state.personalData
            },
            position(){
                return this.$store.state.position
            },
            activity_type(){
                return this.$store.state.activity_type
            },
            area_size(){
                return this.$store.state.area_size
            },
            // retailChange(){
            //     return this.$store.state.retail
            //     //console.log(this.$store.state.retail)
            // }
        },
        methods:{
            positionChange(item){
                this.$store.commit('positionChange',item)
            },
            activityTypeChange(item){
              
                this.$store.commit('activityTypeChange',item)
            },
            areaSizeChange(item){
              
                this.$store.commit('areaSizeChange',item)
            },
            // retailChange(item){
            //     this.$store.commit('retailChange',item)
            // },
           retailSearch:function(){
                $.get({
                    url: window.YUNAPI.retailSearch,
                    data : self.consult,
                    success: function (data) {
                       var status = data.status == 1 ? 'success' : 'error';
                        console.log(self.consult)
                        if(data.status == 1){
                           
                        }else{
                            $.toptip(data.message,2000,status);
                        }

                    },
                    error : function () {

                    }
                });
           },
            tags : function () {
               
                var self = this;
                //console.log(self.consult)
                $.get({
                    url: window.YUNAPI.tags,
                    data : self.consult,
                    success: function (data) {
                        var status = data.status == 1 ? 'success' : 'error';
                        if(data.status == 1){
                           $.alert({
                                title: '111',
                                
                               
                            });
                        }else{
                            $.toptip(data.message,2000,status);
                        }

                    },
                    error : function () {

                    }
                });
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.storeyList{
    width:25%;
 }
</style>


