<template>
  <div>
    <el-divider content-position="left">个人设置</el-divider>

    <el-card class="box-card">
      <!--      <template #header>-->
      <!--        <div class="card-header">-->
      <!--          <el-button class="button" type="text" @click="handleBack"><i class="el-icon-arrow-left"/>返回</el-button>-->

      <!--          <span>个人设置</span>-->
      <!--          <div></div>-->
      <!--        </div>-->
      <!--      </template>-->
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="基本设置">
          <div class="set-title">
            <span>基本设置</span>
          </div>
          <div class="set-info">
            <div class="form-info">
              <el-form ref="settingFormRef" :model="settingForm" :rules="rules" label-width="100px"
                       class="demo-ruleForm">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="settingForm.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                  <el-input v-model="settingForm.nickname" placeholder="请输入昵称" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="个人简介" prop="desc">
                  <el-input v-model="settingForm.desc" type="textarea" placeholder="个人简介" maxlength="120"></el-input>
                </el-form-item>

                <el-form-item label="联系电话" prop="mobile">
                  <el-input v-model="settingForm.mobile" placeholder="请输入11位大陆手机号码"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button color="#263445" :loading="updateLoading" @click="submitForm()">更新基本信息</el-button>
                  <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="avatar">
              <div class="preview">
                <span>头像</span>
                <img src="../../assets/images/img.png"/>
              </div>
              <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
              >
                <el-button style="margin-left: 10px"  color="#263445"><i class="el-icon-upload"></i>更换头像
                </el-button>
              </el-upload>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="安全设置">
          <div class="set-title">
            <span>安全设置</span>
          </div>
          <div class="secure-item">
            <div class="secure-info">
              <span class="secure-key">账户密码</span>
              <span class="secure-value">当前密码强度：强</span>
            </div>
            <div class="opera-btn"><span>修改</span></div>
          </div>
          <div class="secure-item">
            <div class="secure-info">
              <span class="secure-key">密保手机</span>
              <span class="secure-value">已绑定手机：138****2234</span>
            </div>
            <div class="opera-btn"><span>修改</span></div>
          </div>
          <div class="secure-item">
            <div class="secure-info">
              <span class="secure-key">绑定邮箱</span>
              <span class="secure-value">已绑定邮箱：geek****@outlook.com</span>
            </div>
            <div class="opera-btn"><span>修改</span></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新消息通知">
          <div class="set-title">
            <span>新消息通知</span>
          </div>
          <div class="secure-item">
            <div class="secure-info">
              <span class="secure-key">账户密码</span>
              <span class="secure-value">用户信息将以系统内部渠道通知</span>
            </div>
            <el-tooltip :content="'是否开启用户信息: '" placement="top">
              <el-switch v-model="userSwitch" active-color="#13ce66" inactive-color="#ff4949" :active-value="true"
                         :inactive-value="false" style="margin-right: 30px"></el-switch>
            </el-tooltip>
          </div>
          <div class="secure-item">
            <div class="secure-info">
              <span class="secure-key">系统消息</span>
              <span class="secure-value">系统消息将以系统内部渠道通知</span>
            </div>
            <el-tooltip :content="'是否开启系统消息: '" placement="top">
              <el-switch v-model="sysSwitch" active-color="#13ce66" inactive-color="#ff4949" :active-value="true"
                         :inactive-value="false" style="margin-right: 30px"></el-switch>
            </el-tooltip>
          </div>
          <div class="secure-item">
            <div class="secure-info">
              <span class="secure-key">代办任务</span>
              <span class="secure-value">代办任务将以系统内部渠道通知</span>
            </div>
            <el-tooltip :content="'是否开启代办任务消息: '" placement="top">
              <el-switch v-model="taskSwitch" active-color="#13ce66" inactive-color="#ff4949" :active-value="true"
                         :inactive-value="false" style="margin-right: 30px"></el-switch>
            </el-tooltip>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'

let settingForm = ref({email: '', nickname: ' ', desc: '', mobile: ' '})
let tabPosition = ref('left')

let userSwitch = ref(false);
let sysSwitch = ref(false);
let taskSwitch = ref(false);


const validateMobile = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('手机号码不可为空哦'))
  } else {
    const reg = /^1[3-9]\d{9}$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的手机号码'))
    }
  }
}

const rules = {
  email: [
    {required: true, message: '请输入邮箱地址', trigger: 'blur'},
    {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
  ],
  nickname: {required: true, message: '请输入昵称', trigger: ['blur', 'change']},
  desc: {required: true, message: '请输入个人简介', trigger: ['blur', 'change']},
  mobile: {required: true, validator: validateMobile, trigger: ['blur', 'change']}
}


onMounted(() => {

})
</script>

<style scoped>
.set-title {
  text-align: left;
}

.set-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
}

.avatar {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
}

.preview {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 20px;

}

img {
  width: 174px;
  height: 174px;
  border-radius: 50%;
}


.secure-item {
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.secure-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.secure-key {
  margin-bottom: 4px;
  color: rgba(0, 0, 0, .85);
  font-size: 14px;
  line-height: 1.6;
}

.secure-value {
  color: rgba(0, 0, 0, .45);
  font-size: 14px;
  line-height: 1.6;
}

.opera-btn {
  margin-right: 50px;
  color: #1890ff;
  cursor: pointer;
}

.box-card {
  margin: 10px auto;;
  width: 80%;
}

</style>
