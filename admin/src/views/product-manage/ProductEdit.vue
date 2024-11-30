<template>
    <div>
        <el-page-header content="编辑产品" @back="handleBack()" title="产品管理" />

        <el-form ref="productFormRef" style="max-width: 600px" :model="productForm" :rules="productFormRules" label-width="80px"
            class="demo-ruleForm" status-icon>
            <el-form-item label="产品名称" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>
            <el-form-item label="产品简介" prop="introduction">
                <el-input type="textarea" v-model="productForm.introduction" />
            </el-form-item>
            <el-form-item label="产品详细描述" prop="detail">
                <el-input type="textarea" v-model="productForm.detail" />
            </el-form-item>
            <el-form-item label="产品图片" prop="cover">
                <Upload :avatar="productForm.cover" @kerwinchange="handleChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    更新产品
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import Upload from '@/components/upload/Upload.vue';
import { ref, reactive, onMounted } from 'vue'
import upload from '@/util/upload'
import {useRouter,useRoute} from 'vue-router';
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const productFormRef = ref()
const productForm = reactive({
    title: '',
    introduction: '',
    detail: '',
    cover: '',
    file: null,
})

const productFormRules = reactive({
    title: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    detail: [
        { required: true, message: '请输入详细描述', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简要描述', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传产品图片', trigger: 'blur' },
    ],
})

onMounted(() => {
    getData()
})
const getData = async () => {
    const res = await axios.get(`/adminapi/product/list/${route.params.id}`)
    console.log(res.data.data[0]);
    Object.assign(productForm, res.data.data[0])
}
//每次选择完图片之后的回调
const handleChange = (file) => {
    productForm.cover = URL.createObjectURL(file);
    
    productForm.file = file;
}
//返回上一页
const handleBack = () => {
    router.back()
}
const submitForm = () => {
    productFormRef.value.validate(async(valid) => {
        if (valid) {
            //提交数据到后端
            // console.log('submitForm', productForm)
            await upload('/adminapi/product/list',productForm)

            router.push(`/product-manage/productlist`)
        }
    })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>