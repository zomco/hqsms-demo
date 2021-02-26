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
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入节目id"
            v-model="planId"
            clearable
            @clear="getTaskList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="queryTaskByplanId"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addTaskDialog">添加计划</el-button>
        </el-col>
      </el-row>

      <!-- 添加内容对话框 -->
      <el-dialog
        title="添加节目"
        :visible.sync="dialogVisible"
        width="30%"
        @close="addDialogClosed"
      >
        <!-- 内容主体区 -->
        <el-form
          ref="addFormRef"
          :model="addForm"
          :rules="addFormRules"
          label-width="80px"
        >
          <el-form-item label="计划名称" prop="planName">
            <el-input v-model="addForm.planName"></el-input>
          </el-form-item>
          <el-form-item>
            <template>
              <el-select v-model="addForm.contentId" placeholder="请选择节目id">
                <el-option
                  v-for="item in contentId"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 用户列表区 -->
      <el-table :data="taskList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="时间" prop="createdAt"></el-table-column>
        <el-table-column label="节目编号" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="状态" prop="played">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.played"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="切换节目"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-setting"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="删除"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 获取内容列表的参数对象
      queryInfo: {
        // 当前页数
        page: 1,
        // 每页多少条
        size: 2
        // 排序
        // sort: "des",
      },
      // 计划列表
      taskList: [],
      // 计划id
      planId: 0,
      // 添加计划对话框可见设置
      dialogVisible: false,
      addForm: {
        planName: "",
        contentId: 0,
        endDate: "",
        screenId: 0,
        cronExpr: ""
      },
      addFormRules: {},
      // 节目id
      contentId: [{ value: 1, label: 1 }]
    };
  },
  created() {
    this.getTaskList();
  },
  methods: {
    // 获取计划列表
    async getTaskList() {
      const res = await this.$http.get("screen-plans", {
        params: this.queryInfo
      });
      if (res.status !== 200) {
        this.$message.error("请求数据失败！");
      }
      console.log(res);
      this.$message.success("数据获取成功");
      // this.taskList = res.data;
    },
    // 通过planId查询
    async queryTaskByplanId() {
      const res = await this.$http.get(`screen-plans/${this.planId}`);
      if (res.status !== 200) {
        this.$message.error("查询失败!");
      }
      this.$message.success("查询成功");
      this.getTaskList();
    },
    addTaskDialog() {
      this.dialogVisible = true;
    },
    // 关闭添加计划对话框
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    }
  }
};
</script>