import {createRouter, createWebHashHistory} from "vue-router"

import Index from '../components/Index'
import VisualAnalysisP from "@/views/Parent/VisualAnalysisP";
import Home from '@/views/Home'
import Login from '@/views/Login'
import UploadPapers from '@/views/Teacher/UploadPapers'
import PersonCenter from '@/views/common/PersonCenter'
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
                name: '数据可视化',
                component: VisualAnalysisP
            },{
            path:'/UploadPapers',
                name:'文件上传',
                component: UploadPapers
            },{
                path:'/PersonCenter',
                name:'个人中心',
                component: PersonCenter
            }
        ]
    },

]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
