<template>
    <div class="askprice">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                <router-link to="/form/personal-center" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <h1 class="display-center">意见反馈</h1>
            </div>
            
        </header>
        <template>
            <div class="feedback">
                <h1>感谢您的意见和反馈，我们会努力优化、提高体验，感谢您的支持！</h1>
                <textarea v-model="FeedbackText" class="feedbackText" rows="22" placeholder="请填写具体内容帮助我们了解您的意见和建议"></textarea>
                <a @click="getFeedbackText" class="fl btn-onekey  js-feedback-btn">提交</a>
            </div>
        </template>
        
    </div>
    
</template>
<script>
    
    import 'assets/css.css'
     import 'assets/css/form.css'
    export default {
        name: 'home',
        data () {
            return {
                showstate: 0,
                FeedbackText:'', 
                
            }
        },
        computed : {
            personalData (){
                return this.$store.state.personalData
            }
        },
        methods: {
        getFeedbackText(){
            var self=this;
            var FeedbackText = $('.feedbackText').val();
            if(FeedbackText.length< 3){
                console.log(111111)
                // return false;
            }
            $.post({
                url: window.YUNAPI.feedBack,
                data:{
                    user_id: 1,
                    content: self.FeedbackText
                },
                success : function (data) {
                    if(FeedbackText==''){
                        console.log("aaaaa")

                    }else{
                        $.alert({
                            title: '提交成功',
                            text: '感谢您的宝贵意见，我们会更加努力优化!<br>客服热线 : 400-056-0599',
                            onOK: function () {
                                router.replace('/form/personal-center')
                                //window.location.href='../form/personal-center';
                            }
                        });
                        self.FeedbackText='';
                    }
                    self.$parent.loading = false;
                }
            });
        }
    }
    }
           
    
</script>
<style scoped>
    .feedback{
        font-size: .9rem;
        margin: 20px 15px;
    }
    textarea{
        text-indent: 0px;
        width:100%;
        height:280px;
        margin-top:20px; 
        font-size: 16px;
        border: 1px solid #999999;
       
    }
    

</style>
