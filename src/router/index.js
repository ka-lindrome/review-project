import {createRouter, createWebHashHistory} from "vue-router"

import Index from '../components/Index'
import VisualAnalysisP from "@/views/Parent/VisualAnalysisP";
import VisualAnalysisT from "@/views/Teacher/VisualAnalysisT";
import Home from '@/views/Home'
import Login from '@/views/Login/Login.vue'
import UploadPapers from '@/views/Teacher/UploadPapers'
import PersonCenter from '@/views/common/Person/PersonCenter'
import PersonSetting from '@/views/common/Person/PersonSetting'
import ManageTeacher from '@/views/Admin/ManageTeacher'
import ManageParent from '@/views/Admin/ManageParent'
import TestDataBaseP from '@/views/common/Test/TestDataBaseP'
import TestDataBaseT from '@/views/common/Test/TestDataBaseT'

import AIRobot from '@/views/common/AI/AIRobot'

const routes = [
    {
        path: '/',
        name: '登录',
        component: Login
    },
    {
        path: '/Index',
        name: 'index',
        component: Index,
        children: [
            {
                path: '/Home',
                name: '首页',
                component: Home
            }, {
                path: '/VisualAnalysisP',
                name: '数据可视化P',
                component: VisualAnalysisP
            }, {
                path: '/VisualAnalysisT',
                name: '数据可视化T',
                component: VisualAnalysisT
            }, {
                path: '/UploadPapers',
                name: '文件上传',
                component: UploadPapers
            }, {
                path: '/PersonCenter',
                name: '个人中心',
                component: PersonCenter
            }, {
                path: '/PersonSetting',
                name: '个人设置',
                component: PersonSetting
            }, {
                path: '/ManageTeacher',
                name: '教职工人员',
                component: ManageTeacher
            }, {
                path: '/ManageParent',
                name: '用户人员',
                component: ManageParent
            }, {
                path: '/TestDataBaseP',
                name: '题库P',
                component: TestDataBaseP
            }, {
                path: '/TestDataBaseT',
                name: '题库T',
                component: TestDataBaseT
            }, {
                path: '/AIRobot',
                name: '智能机器人',
                component: AIRobot
            }
        ]
    },

]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
