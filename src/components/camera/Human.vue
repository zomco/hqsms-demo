<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>摄像头</el-breadcrumb-item>
      <el-breadcrumb-item>人脸照片</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 图片展示区 -->
      <el-row :gutter="5">
        <el-col :span="2"
                v-for="(item) in humanPicture"
                :key="item.id">
          <el-image :src="item.faceUrl"></el-image>
        </el-col>
      </el-row>
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
        size: 24
        // 排序
        // sort: "des",
      },
      total: 0,
      humanPicture: []
    }
  },
  created () {
    this.getHumanPicture()
  },
  methods: {
    // 获取信息列表
    async getHumanPicture () {
      const res = await this.$http.get('camera-humans')
      if (res !== 200) {
        this.$message.error('数据获取失败')
      }
      this.$message.success('数据查询成功')
      console.log(res);
      this.humanPicture = res.data.content
      this.total = res.data.totalPages

    },
    // 监听pagesize改变的时间
    handleSizeChange (newSize) {
      console.log(newSize);
      this.queryInfo.page = this.queryInfo.page - 1;
      this.queryInfo.size = newSize;
      this.getHumanPicture()

    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage);
      this.queryInfo.page = newPage - 1;
      this.getHumanPicture()

    },
  }
}
</script>
<style lang="less" scoped>
.el-image {
  width: 120px;
  height: 120px;
}
</style>