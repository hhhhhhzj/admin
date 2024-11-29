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
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column label="是否发布" width="180">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value='1' :inactive-value='0'
                            @change="handleSwitchChange(scope.row)" />
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button circle :icon='Star' type="success" @click="handlePreview(scope.row)">
                        </el-button>
                        <el-button circle :icon='Edit'>
                        </el-button>
                        <el-button circle :icon='Delete' type="danger">
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>



        </el-card>

        <el-dialog v-model="dialogVisible" title="预览新闻" width="500">
            <div>
                <h2>{{ previewData.title }}</h2>
                <div style="font-size: 12px;color: gray;">{{ formatTime.getTime(previewData.editTime) }}</div>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <div v-html="previewData.content"></div>
            </div>
        </el-dialog>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import formatTime from '@/util/formatTime'
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'

const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)

onMounted(() => {
    getTableData()
})
const getTableData = async () => {
    const res = await axios.get(`/adminapi/news/list`)
    // console.log(res.data.data);
    tableData.value = res.data.data
}
//格式化分类
const categoryFormat = (category) => {
    const arr = ['最新分类', '典型案例', '通知公告']
    return arr[category]
}
//开关回调
const handleSwitchChange = async (item) => {
    // console.log(item);
    await axios.put(`/adminapi/news/publish`, {
        _id: item._id,
        isPublish: item.isPublish
    })
    await getTableData()
}
//预览回调
const handlePreview = (data) => {
    // console.log(data);
    previewData.value = data
    dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.el-table {
    margin-top: 50px;
}

::v-deep .el-dialog__body{
    img{
        max-width: 100%;
    }
} 

</style>