<template>
    <div class="container">
        <div class="news-header" :style="{ backgroundImage: `url(${require('@/assets/home1.jpg')})` }">

            <div class="search">
                <el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
                    <template #reference>
                        <el-input v-model="searchText" style="width: 50%" placeholder="请输入新闻关键字" :prefix-icon="Search"
                            type="search" size="large" @input="visible = true" @blur="visible = false" 
                            />
                    </template>
                    <div v-if="searchnewslist.length">
                        <div v-for="data in searchnewslist" :key="data._id" class="search-item" @click="handleChangepage(data._id)">
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
                    <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangepage(item._id)">
                        <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
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

        <el-tabs v-model="whichTab" class="demo-tabs" style="margin-top: 20px">
            <el-tab-pane v-for="item in tablist" :label="item.label" :name="item.name" :key="item.name">

                <el-row :gutter="20">
                    <el-col :span="18">

                        <div v-for="data in tabnews[item.name]" :key="data._id" style="padding: 10px">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangepage(data._id)">
                                <div class="tab-image"
                                    :style="{ backgroundImage: `url(http://localhost:3000${data.cover})` }">
                                </div>
                                <div style="padding: 14px; float: left;">
                                    <span>{{ data.title }}</span>
                                    <div class="bottom">
                                        <time class="tab-time">{{ whichTime(data.editTime) }}</time>
                                    </div>

                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-timeline style="max-width: 600px">
                            <el-timeline-item v-for="(data, index) in tabnews[item.name]" :key="index"
                                :timestamp="whichTime(data.editTime)">
                                {{ data.title }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <el-backtop :visibility-height="100"/>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios';
import moment from 'moment'
import _ from 'lodash'
import { useRouter } from 'vue-router'

moment.locale('zh-cn')
const router = useRouter()
const searchText = ref('')
const visible = ref(false)
const newlist = ref([])
const whichTab = ref(1)
const tablist = [
    {
        label: '最新动态',
        name: 1
    },
    {
        label: '典型案例',
        name: 2
    },
    {
        label: '通知公告',
        name: 3
    },
]

onMounted(async () => {
    const res = await axios.get('/webapi/news/list')
    // console.log(res.data)

    newlist.value = res.data.data
})
const searchnewslist = computed(() => searchText.value ? newlist.value.filter(item => item.title.includes(searchText.value)) : [])
const topNewsList = computed(() => newlist.value.slice(0, 4))
const whichTime = (time) => moment(time).format('YYYY年MM月DD日 HH:mm')

const tabnews = computed(() => _.groupBy(newlist.value, item => item.category))

const handleChangepage = (id) => {
    // console.log(id)
    router.push(`/new/${id}`)
}
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

.tab-image {
    width: 150px;
    height: 100px;
    background-size: cover;
    float: left;
}

.tab-time {
    font-size: 13px;
    color: gray;
}
</style>