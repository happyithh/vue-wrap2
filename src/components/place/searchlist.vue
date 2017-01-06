<template>
    <div class="container hvfixed">

        <!--头部-->
        <header class="clearfix">
            <div class="fl left p20">
                 <a onclick='router.back()' class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
            </div>
            <div class="fl center p78">
                <div class="search-input-wrap lg clearfix">
                    <input type="text" placeholder="商圈／地标／机场／火车站／场地名" v-model='urlData.q.keyword' @keyup.enter="getData">
                </div>
            </div>
        </header>

        <!--表单填写-->
        <form class="ifrom">
            <div class="base--detail ml">
                <div class="input-box">
                    <div class="base-info-name">城市</div>
                    <div class="triangle">
                        <select v-model="urlData.city_id" @change="placePositionScreen">
                            <option :value="item.id" v-for="item in searchCondition.cities">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">场地位置</div>
                    <div class="tags select placePosition clearfix">
                        <!--<span class="active buxian">不限</span>-->
                        <select v-model="urlData.q.district_name_eq">
                            <option value="">不限</option>
                            <option v-for="item in arrAdmArea">{{item.name}}</option>
                        </select>
                        <select v-model="urlData.business_district">
                            <option value="">不限</option>
                            <option v-for="item in arrBusinessDistrict">{{item}}</option>
                        </select>
                        <!--<select>-->
                            <!--<option>不限</option>-->
                            <!--&lt;!&ndash;<option>地铁1</option>&ndash;&gt;-->
                            <!--&lt;!&ndash;<option>地铁2</option>&ndash;&gt;-->
                        <!--</select>-->
                        <!--<select>-->
                            <!--<option>不限</option>-->
                            <!--&lt;!&ndash;<option>环线1</option>&ndash;&gt;-->
                            <!--&lt;!&ndash;<option>环线2</option>&ndash;&gt;-->
                        <!--</select>-->
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">场地类型</div>
                    <div class="tags clearfix placeType">
                        <span :class="{ active : placeSearchCondition.arrPlaceType.indexOf(value * 1) >= 0 }" @click="toggleActive($event)" :data-id="value" v-for="(value,key) in searchCondition.space_type">{{key}}</span>
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
                    <div class="tags clearfix people">
                        <span :data-id="key" v-for="(value,key) in searchCondition.search_people" @click="singleActive($event)" :class="{active : placeSearchCondition.search_people == key}">{{value}}</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">预算范围</div>
                    <div class="triangle">
                        <select v-model="urlData.budget_amount">
                            <option :value="key" v-for="(value,key) in searchCondition.budget_amount">{{value}}</option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">面积范围</div>
                    <div class="triangle">
                        <select v-model="urlData.area_size">
                            <option :value="key" v-for="(value,key) in searchCondition.area_size">{{value}}</option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">落位区域</div>
                    <div class="tags clearfix arrArea">
                        <span class="active buxian" @click="singleActive($event)">不限</span>
                        <span :data-id="key" v-for="(value,key) in searchCondition.position" @click="toggleActive($event)" :class="{ active : placeSearchCondition.arrArea.indexOf(value) >= 0 }">{{value}}</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">配套服务</div>
                    <div class="tags arrSort clearfix">
                        <span class="active buxian" @click="singleActive($event)">不限</span>
                        <span :data-id="value" v-for="(value,key) in searchCondition.facitilies" @click="toggleActive($event)" :class="{ active : placeSearchCondition.arrSort.indexOf(value) >= 0 }">{{value}}</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">空间层高</div>
                    <div class="triangle">
                        <input style="width: 120px" type="number" class="base-detail-name ipt-height" v-model="urlData.q.spaces_height_gteq" placeholder="请输入层高">
                        <span>米 以上</span>
                    </div>
                </div>

                <div class="onekey-rentail-wrap needfixed">
                    <a href="javascript:;" @click="getData" class="btn-onekey">搜索</a>
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
                    business_district:'',   //商圈
                },
                selectSearchReady : false,
                urlData : {
                    budget_amount : '',         //预算范围
                    area_size : '',
                    search_people:'',
                    business_district:'',       //商圈
                    arrSort:[],                 //配套服务
                    arrArea:[],                 //落位区域
                    arrPlaceType:[],            //场地类型
                    business_circle_new:'',     //活动类型
                    //以上保存数据用

                    page : 1,
                    city_id : '',
                    tags:'',             //配套服务+活动类型+商圈
                    business_circle:'',  //活动类型
                    spaces_through_three_areas_cont: '',//落位区域
                    q : {
                        keyword: '',
                        district_name_eq:'',  //行政区域
                        site_type_eq:'',      //场地类型单选
                        site_type_in:'',      //场地类型多选
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

                stringSort:[],              //配套服务

                stringArea:[],              //落位区域

                stringPlaceType:[],         //场地类型

                arrAdmArea:[],              //行政区域
                arrBusinessDistrict:[],     //商圈

                default:[],
            }
        },
        computed : {

            searchCondition (){
                var s = this.$store.state.searchCondition
                var self = this
                if(s.space_type){   //场地类型
                    s.space_type['不限'] = ''
                    setTimeout(function () {
                        self.selectSearchReady = true

                        //不限 前置
                        $('.placeType span').each(function () {
                            var ee=$(this);
                            if(ee.text()=='不限'){
                                if(ee.siblings().hasClass('active')){
                                    $('.placeType').prepend('<span class="buxian">不限</span>');
                                }else {
                                    $('.placeType').prepend('<span class="active buxian">不限</span>');
                                }
                                $('.placeType').find(ee).remove();

                                $('.placeType span.buxian').on('click',function () {
                                    self.singleActiveB($(this));
                                });
                            }
                        });
                    },300)

                }
                if(s.search_people){  //容纳人数

                    setTimeout(function () {
                        self.selectSearchReady = true
                        //不限 前置
                        $('.people span').each(function () {
                            var ee = $(this);
                            if (ee.text() == '不限') {

                                if(ee.siblings().hasClass('active')){
                                    $('.people').prepend('<span class="buxian">不限</span>');
                                }else {
                                    $('.people').prepend('<span class="active buxian">不限</span>');
                                }
                                $('.people').find(ee).remove();

                                $('.people span.buxian').on('click', function () {
                                    self.singleActiveB($(this));
                                });
                            }
                        });
                    },300)
                }
                if(s.cities){
                    if(s.cities[0].name!=='不限'){
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
            placeSearchCondition(){
                return this.$store.state.placeSearchCondition;
            }
        },
        mounted () {
            var self = this;

            //默认城市
            self.urlData.city_id = self.$store.state.city_id
            //self.placePositionScreen();

            self.holdData();
            $(document).scroll(function(){
                $('.needfixed').addClass('fixed');
            })
        },
        methods:{
            //多选
            toggleActive(e){
                if($(e.target).text()=='不限'){
                    if($(e.target).hasClass('active')){
                        $(e.target).removeClass('active');
                    }else{
                        $(e.target).addClass('buxian active');
                        $(e.target).siblings().removeClass('active');
                    }
                }else {
                    $(e.target).parent().find('.buxian').removeClass('active');
                    $(e.target).toggleClass('active');
                }
            },
            //单选
            singleActive(e){
                if($(e.target).hasClass('active')){
                    $(e.target).removeClass('active');
                }else {
                    $(e.target).addClass('active');
                    $(e.target).siblings().removeClass('active')
                }
            },
            //单选(循环含不限)
            singleActiveB(e){
                if(e.hasClass('active')){
                    e.removeClass('active');
                }else {
                    e.siblings().removeClass('active')
                    e.addClass('active');
                }
            },

            //场地位置筛选
            placePositionScreen(){
                var self = this

                if(self.urlData.city_id == ''){
                    self.arrAdmArea = ''
                    self.arrBusinessDistrict = ''
                    self.urlData.q.district_name_eq = ''
                    self.urlData.business_district = ''
                    return
                }

                $.ajax({
                    url: window.YUNAPI.host+'api/tags/get_city_business',
                    data : {
                        city_id:self.urlData.city_id
                    },
                    success: function (data) {
                        self.arrAdmArea=data.city_district  //行政区域
                        self.arrBusinessDistrict=data.city_business  //商圈
                    }
                });
            },

            getData(){
                var self= this;
                self.$store.commit('loading',true);

                //配套服务
                $('.arrSort span.active').each(function () {
                    self.urlData.arrSort.push($(this).data('id'));
                });
                self.stringSort=self.urlData.arrSort.join(',');

                //配套服务+活动类型+商圈(urlData.tags值)
                if(self.stringSort){
                    self.stringSort=self.stringSort+','
                }
//                if(self.urlData.business_district){
//                    self.urlData.business_district=self.urlData.business_district+','
//                }

                self.urlData.business_circle_new = self.urlData.business_circle  //活动类型（保存数据用）
                if(self.urlData.business_circle){    //活动类型
                    self.urlData.business_circle = self.urlData.business_circle+','
                }

                self.urlData.tags = self.stringSort
                        +self.urlData.business_circle          //活动类型
                        +self.urlData.business_district;    //商圈


                //落位区域值
                $('.arrArea span.active').each(function () {
                    self.urlData.arrArea.push($(this).data('id'));
                });
                self.stringArea=self.urlData.arrArea.join(',');
                self.urlData.spaces_through_three_areas_cont = self.stringArea

                //空间层高值
                self.urlData.q.spaces_height_gteq = $('.triangle .ipt-height').val();
//                $('.triangle .ipt-height').val('');  //清零

                //预算范围
                if(self.urlData.budget_amount){
                    var budget_amount = self.urlData.budget_amount.split('-')
                    self.urlData.q.spaces_market_price_gteq = budget_amount[0]
                    self.urlData.q.spaces_market_price_lteq = budget_amount[1]
                }else{
                    self.urlData.q.spaces_market_price_gteq = ''
                    self.urlData.q.spaces_market_price_lteq = ''
                }

                //面积限制
                if(self.urlData.area_size){
                    var area_size = self.urlData.area_size.split('-')
                    self.urlData.q.spaces_area_gteq = area_size[0]
                    self.urlData.q.spaces_area_lteq = area_size[1]
                }else{
                    self.urlData.q.spaces_area_gteq = ''
                    self.urlData.q.spaces_area_lteq = ''
                }

                //场地类型
                $('.placeType span.active').each(function () {
                    self.urlData.arrPlaceType.push($(this).data('id'));
                });
                //self.stringPlaceType = self.urlData.arrPlaceType.join(',')
                self.urlData.q.site_type_in = self.urlData.arrPlaceType


                //容纳人数
                if($('.people span').hasClass('active')){

                    if($('.people span.active').text()=='不限'){
                        self.urlData.q.spaces_Max_seating_capacity_lteq = ''
                        self.urlData.q.spaces_Max_seating_capacity_lteq = ''
                    }else {
                        self.urlData.search_people = $('.people span.active').data('id')  //容纳人数 保存数据用
                        var search_people = $('.people span.active').data('id').split('-');
                        //console.log(search_people,22)

                        self.urlData.q.spaces_Max_seating_capacity_gteq = search_people[0]
                        self.urlData.q.spaces_Max_seating_capacity_lteq = search_people[1]
                    }

                }else{
                    self.urlData.q.spaces_Max_seating_capacity_lteq = ''
                    self.urlData.q.spaces_Max_seating_capacity_lteq = ''
                }
                self.$store.commit('placeSearchConditionChange',self.urlData);

                if(self.placeSearchCondition){//之前提交的数据
                    self.urlData=self.placeSearchCondition
                }
                router.push('/place');  //返回上一页
            },

            holdData(){
                var self = this;
                var s = self.$store.state.placeSearchCondition

                if(s.q.keyword){   //关键词
                    self.urlData.q.keyword = s.q.keyword;
                }
                if(s.city_id){     //城市 +行政区域、商圈
                    self.urlData.city_id = s.city_id
                    $.ajax({
                        url: window.YUNAPI.host+'api/tags/get_city_business',
                        data : {
                            city_id:self.urlData.city_id
                        },
                        success: function (data) {
//                        console.log(data,88)
                            self.arrAdmArea=data.city_district  //行政区域
                            self.arrBusinessDistrict=data.city_business  //商圈

                            if(s.q.district_name_eq){     //行政区域
                                self.urlData.q.district_name_eq = s.q.district_name_eq
                            }
                            //console.log(s.business_district,1)
                            if(s.business_district){     //商圈
                                self.urlData.business_district = s.business_district
                            }
                        }
                    });
                }
                if(s.business_circle_new){     //活动类型
                    self.urlData.business_circle = s.business_circle_new;
                }
                if(s.budget_amount){           //预算范围
                    self.urlData.budget_amount = s.budget_amount;
                }
                if(s.area_size){               //面积范围
                    self.urlData.area_size = s.area_size;
                }
                if(s.arrArea){                 //落位区域值
                    //如果默认选择的有数据，去掉不限的选中样式
                    var areaLength = $('.arrArea span.active').length-1;
                    if(!(areaLength=1 && $('.arrArea span.active').text() == '不限')){
                        $('.arrArea span.active').each(function () {
                            //console.log(areaLength,55);
                            if($(this).text() == '不限'){
                                $(this).removeClass('active');
                            }
                        });
                    }

                }
                if(s.arrArea){                 //配套服务
                    //如果默认选择的有数据，去掉不限的选中样式
                    var sortLength = $('.arrSort span.active').length-1;
                    if(!(sortLength=1 && $('.arrSort span.active').text() == '不限')) {
                        $('.arrSort span.active').each(function () {
                            if ($(this).text() == '不限') {
                                $(this).removeClass('active');
                            }
                        });
                    }
                }
                if(s.q.spaces_height_gteq){   //空间层高
                    self.urlData.q.spaces_height_gteq = s.q.spaces_height_gteq;
                }
            }
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
