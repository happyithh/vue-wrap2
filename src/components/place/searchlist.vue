<template>
    <div class="container">

        <!--头部-->
        <header class="clearfix">
            <div class="fl left p20">
                <router-link to="/" class="back">
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
                    <div class="base-info-name">城市</div>
                    <div class="triangle">
                        <select v-model="urlData.city_id">
                            <option :value="item.id" v-for="item in searchCondition.cities">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">场地位置</div>
                    <div class="tags select clearfix">
                        <span class="active">不限</span>
                        <select v-model="urlData.business_district">
                            <!--<option>不限</option>-->
                            <option :value="item.id" v-for="item in searchCondition.business_district">{{item.name}}</option>
                        </select>
                        <select>
                            <option>不限</option>
                            <option>商圈1</option>
                            <option>商圈2</option>
                        </select>
                        <select>
                            <option>不限</option>
                            <option>地铁1</option>
                            <option>地铁2</option>
                        </select>
                        <span>环线</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">场地类型</div>
                    <div class="tags clearfix">
                        <span :data-id="value" v-for="(value,key) in searchCondition.space_type">{{key}}</span>
                    </div>
                </div>

                <div class="input-box">
                    <div class="base-info-name">活动类型</div>
                    <div class="triangle">
                        <select v-model="urlData.business_circle">
                            <option :value="value" v-for="(value,key) in searchCondition.activity_type">{{key}}</option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">容纳人数</div>
                    <div class="tags clearfix">
                        <span :data-id="key" v-for="(value,key) in searchCondition.search_people">{{value}}</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">预算范围</div>
                    <div class="triangle">
                        <select v-model="searchData.budget_amount">
                            <option :value="key" v-for="(value,key) in searchCondition.budget_amount">{{value}}</option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">面积范围</div>
                    <div class="triangle">
                        <select v-model="searchData.area_size">
                            <option :value="key" v-for="(value,key) in searchCondition.area_size">{{value}}</option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">落位区域</div>
                    <div class="tags clearfix">
                        <span class="active">不限</span>
                        <span :data-id="key" v-for="(value,key) in searchCondition.position">{{value}}</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">配套服务</div>
                    <div class="tags area clearfix">
                        <span class="active">不限</span>
                        <span :data-id="key" v-for="(value,key) in searchCondition.facitilies">{{value}}</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">空间层高</div>
                    <div class="triangle">
                        <input style="width: 120px" type="number" class="base-detail-name ipt-height" placeholder="请输入层高">
                        <span>米 以上</span>
                    </div>
                </div>

                <div class="onekey-rentail-wrap">
                    <a href="" class="btn-onekey">搜索</a>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
    import 'assets/css/event.css'
    import 'assets/css/form.css'

    export default {
        data () {
            return {
                checked: true,
                tags :[],
                searchData : {
                    budget_amount : '',
                    area_size : '',
                    search_people:'',
                },
                searchKeyword : '',   //搜索关键词
                selectSearchReady : false,
                urlData : {
                    page : 1,
                    city_id : '',
                    tags:'',             //配套服务
                    business_circle:'',  //活动类型
                    spaces_through_three_areas_cont: '',//落位区域
                    business_district:'',   //行政区域
                    q : {
                        keyword: self.searchKeyword,
                        district_name_eq:'',
                        site_type_eq:'',
                        spaces_market_price_gteq:'',
                        spaces_market_price_lteq:'',
                        spaces_area_gteq:'',
                        spaces_area_lteq:'',
                        spaces_Max_seating_capacity_gteq:'',
                        spaces_Max_seating_capacity_lteq:'',
                        site_district_name_eq:'',
                        spaces_height_gteq:'',
                    }
                },
                default:[],
            }
        },
        computed : {

            searchCondition (){
                var s = this.$store.state.searchCondition
                var self = this
                if(s.space_type){
                    s.space_type['不限'] = ''
                    setTimeout(function () {
                        self.selectSearchReady = true
                    },300)
                }
                if(s.cities){
                    var l=s.cities.length-1;
                    if(s.cities[l].name!=='不限'){
                        s.cities.unshift({name:'不限',id:''})
                        setTimeout(function () {
                            self.selectSearchReady = true
                        },300)
                    }
                }
                if(s.activity_type){
                    s.activity_type['不限'] = ''
                    setTimeout(function () {
                        self.selectSearchReady = true
                    },300)
                }
                return s
            },
        },
        mounted () {
            var self = this;

        },
        methods:{
            getData(){
                var self= this;
                if( this.placeMore && this.placeMore.state() == 'pending'){
                    return
                }
                self.$store.commit('loading',true);
                //落位区域-分割
                self.stringArrArea=self.arrArea.join(',');
                //配套服务-分割
                self.stringArrSort=self.arrSort.join(',');

                //urlData.tags值(配套服务+活动类型)
                if(self.stringArrSort){
                    self.stringArrSort=self.stringArrSort+','
                }
                self.urlData.tags = self.stringArrSort
                        +self.urlData.business_circle;
                //落位区域值
                self.urlData.spaces_through_three_areas_cont = self.stringArrArea

                //空间层高值
                self.urlData.q.spaces_height_gteq = $('.space-height .ipt-height').val();
                $('.space-height .ipt-height').val('');  //清零

                //搜索 容纳人数
                if(self.searchData.search_people){
                    var search_people = self.searchData.search_people.split('-')
                    self.urlData.q.spaces_Max_seating_capacity_gteq = search_people[0]
                    self.urlData.q.spaces_Max_seating_capacity_lteq = search_people[1]
                }else{
                    self.urlData.q.spaces_Max_seating_capacity_lteq = ''
                    self.urlData.q.spaces_Max_seating_capacity_lteq = ''
                }

                //搜索 预算范围
                if(self.searchData.budget_amount){
                    var budget_amount = self.searchData.budget_amount.split('-')
                    self.urlData.q.spaces_market_price_gteq = budget_amount[0]
                    self.urlData.q.spaces_market_price_lteq = budget_amount[1]
                }else{
                    self.urlData.q.spaces_market_price_gteq = ''
                    self.urlData.q.spaces_market_price_lteq = ''
                }

                //搜索 面积限制
                if(self.searchData.area_size){
                    var area_size = self.searchData.area_size.split('-')
                    self.urlData.q.spaces_area_gteq = area_size[0]
                    self.urlData.q.spaces_area_lteq = area_size[1]
                }else{
                    self.urlData.q.spaces_area_gteq = ''
                    self.urlData.q.spaces_area_lteq = ''
                }


                self.placeMore = $.ajax({
                    url: window.YUNAPI.host + 'api/sites/search',
                    data : self.urlData,
                    success: function (data) {
                        //console.log(data)
                    }
                });

            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .input-box .tags select{
        float: left;
        display: block;
        width: 25%;
        height: 40px;
        line-height: 20px;
        padding: 10px 20px 10px 6px;
        text-align: center;
        background: #f4f4f4;
        color: #999;
        font-size: 0.7rem;
        margin-bottom: 10px;
        box-sizing: border-box;
        border-right: 1px solid #fff;
        border-radius: 0;
        background-image: url("/static/images/icon/arrow_down.png");
        background-repeat: no-repeat;
        background-size: 0.66rem auto;
        background-position: 88% 17px;
    }
    .input-box .tags span{
        height: 40px;
        line-height: 20px;
    }

    @media screen and (min-width: 640px) {
        .input-box .tags select,
        .input-box .tags span{
            height: 50px;
            line-height: 30px;
        }
    }

</style>
