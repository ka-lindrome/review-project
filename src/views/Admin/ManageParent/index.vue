<template>
    <div class="main-box" style="background-color: rgb(240,241,243); position: relative;">
        <el-card class="layout-padding-auto">
            <div class="system-user-search mb15">
                <el-input v-model="state.searchKeyword" size="default" placeholder="请输入用户名称" style="max-width: 180px"
                   ></el-input>
                <el-button size="default" type="primary" class="ml10" @click="handleSearch">
                    <el-icon style="margin-right: 5px;">
                        <Search />
                    </el-icon>
                    查询
                </el-button>
                <el-button size="default" type="success" class="ml10" @click="onOpenAddUser('add')">
                    <el-icon style="margin-right: 5px;">
                        <FolderAdd />
                    </el-icon>
                    新增用户
                </el-button>
            </div>
            <el-table :data="state.tableData.data" v-loading="state.tableData.loading"
                style="width: 100%; height: 760px;" :row-style="rowStyle">
                <el-table-column type="index" label="序号" width="70" />
                <el-table-column prop="name" label="学生姓名" width="130"></el-table-column>
                <el-table-column prop="course" label="学号" width="180"></el-table-column>
                <el-table-column prop="class" label="班级" width="110"></el-table-column>
                <el-table-column prop="parent" label="家长姓名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="phone" label="家长姓名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
                <el-table-column prop="password" label="账号密码" show-overflow-tooltip></el-table-column>
                <el-table-column prop="status" label="用户状态" width="140"
                    :filters="[{ text: '在线', value: 1 }, { text: '离线', value: 0 }]" :filter-method="filterStatus">
                    <template #default="scope">
                        <el-tag type="success" v-if="scope.row.status">在线</el-tag>
                        <el-tag type="info" v-else>离线</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip sortable></el-table-column>
                <el-table-column label="操作" width="150">
                    <template #default="scope">
                        <el-button :disabled="scope.row.name === 'admin'" size="small" text type="primary"
                            @click="onOpenEditUser('edit', scope.row)" style="margin-left: -12px;">修改</el-button>
                        <el-button :disabled="scope.row.name === 'admin'" size="small" text type="primary"
                            @click="onRowDel(scope.row)" style="margin-left: -7px;">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
                :pager-count="5" :page-sizes="[15, 30, 45]" v-model:current-page="state.tableData.param.pageNum"
                background v-model:page-size="state.tableData.param.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="state.tableData.total"
                style="position: absolute; bottom: 50px; left: 45px;">
            </el-pagination>
        </el-card>
        <UserDialog ref="userDialogRef" @refresh="getTableData()" />
    </div>
</template>

<script setup>
import { reactive, onMounted, ref, defineAsyncComponent } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import API from '@/utils/axiosInference';

const UserDialog = defineAsyncComponent(() => import('./dialog.vue'));

const rowStyle = (row) => {
    return {
        height: '65px'
    };
};
const apiData = ref(null);

const userDialogRef = ref();
const state = reactive({
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 15,
        },
    },
    searchKeyword: ''
});
const token = ref('');

const getTableData = () => {
    state.tableData.loading = true;
    // 根据搜索关键词过滤数据
    const filteredData = apiData.value.filter(item => {
        return state.searchKeyword ? item.name.includes(state.searchKeyword) : true;
    });
    // 获取分页数据
    const start = (state.tableData.param.pageNum - 1) * state.tableData.param.pageSize;
    const end = start + state.tableData.param.pageSize;
    const paginatedData = filteredData.slice(start, end);

    const data = [];
    for (let i = 0; i < paginatedData.length; i++) {
        const item = paginatedData[i];
        const randomNumber = Math.floor(Math.random() * 10);
        const status = randomNumber < 4 ? 1 : 0;
        const timeString = item.time;
        const date = new Date(timeString);
        const formattedDateTime = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        data.push({
            name: item.name,
            course: item.studentID,
            phone: item.phone,
            email: item.email,
            password: item.password,
            parent: item.parent,
            status: status,
            class: item.grade+" "+item.class + "班",
            createTime: formattedDateTime,
        });
    }
    state.tableData.data = data;
    state.tableData.total = filteredData.length; // 使用过滤后的数据总数
    setTimeout(() => {
        state.tableData.loading = false;
    }, 500);
};


const onOpenAddUser = (type) => {
    userDialogRef.value.openDialog(type);
};

const onOpenEditUser = (type, row) => {
    userDialogRef.value.openDialog(type, row);
};

const filterStatus = (value, row) => {
    return row.status === value;
};

const handleSearch = () => {
  getTableData();
};

const onRowDel = (row) => {
    ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.name}”，是否继续?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            const index = apiData.value.findIndex(item => item.name === row.name);
            if (index !== -1) {
                apiData.value.splice(index, 1);
                getTableData();
                ElMessage.success('删除成功');
            }
        })
        .catch(() => { });
};

const onHandleSizeChange = (val) => {
    state.tableData.param.pageSize = val;
    getTableData();
};

const onHandleCurrentChange = (val) => {
    state.tableData.param.pageNum = val;
    getTableData();
};

onMounted(() => {
    token.value = sessionStorage.getItem('Token');
    console.log(token.value);
    API({
        methods: 'get',
        url: '/admin/p/data',
        headers: {
            token: token.value
        }
    }).then(res => {
        apiData.value = res.data.data;
        console.log(apiData.value);
        getTableData();
    }).catch(err => {
        console.log(err);
    });
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
