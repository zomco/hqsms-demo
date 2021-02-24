<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>屏幕</el-breadcrumb-item>
        <el-breadcrumb-item>计划管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <el-button type="primary">添加计划<el-button>
        </el-card>

        <!-- 计划列表区域 -->
        <el-table :data="taskList">
            
        <el-table>


    </div>
</template>
<script>
export default {
    data(){
        return{
            // 获取内容列表的参数对象
            queryInfo: {
                // 当前页数
                page: 0,
                // 每页多少条
                size: 2,
                // 排序
                // sort: "des",
            },
            // 计划列表
            taskList:[]
        }
    },
    created:{},
    menthods:{

    }
}
</script>