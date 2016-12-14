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
         
         <form>
             <h1>感谢您的意见和反馈，我们会努力优化，提高体验，感谢您的支持！</h1>
             <textarea name="" id="" cols="30" rows="10" placeholder="
             请填写具体内容帮助我们了解您的意见和建议。"></textarea>
             <div class="onekey-rentail-wrap">
            <a href="javascript:;" class="btn-onekey ">提交</a >
        </div>
        </form>
        
    </div>
    
</template>
<script>
    
    import 'assets/css.css'
     import 'assets/css/form.css'
    export default {
        name: 'home',
        data () {
            return {
                informations:[
                    {}
                ]
            }
        }
    }
           
    
</script>
<style scoped>
    form{
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
