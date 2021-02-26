<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>广播</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索与添加区域 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入设备code"
                  v-model="code"
                  clearable
                  @clear="getEquList">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="queryContentByCode"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary"
                   @click="dialogVisible = true">添加内容</el-button>
      </el-col>
    </el-row>

    <!-- 设备列表区 -->
    <el-table :data="equiList"
              border
              stripe>
      <el-table-column label="#"
                       type="index"></el-table-column>
      <el-table-column label="时间"
                       prop="createdAt"></el-table-column>
      <el-table-column label="code"
                       prop="code"></el-table-column>
      <el-table-column label="gateway"
                       prop="gateway"></el-table-column>
      <el-table-column label="name"
                       prop="name"></el-table-column>
      <el-table-column label="model"
                       prop="model"></el-table-column>
      <el-table-column label="supplier"
                       prop="supplier"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isOn"></el-switch>
        </template>
      </el-table-column>
    </el-table>
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
      // 设备数据
      equiList: [],
      // 设备code
      code: 0
    }
  },
  created () {
    this.getEquList()
  },
  methods: {
    // 获取列表数据
    async getEquList () {
      const res = await this.$http.get('/broadcasts', {
        params: this.queryInfo
      })
      if (res.status !== 200) {
        this.$message.error("请求数据失败")
      }
      this.$message.success("请求数据成功")
      this.equiList = res.data.content
    },
    async queryContentByCode () {
      const res = await this.$http.get('broadcasts/search/findById', {
        params: { code: this.code }
      })
      console.log(res);
    }
  }
}
</script>
<style lang="less" scoped>
</style>