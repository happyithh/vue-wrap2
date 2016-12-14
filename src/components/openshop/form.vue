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
                <h1 class="display-center">我要开快闪店</h1>
            </div>

        </header>


        <!--表单填写-->
        <form class="ifrom">
            <div class="base--detail ml">
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的称呼</div>
                    <input type="text"  class="base-detail-name" placeholder="请输入您的真实姓名">

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>您的联系方式</div>
                    <input type="text"   class="base-detail-name" placeholder="请输入您的11位手机号">

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>公司名称</div>
                    <input type="text"  class="base-detail-name" placeholder="请输入公司名称">

                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动城市</div>
                     <div class="triangle">
                        <select >
                            <option value="">请选择目的地，城市</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>活动区域</div>
                    <div class="triangle">
                        <select>
                             <option value="">请选择活动区域</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>落位区域</div>
                     <div class="triangle">
                        <select >
                            <option value="">请选择落位地区</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name"><span>*</span>商业客流</div>
                     <div class="triangle">
                        <select >
                            <option value="">请选择商业客流</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>

                <div class="op-title">
                    补充条件<span>(完善信息会优先处理)</span>
                </div>

                <div class="input-box">
                    <div class="base-info-name">目标客群</div>
                     <div class="triangle">
                        <select >
                            <option value="">请选择目标客群</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">开店类型</div>
                    <div class="triangle">
                        <select >
                            <option value="">请选择开店类型</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">数量</div>
                    <input style="width: 120px" type="text" class="base-detail-name" placeholder="请输入数量">
                    <span>米 以上</span>
                </div>
                <div class="input-box">
                    <div class="base-info-name">面积</div>
                     <div class="triangle">
                        <select >
                            <option value="">请选择面积</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">层高</div>
                     <div class="triangle">
                        <select >
                            <option value="">请选择层高</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">档期周期</div>
                     <div class="triangle">
                        <select >
                            <option value="">请选择档期周期</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">装置尺寸</div>
                    <div class="size first">
                        <input type="text" class="base-detail-name" placeholder="长＊高＊宽 40*50*80">
                        <span>/m</span>
                    </div>
                    <div class="size">
                        <input type="text" class="base-detail-name" placeholder="用电功率 10-100">
                        <span>/m</span>
                    </div>
                    <div class="size">
                        <input type="text" class="base-detail-name" placeholder="上下水 10-100">
                        <span>/m</span>
                    </div>
                </div>
                <div class="input-box">
                    <div class="base-info-name">其他要求（可多选）</div>
                     <div class="triangle">
                        <select >
                            <option value="">请选择其他要求</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>

                <div class="onekey-rentail-wrap">
                    <a href="javascript:;" class="btn-onekey" @click="createRetail" >提交</a>
                </div>
            </div>
        </form>
    </div>

</template>
<script>
   
    import 'assets/css/form.css'
    import 'assets/css.css'
    export default {
        name: 'home',
        data () {
            return {
                informations:[
                    {}
                ],
                consult:{
                    access_token:'_UVbn1Ds9ecf8LCTpJqALg',
                    uid:'13127808798',
                    client:'KdNLbJGdabQ-oxfXiTv5bw',
                    s_time:'',
                    e_time:'',
                    phone:'',
                    contact:'联系人',
                    company:'公司名',
                    order_city:'城市',
                    activities_required:"活动区域:汽车站; 落位区域:中庭;商业客流:5千-1万;"

                }
               
                
            }
        },
        computed: {
            
        },
        method:{
            createRetail : function () {
                var self = this;
                if(!self.consult.uid){
                    $.toptip('姓名不能为空!',2000,'error');
                    return;
                }
                if(!self.consult.phone){
                    $.toptip('手机号不能为空!',2000,'error');
                    return;
                }
                if(!self.consult.company){
                    $.toptip('公司名不能为空!',2000,'error');
                    return;
                }
                if(!self.consult.order_city){
                    $.toptip('请选择活动城市!',2000,'error');
                    return;
                }
                if(!self.consult.activities_required[0]){
                    $.toptip('请选择活动区域!',2000,'error');
                    return;
                }
                if(!self.consult.activities_required[1]){
                    $.toptip('请选择落位地区!',2000,'error');
                    return;
                }
                if(!self.consult.activities_required[2]){
                    $.toptip('请选择商业客流!',2000,'error');
                    return;
                }
                if(!self.consult.consulting_content){
                    $.toptip('其他要求不能为空!',2000,'error');
                    return;
                }
                $.post({
                    url: window.YUNAPI.createRetail,
                    data : self.consult,
                    success: function (data) {
                        var status = data.status == 1 ? 'success' : 'error';

                        if(data.status == 1){
                            $.alert({
                                title: '提交成功',
                                text: '客服专员将尽快联系你,请耐心等待!<br>客服热线 : 400-056-0599',
                                onOK: function () {
                                    router.back()
                                }
                            });
                        }else{
                            $.toptip(data.message,2000,status);
                        }

                    },
                    error : function () {

                    }
                });
            },
                
            },
      
                
        
    
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
        font-family:PingFangSC-Regular;
        font-size:.6rem;
        color:#000000;
        text-align:left;
    }
    /*.input-box select{
        width: 100%;
        background: #ffffff;

    }*/
    .up-photo .site-pic{
        width: 150px;
        height: 150px
    }


    .input-box select option{
        background: #ffffff;
    }


</style>
