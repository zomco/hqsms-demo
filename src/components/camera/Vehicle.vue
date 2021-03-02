<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>摄像头</el-breadcrumb-item>
      <el-breadcrumb-item>车牌图片</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入设备id"
                    v-model="id"
                    clearable
                    @clear="getvehiclePicture">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="queryVehicleById"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 图片展示区 -->
      <el-row :gutter="5">
        <el-col :span="2"
                v-for="(item) in vehiclePicture"
                :key="item.id">
          <el-image :src="item.imageUrl"></el-image>
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
      vehiclePicture: [],
      id: 0
    }
  },
  created () {
    this.getvehiclePicture()
  },
  methods: {
    // 获取信息列表
    async getvehiclePicture () {
      const res = await this.$http.get('camera-vehicles')
      if (res !== 200) {
        this.$message.error('数据获取失败')
      }
      this.$message.success('数据查询成功')
      console.log(res);
      this.vehiclePicture = res.data.content
      this.total = res.data.totalPages

    },
    // 监听pagesize改变的时间
    handleSizeChange (newSize) {
      console.log(newSize);
      this.queryInfo.page = this.queryInfo.page - 1;
      this.queryInfo.size = newSize;
      this.getvehiclePicture()

    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage);
      this.queryInfo.page = newPage - 1;
      this.getvehiclePicture()

    },
    async queryVehicleById () {
      const res = await this.$http.get(`camera-vehicles/${this.id}`);
      if (res.status !== 200) {
        this.$message.error("查询失败");
      }
      console.log(res);
      this.vehiclePicture = [];
      this.vehiclePicture.push(res.data);
    }
  }
}
</script>
<style lang="less" scoped>
.el-image {
  margin-top: 10px;
  width: 120px;
  height: 120px;
}
</style>