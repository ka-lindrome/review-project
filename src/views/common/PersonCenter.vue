<template>
  <div style="width:400px;">
    <!--    <div style="width: 178px;height: 178px;margin-bottom: 20px;margin-left:110px;margin-top:50px">-->
    <!--      <el-upload-->
    <!--          class="avatar-uploader"-->
    <!--          action="http://localhost:8090/image/upload"-->
    <!--          :show-file-list="false"-->
    <!--          :on-success="handleAvatarSuccess"-->
    <!--      >-->
    <!--        <img v-if="form.url" :src="form.url" class="avatar" style="width:178px;height:178px">-->
    <!--        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
    <!--      </el-upload>-->
    <!--    </div>-->
    <!--    <el-form ref="formRef" :model="form" label-width="100px">-->
    <!--      <el-form-item label="用户名" prop="username">-->
    <!--        <el-input v-model="form.username" style="width: 200px" clearable></el-input>-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="手机号码" prop="phone">-->
    <!--        <el-input v-model="form.phone" style="width: 200px" clearable></el-input>-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="电子邮箱" prop="email">-->
    <!--        <el-input v-model="form.email" style="width: 200px" clearable></el-input>-->
    <!--      </el-form-item>-->

    <!--      <el-form-item>-->
    <!--        <el-button type="primary" color="#263445" @click="submit"> 确定</el-button>-->
    <!--      </el-form-item>-->
    <!--    </el-form>-->
    个人中心页面
  </div>

</template>

<script setup>
import {onMounted, ref} from 'vue'

let form = ref({username: '', url: require('@/assets/images/img.png'), phone: '', email: ''})

onMounted(() => {

})

</script>

<style scoped>

</style>
