<template>
    <div class="box">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                  <a onclick='router.back()' class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </a>
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

               <!--<input type="file" id='xFile'accept="images/*"/>-->
                <input type="file" @change="previewImg($event,'#thubm')" id='xFile'>
                <label  for="xFile"><img id="thubm" src="/static/images/test_logo.png" alt=""/></label>
            </div>
            
            <div class="input-box">
                <div class="base-info-name">您的称呼</div>
                <input type="text" class="base-detail-name" v-model='personalData.name' placeholder="请输入您的称呼"/>

            </div>
            <div class="input-box">
                <div class="base-info-name">手机号</div>
                <input type="text" class="base-detail-name"v-model='order.moblie' placeholder="请输入11位手机号" disabled/>

            </div>
            <div class="input-box">
                <div class="base-info-name">公司名称</div>
                <input type="text" class="base-detail-name"v-model='order.company_name' placeholder="请输入公司名称"disabled/>

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
            personalData (){
                return this.$store.state.personalData
            },
        },
        mounted(){
            var self=this
            //self.$store.commit('getPersonalData');
            setTimeout(function () {
                if(self.personalData.name){
                    self.order.moblie = self.personalData.mobile
                    self.order.name = self.personalData.name
                    self.order.company_name = self.personalData.company_name
                }
            },300)
         },
        methods:{
           
            // personalDataChange(data){
            //     this.$store.commit('personalDataChange',data)
            // }, 
            personalInfo(data){
                var self=this;
                if(!self.personalData.name){
                        $.toptip('请输入您的称呼',2000,'error');
                        return;
                    }
                    if(!self.order.moblie){
                        $.toptip('请输入您的手机号',2000,'error');
                        return;
                    }
                     if(!self.order.company_name){
                        $.toptip('请输入您的公司名称',2000,'error');
                        return;
                    }
                   
                $.ajax({
                    type:'put',
                    url: window.YUNAPI.personalInfo,
                    data:GlobleFun.objConcat(self.$store.getters.validationData,
                    {name:self.personalData.name,company_name:self.order.company_name,moblie:self.order.moblie,}),
                    success : function (data,status,xhr) {
                       //console.log(data)
                        data.data.access_token = xhr.getResponseHeader('access-token');
                        data.data.client = xhr.getResponseHeader('client');
                        self.$store.commit('personalDataChange',data.data);//保存个人信息
                        $.alert({
                            title: '保存成功',
                            text: '',
                            onOK: function () {
                               router.replace('../form/aboutMe')
                               
                            }
                        });
                        
                       // router.replace(self.$route.path);  // 刷新页面
                        self.$parent.loading = false;
                    },
                     
                });
            },
            previewImg(input,obj) {
                input = input.target
                if(input.files && input.files[0]) {
                    var reader = new FileReader(),
                            img = new Image();
                    reader.onload = function (e) {
                        if(input.files[0].size>800000){//图片大于300kb则压缩
                            img.src = e.target.result;
                            img.onload=function(){
                                $(obj).attr('src', compress(img));
                            }
                        }else{
                            $(obj).attr('src', e.target.result);
                        }
                    }
                    reader.readAsDataURL(input.files[0]);
                    return 1;
                }
            },
            compress(img) {
                var initSize = img.src.length;
                var width = img.width;
                var height = img.height;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext('2d');
                //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                var ratio;
                if ((ratio = width * height / 4000000)>1) {
                    ratio = Math.sqrt(ratio);
                    width /= ratio;
                    height /= ratio;
                }else {
                    ratio = 1;
                }
                canvas.width = width;
                canvas.height = height;
                //铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, width, height);
                //进行最小压缩
                var ndata = canvas.toDataURL("image/jpeg", 0.1);
                console.log(ndata.length)
                canvas.width = canvas.height = 0;
                return ndata;
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
