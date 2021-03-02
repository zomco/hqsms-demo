<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>广播</el-breadcrumb-item>

      <el-breadcrumb-item>计划管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入计划id"
                    v-model="id"
                    clearable
                    @clear="getplanList">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="queryPlanById"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
                     @click="dialogVisible = true">添加内容</el-button>
        </el-col>
      </el-row>

      <!-- 广播列表区 -->
      <el-table :data="planList"
                border
                stripe>
        <el-table-column label="#"
                         type="index"></el-table-column>
        <el-table-column label="时间"
                         prop="createdAt"></el-table-column>
        <el-table-column label="节目编号"
                         prop="id"></el-table-column>
        <el-table-column label="任务id"
                         prop="taskId"></el-table-column>
        <el-table-column label="period"
                         prop="period"></el-table-column>
        <el-table-column label="名称"
                         prop="planName"></el-table-column>
        <el-table-column label="状态"
                         prop="played">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.played"
                       @change="putContent(scope.row.id,scope.row.played)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="重复次数"
                         prop="repeatTime"></el-table-column>
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
                         @click="deleteContent(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页显示区 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :page-sizes="[1, 2, 5, 10]"
                     :page-size="queryInfo.size"
                     layout="total,sizes,prev,pager,jumper"
                     :total="total + 1">
      </el-pagination>

      <!-- 添加内容对话框 -->
      <el-dialog title="添加节目"
                 :visible.sync="dialogVisible"
                 width="30%"
                 @close="addDialogClosed">
        <!-- 内容主体区 -->
        <el-form ref="addFormRef"
                 :model="addForm"
                 :rules="addFormRules"
                 label-width="80px">
          <el-form-item label="设备id"
                        prop="broadcastId">
            <el-input v-model="addForm.broadcastId"></el-input>
          </el-form-item>
          <el-form-item label="内容类型"
                        prop="type">
            <el-select v-model="addForm.type"
                       placeholder="图片/音频">
              <el-option label="图片"
                         value="picture"></el-option>
              <el-option label="音频"
                         value="video"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传文件"
                        prop="file">
            <el-upload accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.GIF,.BMP,.mp3"
                       drag
                       action=""
                       multiple
                       :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">点击上传文件</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="addCentent">确 定</el-button>
        </span>
      </el-dialog>
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
      // 节目id
      id: 0,
      planList: [],
      total: 0,
      // 弹窗是否可见
      dialogVisible: false,
      // 添加节目表单的数据
      addForm: {
        broadcastId: 0,
        type: ""
      },
      // 添加节目表单的验证规则
      addFormRules: {
        broadcastId: [
          { required: true, message: "请输入设备id", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择内容类型", trigger: "blur" }],
        file: [{ required: true, message: "请上传图片/音频", trigger: "blur" }]
      }
    };
  },
  created () {
    this.getplanList();
  },
  methods: {
    // 获取内容列表
    async getplanList () {
      const res = await this.$http.get("broadcast-plans", {
        params: this.queryInfo
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("请求数据失败！");
      }
      this.$message.success("获取数据成功！");
      this.planList = res.data.content;
      this.total = res.data.totalPages;
    },

    // 通过id查节目
    async queryPlanById () {
      const res = await this.$http.get(`broadcast-plans/${this.id}`);
      if (res.status !== 200) {
        this.$message.error("查询失败");
      }
      console.log(res);
      this.planList = [];
      this.planList.push(res.data);
    },

    // 删除内容
    async deleteContent (data) {
      const confirmResult = await this.$confirm('此操作将永久删除该广播内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(error => error)
      console.log(confirmResult);
      if (confirmResult === 'cancel') {
        this.$message.info('取消了删除')
      } else if (confirmResult === 'confirm') {
        const res = await this.$http.delete(`broadcast-plans/${data.id}`)
        console.log(res);
        if (res.status !== 200) {
          return
        }
        this.$message.success("删除成功")
        this.getplanList()
      }
    },

    // 控制广播内容
    async putContent (id, played) {
      console.log(played);
      if (!played) {
        const res = await this.$http.post(`broadcast-plans/${id}/status`, {
          params: { command: 'frozen' }
        })
        if (res.status !== 200) {
          this.$message.error('请求失败')
        }
        this.$message.success('冻结成功')
      } else {
        const res = await this.$http.post(`broadcast-plans/${id}/status`, {
          params: { command: 'stop' }
        })
        if (res.status !== 200) {
          this.$message.error('请求失败')
        }
        this.$message.success('运行成功')
      }

    },

    // 监听pagesize改变的时间
    handleSizeChange (newSize) {
      console.log(newSize);
      this.queryInfo.page = this.queryInfo.page - 1;
      this.queryInfo.size = newSize;
      this.getplanList();
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage);
      this.queryInfo.page = newPage - 1;
      this.getplanList();
    },
    // 监听添加广播对话框关闭事件
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
        const res = await this.$http.post("broadcast-plans", {
          params: this.addForm
        });
        if (res.status !== 200) {
          this.$message.error("节目投递失败!");
        }
        // 关闭弹窗
        this.dialogVisible = false;
        this.$message.success("节目投递成功!");
      });
    }
  }
}
</script>
<style lang="less" scoped>
</style>