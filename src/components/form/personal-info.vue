<template>
    <div class="box">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                 <router-link to="/form/personal-center" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <h1 class="display-center">个人信息</h1>
            </div>
            <div class="right fr">
                <a class="btn-inquiry fr in" @click='personalInfo'>保存</a>
            </div>
            
        </header>
        <form class="personal-box">
            <div class="img-box">
               <!--<a href=""> <img src="/static/images/test_logo.png" alt=""/></a>-->
               <label  for="xFile"><img src="/static/images/test_logo.png" alt=""/></label>
               <input type="file" id='xFile'accept="images/*"/>
            </div>
            
            <div class="input-box">
                <div class="base-info-name">您的称呼</div>
                <input type="text" class="base-detail-name" v-model='order.name' placeholder="请输入您的称呼"/>

            </div>
            <div class="input-box">
                <div class="base-info-name">手机号</div>
                <input type="text" class="base-detail-name"v-model='order.moblie' placeholder="请输入11位手机号"/>

            </div>
            <div class="input-box">
                <div class="base-info-name">公司名称</div>
                <input type="text" class="base-detail-name"v-model='order.company_name' placeholder="请输入公司名称"/>

            </div>
        </form>
        
        
    </div>
    
</template>
<script>
    import 'assets/css.css'
    import 'assets/css/form.css'
    export default {
      
        data () {
            return {
                order:{
                    name:'',
                    moblie:'',
                    company_name:''
                }
                
            }

        },
        computed:{
            //  personalData (){
            //     return this.$store.state.personalData
            // }
        },
        methods:{
            personalInfo(data){
                var self=this;
                if(!self.order.name){
                        $.toptip('请输入您的称呼',2000,'error');
                        return;
                    }
                    if(!self.order.moblie){
                        $.toptip('请输入您的手机号',2000,'error');
                        return;
                    }
                    // if(!self.company){
                    //     $.toptip('请输入公司名称',2000,'error');
                    //     return;
                    // }
                $.get({
                    url: window.YUNAPI.personalInfo,
                    data: self.$store.getters.validationData,
                    // data:GlobleFun.objConcat(this.$store.getters.validationData,{page:1,order_id:222}),
                    success : function (data) {
                       // data.order=self.$store.state.personalData;
                        console.log(data)
                        $.alert({
                            title: '保存成功',
                            text: '',
                            onOK: function () {
                                
                                window.location.href='../form/personal-center';
                            }
                        });
                        self.$parent.loading = false;
                    },
                     getPersonalData(data){
                            this.$store.commit('getPersonalData',data)
                        // router.replace('/')
                    }, 
                });
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
    .personal-box{
        width: 100%;
        height: auto;
        padding:17px 15px 0;
        
    }
    .img-box{
        text-align: center;
    }
    .img-box a{
        width: 75px;
        height: 75px;
        margin: 0 auto;
    }
    
    .img-box img{
        width: 75px;
        height: 75px; 
      
    }
    #xFile{
        opacity:0;
    }

</style>
