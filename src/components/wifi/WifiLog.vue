<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>无线网络</el-breadcrumb-item>

      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入无线网络id"
                    v-model="id"
                    clearable
                    @clear="getWifiLogList">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="queryWifiLogById"></el-button>
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

      <!-- 无线网络列表区 -->
      <el-table :data="WifiLogList"
                border
                stripe>
        <el-table-column label="#"
                         type="index"></el-table-column>
        <el-table-column label="时间"
                         prop="createdAt"></el-table-column>
        <el-table-column label="id"
                         prop="id"></el-table-column>
        <el-table-column label="经度"
                         prop="latitude"></el-table-column>
        <el-table-column label="维度"
                         prop="longitude"></el-table-column>
        <el-table-column label="dm"
                         prop="dm"></el-table-column>
        <el-table-column label="dn"
                         prop="dn"></el-table-column>
        <el-table-column label="pa"
                         prop="pa"></el-table-column>
        <el-table-column label="rc"
                         prop="rc"></el-table-column>
        <el-table-column label="sm"
                         prop="sm"></el-table-column>
        <el-table-column label="sn"
                         prop="sn"></el-table-column>
        <el-table-column label="sr"
                         prop="sr"></el-table-column>
        <el-table-column label="sx"
                         prop="sx"></el-table-column>
        <el-table-column label="ta"
                         prop="ta"></el-table-column>
        <el-table-column label="ua"
                         prop="ua"></el-table-column>
        <el-table-column label="uv"
                         prop="uv"></el-table-column>
      </el-table>

      <!-- 分页显示区 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :page-sizes="[1, 2, 5, 10]"
                     :page-size="queryInfo.size"
                     layout="total,sizes,prev,pager,jumper"
                     :total="total + 1">
      </el-pagination>
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
      // 无线网络id
      id: 0,
      WifiLogList: [],
      total: 0,
      // 添加设备对话框可见
      addEquipmentDialogVisible: false,
      // 对话框表单
      addForm: {
        brightness: 0
      },
      // 对话框表单验证规则
      addFormRules: {},

    }
  },
  created () {
    this.getWifiLogList()
  },
  methods: {
    // 获取无线网络log列表
    async getWifiLogList () {
      const res = await this.$http.get('wifi-logs')
      if (res.status !== 200) {
        this.$message.error('数据请求失败')
      }
      this.$message.success('请求数据成功')
      this.WifiLogList = res.data.content
      this.total = res.data.totalPages
    },
    // 通过id查无线网络
    async queryWifiLogById () {
      const res = await this.$http.get(`wifi-logs/${this.id}`);
      if (res.status !== 200) {
        this.$message.error("查询失败");
      }
      console.log(res);
      this.WifiLogList = [];
      this.WifiLogList.push(res.data);
    },

    // 监听pagesize改变的时间
    handleSizeChange (newSize) {
      console.log(newSize);
      this.queryInfo.page = this.queryInfo.page - 1;
      this.queryInfo.size = newSize;
      this.getWifiLogList();
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage);
      this.queryInfo.page = newPage - 1;
      this.getWifiLogList();
    },
    // 关闭对话框
    addEquipmentDialogClosed () {
      this.$refs.addFormRef.resetFields();
    },
  },
}
</script>
<style lang="less" scoped>
</style>