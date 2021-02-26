<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>设备后台管理系统</span>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '250px'">
        <div class="toggle-button"
             @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#313743"
                 text-color="#fff"
                 active-text-color="#409eff"
                 unique-opened
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 :router="true"
                 :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>屏幕</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/screen/content"
                          @click="saveNavState('/screen/content')">内容管理</el-menu-item>
            <el-menu-item index="/screen/task"
                          @click="saveNavState('/screen/task')">计划管理</el-menu-item>
            <el-menu-item index="/screen"
                          @click="saveNavState('/screen')">设备管理</el-menu-item>
          </el-submenu>

          <!-- 一级菜单 -->
          <el-submenu index="2">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>广播</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/broadcasts"
                          @click="saveNavState('/broadcasts')">设备管理</el-menu-item>
          </el-submenu>

          <!-- 一级菜单 -->
          <el-submenu index="3">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>报警器</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="3-1">选项1</el-menu-item>
          </el-submenu>

          <!-- 一级菜单 -->
          <el-submenu index="4">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>摄像头</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="4-1">选项1</el-menu-item>
          </el-submenu>

          <!-- 一级菜单 -->
          <el-submenu index="5">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>无线网络</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="5-1">选项1</el-menu-item>
          </el-submenu>

          <!-- 一级菜单 -->
          <el-submenu index="6">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>气象传感器</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="6-1">选项1</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      isCollapse: false,
      activePath: ""
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState (activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created () {
      this.activePath = window.sessionStorage.getItem("activePath");
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted () { }
  }
};
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #363d40;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e9edf1;
  font-size: 20px;
}
.el-aside {
  background-color: #313743;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #e9edf1;
}
.toggle-button {
  background-color: #485064;
  font-size: 14px;
  color: #fff;
  line-height: 25px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>