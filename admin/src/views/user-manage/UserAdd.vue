<template>
    <div>
        <el-page-header content="添加用户" icon="" title="用户管理" />

        <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFormRules" label-width="80px"
            class="demo-ruleForm" status-icon>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="userForm.password" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="userForm.role" placeholder="Select" style="width: 100%">
                    <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
                <el-input type="textarea" v-model="userForm.introduction" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <Upload :avatar="userForm.avatar" @kerwinchange="handleChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    添加用户
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import Upload from '@/components/upload/Upload.vue';
import { ref, reactive } from 'vue'
import upload from '@/util/upload'
import {useRouter} from 'vue-router';
const userFormRef = ref()
const userForm = reactive({
    username: '',
    password: '',
    role: 2,//1为管理员，2为编辑
    introduction: '',
    avatar: '',
    file: null,
    gender: 0,
})

const userFormRules = reactive({
    username: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请选择密码', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简介', trigger: 'blur' },
    ],
    role: [
        { required: true, message: '请选择权限', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },
    ],
})

const roleOptions = [{
    label: '管理员',
    value: 1
}, {
    label: '编辑',
    value: 2
}]

//每次选择完图片之后的回调
const handleChange = (file) => {
    userForm.avatar = URL.createObjectURL(file);
    
    userForm.file = file;
}

const router = useRouter()
const submitForm = () => {
    userFormRef.value.validate(async(valid) => {
        if (valid) {
            //提交数据到后端
            // console.log('submitForm', userForm)
            await upload('/adminapi/user/add',userForm)

            router.push(`/user-manage/userlist`)
        }
    })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>