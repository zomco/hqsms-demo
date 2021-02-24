<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>屏幕</el-breadcrumb-item>

      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入节目id"
            v-model="id"
            clearable
            @clear="getContentList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="queryContentById"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true"
            >添加内容</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table :data="contentList" border stripe>
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

      <!-- 分页显示区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.size"
        layout="total,sizes,prev,pager,jumper"
        :total="total + 1"
      >
      </el-pagination>

      <!-- 添加内容对话框 -->
      <el-dialog title="添加节目" :visible.sync="dialogVisible" width="30%">
        <!-- 内容主体区 -->
        <el-form
          ref="addFormRef"
          :model="addForm"
          :rules="addFormRules"
          label-width="80px"
        >
          <el-form-item label="设备id" prop="screenId">
            <el-input v-model="addForm.screenId"></el-input>
          </el-form-item>
          <el-form-item label="内容类型" prop="type">
            <el-select v-model="addForm.type" placeholder="图片/音频">
              <el-option label="图片" value="picture"></el-option>
              <el-option label="音频" value="video"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">点击上传文件</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
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
        page: 0,
        // 每页多少条
        size: 2,
        // 排序
        // sort: "des",
      },
      // 节目id
      id: 0,
      contentList: [],
      total: 0,
      // 弹窗是否可见
      dialogVisible: false,
      // 添加节目表单的数据
      addForm: {
        screenId: 0,
        type: "",
      },
      // 添加节目表单的验证规则
      addFormRules: {
        screenId: [
          { required: true, message: "请输入设备id", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择内容类型", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getContentList();
  },
  methods: {
    // 获取内容列表
    async getContentList() {
      const { data: res } = await this.$http.get("screen-contents", {
        params: this.queryInfo,
      });
      console.log(res);
      //    if (res.status!==200) {
      //        return this.$message.error("请求数据失败！")
      //    }
      this.$message.success("获取数据成功！");
      this.contentList = res.content;
      this.total = res.totalPages;
    },

    // 通过id查节目
    async queryContentById() {
      const { data: res } = await this.$http.get(`screen-contents/${this.id}`);
      // if (res.success !== true) {
      //   this.$message.error("查询失败");
      // }
      console.log(res);
      this.contentList = [];
      this.contentList.push(res);
    },

    // 监听pagesize改变的时间
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.page = this.queryInfo.page - 1;
      this.queryInfo.size = newSize;
      this.getContentList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.page = newPage - 1;
      this.getContentList();
    },
  },
};
</script>
<style lang="less" scoped>
</style>