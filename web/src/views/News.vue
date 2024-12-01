<template>
    <div class="container">
        <div class="news-header" :style="{ backgroundImage: `url(${require('@/assets/home1.jpg')})` }">

            <div class="search">
                <el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
                    <template #reference>
                        <el-input v-model="searchText" style="width: 50%" placeholder="请输入新闻关键字" :prefix-icon="Search"
                            type="search" size="large" @input="visible = true" @blur="visible = false" />
                    </template>
                    <div v-if="searchnewslist.length">
                        <div v-for="data in searchnewslist" :key="data._id" class="search-item">
                            {{ data.title }}
                        </div>
                    </div>
                    <div v-else>
                        <el-empty description="没有搜索到相关新闻" :image-size="50" />
                    </div>
                </el-popover>
            </div>

        </div>

        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topNewsList" :key="item._id">
                    <el-card :body-style="{padding: '0px'}" shadow="hover">
                        <div class="image" :style="{backgroundImage:`url(http://localhost:3000${item.cover})`}">
                        </div>
                        <div style="padding: 14px">
                            <span>{{ item.title }}</span>
                            <div class="bottom">
                                <time class="time">{{ whichTime(item.editTime) }}</time> 
                            </div>

                        </div>
                    </el-card>
                </el-col>

            </el-row>
        </div>

    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios';
import moment from 'moment'

moment.locale('zh-cn')
const searchText = ref('')
const visible = ref(false)
const newlist = ref([])

onMounted(async () => {
    const res = await axios.get('/webapi/news/list')
    // console.log(res.data)
    newlist.value = res.data.data
})
const searchnewslist = computed(() => searchText.value ? newlist.value.filter(item => item.title.includes(searchText.value)) : [])
const topNewsList = computed(() => newlist.value.slice(0, 4))
const whichTime = (time) => moment(time).format('YYYY年MM月DD日 HH:mm')
</script>

<style lang="scss" scoped>
.container {
    position: relative;
}

.news-header {
    width: 100%;
    height: 400px;
    background-size: cover;
}

.search {
    position: absolute;
    top: 300px;
    width: 100%;
    text-align: center;

    .el-input {
        width: 50%;
    }
}

.search-item {
    height: 50px;
    line-height: 50px;

    &:hover {
        background: whitesmoke;
        color: red;
    }
}

.topnews {
    margin-top: 20px;
    .image {
        width: 100%;
        height: 150px;
        background-size: cover;
    }
    .time {
        font-size: 13px;
        color: gray;
    }
}

</style>