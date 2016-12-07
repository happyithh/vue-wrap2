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
                <p class="display-center">场地加盟</p>
            </div>

        </header>


        <!--表单填写-->
        <form class="ifrom">
           <div class="base--detail ml">
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>场地名称</div>
                    <input type="text" class="base-detail-name red" placeholder="请输入场地名称">

                </div>
                <div class="input-box">
                    <div class="base-info-name">场地别名</div>
                    <input type="text" class="base-detail-name red"placeholder="请输入场地空间名">

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>场地类型</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请输入场地类型">
                        <div class="triangle-right fr">
                           <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>



                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>场地地址</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" placeholder="请输入场地地址"/>
                        <div class="triangle-right fr">
                           <a href=""><div class="icon-triangedown icon-triangedown1"></div></a>
                        </div>
                    </div>

                    <!--<select class="base-detail-name send-msg1 red">
                        <option value="请选择目的地，城市">请选择目的地，城市</option>
                        <option value="上海">上海</option>
                        <option value="北京">北京</option>
                        <option value="深圳">深圳</option>
                        <option value="成都">成都</option>
                    </select>-->

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>场地照片</div>
                        <div class="up-photo"><a class="site-pic" href=""><img src="/static/images/icon/upload.png" alt=""/></a></div>
                        <div class="up-photo-text">请上传一张含有<span>场地名称</span>的照片，大小为<span>1080*720</span><br/>仅可上传的图片格式有<span>（gif.jpg.jpeg.png）</span>且图片不得大于<span>10M</span></div>
                    </div>


                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的称呼</div>
                    <input type="text" class="base-detail-name" placeholder="请输入您的真实姓名"/>

                </div>
                <div class="input-box">
                    <div class="base-info-name">您的职位</div>
                    <input type="text" class="base-detail-name" placeholder="请输入您的职位"/>

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的联系方式</div>
                    <input type="text" class="base-detail-name" placeholder="请输入您的11位手机号"/>

                </div>
                <div class="input-box">
                    <div class="base-info-name">办公电话</div>
                    <input type="text" class="base-detail-name" placeholder="请输入您的公司联系方式"/>

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>邮箱</div>
                    <input type="text" class="base-detail-name" placeholder="请填写您邮箱地址"/>

                </div>
                <div class="input-box last-input-box">
                    <div class="base-info-name">工作证</div>
                    <div class="up-photo"><a class='site-pic' href=""><img src="/static/images/icon/upload.png" alt=""/></a></div>
                    <div class="up-photo-text">仅可上传的图片格式有（gif.jpg.jpeg.png）且图片不得大于10M</div>

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


</style>
