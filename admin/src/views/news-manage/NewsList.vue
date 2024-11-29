<template>  
    <div>
        <el-card>
            <el-page-header content="新闻列表" icon="" title="新闻管理" />

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题" width="180" />

                <el-table-column prop="category" label="分类" width="180">
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>

                <el-table-column label="更新时间" width="180">
                    <template #default="scope">
                        {{ formatTime.getTime() }}
                    </template>
                </el-table-column>

                <el-table-column label="是否发布" width="180">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value='1' :inactive-value='0' />
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button circle :icon='Star' type="success"  >
                        </el-button>
                        <el-button circle :icon='Edit'>
                        </el-button>
                        <el-button circle :icon='Delete' type="danger"  >
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>

            

        </el-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import formatTime from '@/util/formatTime'
import {Star,Edit,Delete} from '@element-plus/icons-vue'

const tableData = ref([])

onMounted(() => {
    getTableData()
})
const getTableData = async() => {
    const res = await axios.get(`/adminapi/news/list`)
    // console.log(res.data.data);
    tableData.value = res.data.data
}
//格式化分类
const categoryFormat = (category) => {
    const arr = ['最新分类', '典型案例', '通知公告']
    return arr[category]
}

</script>

<style scoped>
.el-table {
    margin-top: 50px;
}
</style>