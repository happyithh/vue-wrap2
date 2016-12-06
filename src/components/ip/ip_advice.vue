<template>
    <div class="askprice">
        <!--header部分-->
        <header class="clearfix">
            <div class="left fl">
                <router-link to="/" class="back">
                    <i class="icons icon-arrowleft white"></i>
                    返回
                </router-link>
            </div>
            <div class="fl center">
                <p class="display-center">合作咨询</p>
            </div>

        </header>


        <!--表单填写-->
        <form class="ifrom">
            <div class="base--detail ml">
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的称呼</div>
                    <input type="text" class="base-detail-name" placeholder="请输入您的真实姓名">

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的联系方式</div>
                    <input type="text" class="base-detail-name"placeholder="请输入您的11位手机号">

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>短信验证码</div>
                    <div class="check-box">
                        <input type="text" class="base-detail-name send-msg1 fl" placeholder="请输入6位验证码">
                        <div  class="send-msg fr"><a href="">发送验证码</a></div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动城市</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请选择目的地，城市">
                        <div class="triangle-right fr">
                            <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>其他要求</div>
                    <div class="advise">
                        <textarea placeholder="请填写更多的详细信息，帮助您快速找到合适的场所"> </textarea>
                        <div class="font120">120字</div>
                    </div>

                </div>
                <div class="onekey-rentail-wrap">
                    <a href="" class="btn-onekey">提交</a>
                </div>
            </div>

        </form>
    </div>
</template>
<script>
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

</style>
