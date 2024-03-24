<template>
  <div>
    <el-divider content-position="left">个人设置</el-divider>

    <el-card class="box-card">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="基本设置">
          <div class="set-title">
            <span>基本设置</span>
          </div>
          <div class="set-info" v-show="roleID === 1 || roleID === 2">
            <div class="form-info">
              <el-form ref="settingFormRef" :model="settingForm" :rules="rules" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="settingForm.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="nickname">
                  <el-input v-model="settingForm.nickname" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="个人简介" prop="desc">
                  <el-input v-model="settingForm.desc" type="textarea" placeholder="个人简介"></el-input>
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
                <img :src="imgUrl" />
              </div>
              <el-upload class="avatar-uploader" action="http://10.22.232.237:8081/user/avatar_file" method="put" :headers="headers"
                :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <el-button style="margin-left: 10px" color="#263445"><i class="el-icon-upload"></i>更换头像
                </el-button>
              </el-upload>
            </div>
          </div>
          <div class="set-info" v-show="roleID === 3">
            <div class="form-info">
              <el-form ref="settingFormRef" :model="settingForm1" :rules="rules" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="学号" prop="stuID">
                  <el-input v-model="settingForm1.stuID" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="nickname">
                  <el-input v-model="settingForm1.nickname" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="年级" prop="grade">
                  <el-input v-model="settingForm1.grade" placeholder="请输入年级"></el-input>
                </el-form-item>
                <el-form-item label="班级" prop="class">
                  <el-input v-model="settingForm1.class" placeholder="请输入班级"></el-input>
                </el-form-item>
                <el-form-item label="家长姓名" prop="pname">
                  <el-input v-model="settingForm1.pname" placeholder="请输入家长姓名"></el-input>
                </el-form-item>
                <el-form-item label="家长联系电话" prop="mobile">
                  <el-input v-model="settingForm1.mobile" placeholder="请输入家长联系电话"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="settingForm1.email" placeholder="请输入邮箱"></el-input>
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
                <img :src="imgUrl" />
              </div>
              <el-upload class="avatar-uploader" action="http://10.22.232.237:8081/user/avatar_file" method="put" :headers="headers"
                :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <el-button style="margin-left: 10px" color="#263445"><i class="el-icon-upload"></i>更换头像
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
              <span class="secure-key">账户密码 (建议含有字母,数字以及特殊符号并且密码长度不小于16)</span>
              <span class="secure-value">当前密码强度：{{ intensity }}</span>
            </div>
            <div class="opera-btn"><span>修改</span></div>
          </div>
          <div class="secure-item">
            <div class="secure-info">
              <span class="secure-key">密保手机</span>
              <span class="secure-value">已绑定手机：{{ phone }}</span>
            </div>
            <div class="opera-btn"><span>修改</span></div>
          </div>
          <div class="secure-item">
            <div class="secure-info">
              <span class="secure-key">绑定邮箱</span>
              <span class="secure-value">已绑定邮箱：{{ email }}</span>
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
import { onMounted, ref, data } from 'vue'
import API from '@/utils/axiosInference'

let settingForm = ref({ email: '', nickname: '', desc: '', mobile: '' })
let settingForm1 = ref({ email: '', nickname: '', desc: '', mobile: '', stuID: '', grade: '', class: '', pname: '' })

let tabPosition = ref('left')
let userSwitch = ref(false);
let sysSwitch = ref(false);
let taskSwitch = ref(false);
let intensity = ref("较弱")
const token = ref('')
let imgUrl = ref(require("../../../assets/images/img.png"))
let phone = ref('')
let email = ref('')
let roleID = ref(1)

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    $message.error('上传头像图片只能是 JPG 格式!');
  }
  if (!isLt2M) {
    $message.error('上传头像图片大小不能超过 2MB!');
  }
  return isJPG && isLt2M;
};

const handleAvatarSuccess = (response, file) => {
 
};

const headers = {
  token: token.value
}

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

let check = (val) => {
  let complexity = 0;
  if (/\d/.test(val)) {
    complexity++;
  }
  if (/[a-zA-Z]/.test(val)) {
    complexity++;
  }
  if (/[^a-zA-Z0-9]/.test(val)) {
    complexity++;
  }
  return complexity;
}


const rules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  nickname: { required: true, message: '请输入昵称', trigger: ['blur', 'change'] },
  desc: { required: true, message: '请输入个人简介', trigger: ['blur', 'change'] },
  mobile: { required: true, validator: validateMobile, trigger: ['blur', 'change'] }
}

onMounted(() => {
  token.value = sessionStorage.getItem('Token')
  headers.token = sessionStorage.getItem('Token')
  API({
    method: 'get',
    url: '/user/profile',
    headers: {
      token: token.value
    }
  }).then(res => {
    const data = res.data.data
    roleID.value = data.role
    if (roleID.value == 1 || roleID.value == 2) {
      settingForm.value.email = data.email
      settingForm.value.nickname = data.name
      settingForm.value.desc = data.introduction
      settingForm.value.mobile = data.phone
    } else {
      settingForm1.value.email = data.email
      settingForm1.value.nickname = data.name
      settingForm1.value.desc = data.introduction
      settingForm1.value.mobile = data.phone
      settingForm1.value.grade = data.grade
      settingForm1.value.class = data.class
      settingForm1.value.stuID = data.studentID
      settingForm1.value.pname = data.parent
    }
    phone.value = data.phone
    email.value = data.email
    imgUrl.value = data.avatar
    let pwd = data.password
    let ret = check(pwd)
    if (ret === 3) {
      intensity.value = "强"
    } else if (ret === 2) {
      intensity.value = "较强"
    } else if (ret == 1) {
      intensity.value = "弱"
    }
  })
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
  margin: 10px auto;
  width: 80%;
}
</style>
