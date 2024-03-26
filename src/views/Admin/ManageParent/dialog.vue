<template>
    <div class="system-user-dialog-container">
        <el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
            <el-form ref="userDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="学生姓名">
                            <el-input v-model="state.ruleForm.name" placeholder="请输入学生名字" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="学号">
                            <el-input v-model="state.ruleForm.name" placeholder="请输入学生学号" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="家长姓名">
                            <el-input v-model="state.ruleForm.phone" placeholder="请输入家长姓名" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="手机号">
                            <el-input v-model="state.ruleForm.phone" placeholder="请输入手机号" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="邮箱">
                            <el-input v-model="state.ruleForm.email" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="账户密码">
                            <el-input v-model="state.ruleForm.password" placeholder="请输入" type="password"
                                clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="年级班级">
                            <el-input v-model="state.ruleForm.class" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="时间">
                            <el-date-picker v-model="state.ruleForm.overdueTime" type="date" placeholder="请选择"
                                class="w100">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                        <el-form-item label="用户状态">
                            <el-switch v-model="state.ruleForm.status" inline-prompt active-text="启"
                                inactive-text="离"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                        <el-form-item label="用户简历">
                            <el-input v-model="state.ruleForm.describe" type="textarea" placeholder="请输入简历"
                                maxlength="150"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="onCancel" size="default">取 消</el-button>
                    <el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref, defineEmits, defineExpose } from 'vue';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const userDialogFormRef = ref();
const state = reactive({
    ruleForm: {
        name: '', // 姓名
        course: '', // 任教学科
        phone: '', // 手机号
        email: '', // 邮箱
        parent:'',
        password: '', // 账户密码
        overdueTime: '', // 时间
        status: true, // 用户状态
        class: '', // 任教班级
        describe: '', // 用户简历
    },
    dialog: {
        isShowDialog: false,
        type: '',
        title: '',
        submitTxt: '',
    },
});

// 打开弹窗
const openDialog = (type, row) => {
    if (type === 'edit') {
        state.ruleForm = row;
        state.dialog.title = '修改学生信息';
        state.dialog.submitTxt = '修 改';
    } else {
        state.dialog.title = '新增学生用户';
        state.dialog.submitTxt = '新 增';
        // 清空表单，此项需加表单验证才能使用
        // nextTick(() => {
        // 	userDialogFormRef.value.resetFields();
        // });
    }
    state.dialog.isShowDialog = true;
};
// 关闭弹窗
const closeDialog = () => {
    state.dialog.isShowDialog = false;
};
const onCancel = () => {
    closeDialog();
};
const onSubmit = () => {
    closeDialog();
    emit('refresh');
    // if (state.dialog.type === 'add') { }
};

defineExpose({
    openDialog,
});
</script>
