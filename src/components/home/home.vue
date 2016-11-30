<template>
    <div class="container">

        <!--头部-->
        <header>
            <div class="citys">
                <select>
                    <option>上海</option>
                    <option>北京</option>
                    <option>广州</option>
                </select>
            </div>
            <div class="logo"><img src="/static/images/logo.png"></div>
            <a href="javascript:;" class="logreg">登录/注册</a>
        </header>

        <!--banner-star-->
        <div class="banner">
            <img src="">
            <div class="text">
                <h2>中国最专业的商业空间短租平台</h2>
                <p>省时，省力，找你所想…</p>
            </div>
            <ul>
                <li>
                    <span class="icon"></span>
                    <p>我要办活动</p>
                    
                </li>
                <li>
                    <span class="icon"></span>
                    <p>我要开快闪店</p>
                </li>
                <li>
                    <span class="icon"></span>
                    <p>我要找IP文创</p>
                </li>
            </ul>
        </div><!--banner-end-->

        <!--精选专题-star-->
        <div class="subject">
            <h2>精选专题</h2>

        </div>
        <router-link to="/askprice">askprice</router-link>
    </div>
</template>

<script>
// import activities from './components/activities/activities'

    
    export default {
        name: 'home',
        data () {
            return {
                msg: 'home.vue'
            }
           
    }
    
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
