<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>气象</el-breadcrumb-item>

      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入计划id"
                    v-model="id"
                    clearable
                    @clear="getWeatherLogList">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="queryWeatherLogById"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 气象列表区 -->
      <el-table :data="WeatherLogList"
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
      // 气象id
      id: 0,
      WeatherLogList: [],
      total: 0,

    }
  },
  created () {
    this.getWeatherLogList()
  },
  methods: {
    // 获取气象log列表
    async getWeatherLogList () {
      const res = await this.$http.get('weather-logs')
      if (res.status !== 200) {
        this.$message.error('数据请求失败')
      }
      this.$message.success('请求数据成功')
      this.WeatherLogList = res.data.content
      this.total = res.data.totalPages
    },
    // 通过id查气象
    async queryWeatherLogById () {
      const res = await this.$http.get(`weathers/${this.id}/logs`);
      if (res.status !== 200) {
        this.$message.error("查询失败");
      }
      console.log(res);
      this.WeatherLogList = [];
      this.WeatherLogList.push(res.data);
    },

    // 监听pagesize改变的时间
    handleSizeChange (newSize) {
      console.log(newSize);
      this.queryInfo.page = this.queryInfo.page - 1;
      this.queryInfo.size = newSize;
      this.getWeatherLogList();
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage);
      this.queryInfo.page = newPage - 1;
      this.getWeatherLogList();
    },
  },
}
</script>
<style lang="less" scoped>
</style>