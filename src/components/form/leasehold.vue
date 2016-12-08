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
                <h1 class="display-center">一键租场地</h1>
            </div>
            
        </header>

       
        <!--表单填写-->
        <form class="ifrom">
           <div class="base--detail ml">
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的称呼</div>
                    <input type="text" class="base-detail-name red" v-model='username' placeholder="请输入您的真实姓名"/>
                   
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的联系方式</div>
                    <input type="text" class="base-detail-name red" v-model='phone'placeholder="请输入您的11位手机号"/>
                 
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>短信验证码</div>
                    <div class="check-box">
                        <input type="text" class="base-detail-name send-msg1 fl red " v-model='checknumber' placeholder="请输入6位验证码"/>
                        <div  class="send-msg fr"><a href="">发送验证码</a></div>
                    </div>
                    
                   
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动城市</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl" v-model='address' placeholder="请选择目的地，城市">
                        <div class="triangle-right fr">
                           <a href=""><div class="icon-triangedown icon-triangedown1"></div></a> 
                        </div>

                        
                    </div>
                    <!--<select>
                        <option value="请选择目的地，城市">请选择目的地，城市</option>
                        <option value="上海">上海</option>
                        <option value="北京">北京</option>
                        <option value="深圳">深圳</option>
                        <option value="成都">成都</option>
                    </select>-->
                    
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动人数</div>
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl"v-model='peoplenum' placeholder="不限"/>
                        <div class="triangle-right fr">
                           <a href=""><div class="icon-triangedown icon-triangedown1"></div></a> 
                        </div>

                        
                    </div>
                    
                    
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动时间</div>
                    <input type="text" class="base-detail-name"v-model='date' placeholder="请选择日期范围"/>
                   
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动类型</div>
                    
                    <div class="triangle">
                        <input type="text" class="base-detail-name fl"v-model='style' placeholder="请选择活动类型"/>
                        <div class="triangle-right fr">
                           <a href=""><div class="icon-triangedown icon-triangedown1"></div></a> 
                        </div>

                        
                    </div>
                   
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>其他要求</div>
                    <div class="advise">
                        <textarea v-model='request' placeholder="请填写更多的详细信息，帮助您快速找到合适的场所"> </textarea>
                       <div class="font120">120字</div>
                    </div>
                    
                </div>
                <div class="onekey-rentail-wrap">
                    <a href="javascript:;" class="btn-onekey pop-sucess">提交</a>
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
                username:'',
                phone:'',
                checknumber:'',
                address:'',
                password:'',
                peoplenum:'',
                date:'',
                style:'',
                request:'',
              

            }
       
        },
          mounted () {
            var self = this;

            $('.pop-sucess').click(function () {
                $.modal({
                    title: "提交成功",
                    text: "客服专员将尽快联系你，请耐心等待！<br>客服热线：400-056-0599",
                    buttons: [
                        { text: "关闭", onClick: function(){ console.log(1)} },

                    ]
                });
            })

        },
    }
           
    
</script>
<style scoped>

</style>
