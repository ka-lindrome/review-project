import {createRouter, createWebHashHistory} from "vue-router"

import Index from '../components/Index'
import VisualAnalysisP from "@/views/Parent/VisualAnalysisP/VisualAnalysisP";
import VisualAnalysisT from "@/views/Teacher/VisualAnalysisT/analysis";
import Home from '@/views/Home'
import Login from '@/views/Login/Login.vue'
import UploadPapers from '@/views/Teacher/UploadPapers'
import CorrctPapers from '@/views/Teacher/CorrectPapers'
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
        name: '',
        component: Index,
        meta: {title: ''},
        children: [
            {
                path: '/Home/index',
                name: '首页',
                children: [
                    {
                        path: '/Home',
                        name: '首页',
                        component: Home
                    }
                ]
            }, {
                path: '/data',
                name: '数据可视化',
                children: [
                    {
                        path: '/VisualAnalysisP',
                        name: '数据可视化',
                        component: VisualAnalysisP
                    }
                ]
            }, {

                path: '/data',
                name: '数据可视化',
                children: [
                    {
                        path: '/VisualAnalysisT',
                        name: '数据可视化',
                        component: VisualAnalysisT
                    }
                ]
            }, {
                path: '/file',
                name: '智能阅卷',
                children: [
                    {
                        path: '/UploadPapers',
                        name: '试卷上传',
                        component: UploadPapers

                    }, {

                        path: '/CorrectPapers',
                        name: '试卷批阅',
                        component: CorrctPapers

                    }
                ]
            }, {
                path: '/Person',
                name: '个人页',
                children: [
                    {
                        path: '/PersonCenter',
                        name: '个人中心',
                        component: PersonCenter
                    }, {
                        path: '/PersonSetting',
                        name: '个人设置',
                        component: PersonSetting
                    }
                ]

            }, {
                path: '/manage',
                name: '/人员管理',
                children: [{
                    path: '/ManageTeacher',
                    name: '教职工人员',
                    component: ManageTeacher
                }, {
                    path: '/ManageParent',
                    name: '用户人员',
                    component: ManageParent
                }]
            }, {
                path: '/test',
                name: '题库',
                children: [{
                    path: '/TestDataBaseP',
                    name: '题库',
                    component: TestDataBaseP
                }]
            }, {
                path: '/test',
                name: '题库',
                children: [{
                    path: '/TestDataBaseT',
                    name: '题库',
                    component: TestDataBaseT
                }]
            }, {
                path: '/robot',
                name: '智能机器人',
                children: [{
                    path: '/AIRobot',
                    name: '智能机器人',
                    component: AIRobot
                }]
            }
        ]
    },

]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router

