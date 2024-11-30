<template>
    <div class="navbar">
        <el-menu :default-active="route.fullPath" class="el-menu-demo" mode="horizontal" :router="true">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/news">新闻中心</el-menu-item>
            <el-menu-item index="/product">产品与服务</el-menu-item>
            <el-menu-item index="" @click="hadleClick">登陆</el-menu-item>
        </el-menu>
        <div class="right">企业门户官网</div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const hadleClick = () => {
    window.location = 'http://localhost:8080'
}
</script>

<style lang="scss" scoped>
.navbar {
    position: sticky;
    top: 0px;
    z-index: 999;
}

.right {
    position: fixed;
    top: 0px;
    right: 20px;
    widows: 100px;
    height: 59px;
    line-height: 59px;
    text-align: center;
}
</style>