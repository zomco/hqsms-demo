<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报警器</el-breadcrumb-item>

      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入设备id"
                    v-model="id"
                    clearable
                    @clear="getAlarmList">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="queryAlarmById"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 报警器列表区 -->
      <el-table :data="AlarmList"
                border
                stripe>
        <el-table-column label="#"
                         type="index"></el-table-column>
        <el-table-column label="时间"
                         prop="createdAt"></el-table-column>
        <el-table-column label="id"
                         prop="id"></el-table-column>
        <el-table-column label="code"
                         prop="code"></el-table-column>
        <el-table-column label="ip"
                         prop="ip"></el-table-column>
        <el-table-column label="mac"
                         prop="mac"></el-table-column>
        <el-table-column label="model"
                         prop="model"></el-table-column>
        <el-table-column label="gateway"
                         prop="gateway"></el-table-column>
        <el-table-column label="name"
                         prop="name"></el-table-column>
        <el-table-column label="poleId"
                         prop="poleId"></el-table-column>
        <el-table-column label="productBatch"
                         prop="productBatch"></el-table-column>
        <el-table-column label="purchaseBatch"
                         prop="purchaseBatch"></el-table-column>
        <el-table-column label="supplier"
                         prop="supplier"></el-table-column>
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
      // 报警器id
      id: 0,
      AlarmList: [],
      total: 0,

    }
  },
  created () {
    this.getAlarmList()
  },
  methods: {
    // 获取报警器log列表
    async getAlarmList () {
      const res = await this.$http.get('alarms')
      if (res.status !== 200) {
        this.$message.error('数据请求失败')
      }
      console.log(res);
      this.$message.success('请求数据成功')
      this.AlarmList = res.data.content
      this.total = res.data.totalPages
    },
    // 通过id查报警器
    async queryAlarmById () {
      const res = await this.$http.get(`alarms/${this.id}`);
      if (res.status !== 200) {
        this.$message.error("查询失败");
      }
      console.log(res);
      this.AlarmList = [];
      this.AlarmList.push(res.data);
    },

    // 监听pagesize改变的时间
    handleSizeChange (newSize) {
      console.log(newSize);
      this.queryInfo.page = this.queryInfo.page - 1;
      this.queryInfo.size = newSize;
      this.getAlarmList();
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage);
      this.queryInfo.page = newPage - 1;
      this.getAlarmList();
    },
    // 监听添加报警器对话框关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields();
    },
    // 添加内容
    addCentent () {
      // 提交数据之前,先进行表单预校验
      this.$refs.addFormRef.validate(async valid => {
        console.log(valid);
        if (!valid) {
          this.$message.error("表单验证失败!");
        }
        const res = await this.$http.post("alarms", {
          params: this.addForm
        });
        if (res.status !== 200) {
          this.$message.error("报警器投递失败!");
        }
        // 关闭弹窗
        this.dialogVisible = false;
        this.$message.success("报警器投递成功!");
      });
    }
  },
}
</script>
<style lang="less" scoped>
</style>