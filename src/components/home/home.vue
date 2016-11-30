<template>
    <div class="container">
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
        <div class="banner">
            <img src="">
            <div class="text">
                <h2>中国最专业的商业空间短租平台</h2>
                <p>省时，省力，找你所想…</p>
            </div>
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>
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
