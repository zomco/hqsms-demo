<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>屏幕</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入节目id"
                    v-model="id"
                    clearable
                    @clear="getEquipmentList">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="queryEquipmentByplanId"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
                     @click="addEquipmentDialogVisible = true">添加设备</el-button>
        </el-col>
      </el-row>

      <!-- 添加设备信息对话框 -->
      <el-dialog title="添加设备"
                 :visible.sync="addEquipmentDialogVisible"
                 width="30%"
                 @close="addEquipmentDialogClosed">
        <!-- 内容主体区 -->
        <el-form ref="addFormRef"
                 :model="addForm"
                 :rules="addFormRules"
                 label-width="80px">
          <el-form-item label="亮度"
                        prop="brightness">
            <el-input v-model="addForm.brightness"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 设备信息列表区 -->
      <el-table :data="equipmentList"
                border
                stripe>
        <el-table-column label="id"
                         prop="id"></el-table-column>
        <el-table-column label="createdAt"
                         prop="createdAt"></el-table-column>
        <el-table-column label="brightness"
                         prop="brightness"></el-table-column>
        <el-table-column label="colorTemperature"
                         prop="colorTemperature"></el-table-column>
        <el-table-column label="code"
                         prop="code"></el-table-column>
        <el-table-column label="gateway"
                         prop="gateway"></el-table-column>
        <el-table-column label="ip"
                         prop="ip"></el-table-column>
        <el-table-column label="mac"
                         prop="mac"></el-table-column>
        <el-table-column label="model"
                         prop="model"></el-table-column>
        <el-table-column label="name"
                         prop="name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isOn === 'YES' ? true : false"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark"
                        content="切换节目"
                        placement="top-start"
                        :enterable="false">
              <el-button type="warning"
                         size="mini"
                         icon="el-icon-setting"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark"
                        content="删除"
                        placement="top-start"
                        :enterable="false">
              <el-button type="danger"
                         size="mini"
                         icon="el-icon-delete"
                         @click="deleteHandle(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 获取内容列表的参数对象
      queryInfo: {
        // 当前页数
        page: 0,
        // 每页多少条
        size: 2
        // 排序
        // sort: "des",
      },
      // 设备信息列表
      equipmentList: [],
      // 设备id
      id: 0,
      // 添加设备对话框可见
      addEquipmentDialogVisible: false,
      // 对话框表单
      addForm: {
        brightness: 0
      },
      // 对话框表单验证规则
      addFormRules: {}
    };
  },
  created () {
    this.getEquipmentList();
  },
  methods: {
    // 设备列表数据请求
    async getEquipmentList () {
      const res = await this.$http.get("screens", {
        params: this.queryInfo
      });
      if (res.status !== 200) {
        this.$message.error("数据请求失败!");
      }
      this.$message.success("数据请求成功!");
      console.log(res);
      this.equipmentList = res.data.content;
    },
    // 通过id查询设备事件
    async queryEquipmentByplanId () {
      const res = await this.$http.get(`screens/${this.id}`);
      if (res !== 200) {
        this.$message.error("请求失败");
      }
      console.log(res);
      this.getEquipmentList = res.data.content;
      this.getEquipmentList();
    },
    // 关闭对话框
    addEquipmentDialogClosed () {
      this.$refs.addFormRef.resetFields();
    },
    // 删除事件
    async deleteHandle (id) {
      this.id = id
      const res = await this.$http.delete(`screens/${this.id}`)
      this.$message.success("删除成功!")
      this.getEquipmentList()
    }
  }
};
</script>
<style lang="less" scoped>
</style>