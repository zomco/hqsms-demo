<template>
  <el-container>
    <!-- 头部区域 -->
  <el-header>Header</el-header>
  <!-- 页面主体区域 -->
  <el-container>
      <!-- 侧边栏区域 -->
    <el-aside width="200px">Aside</el-aside>
    <!-- 右侧内容区域 -->
    <el-main>Main</el-main>
  </el-container>
  </el-container>
</template>

<script>

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {}
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
}
</script>
<style  scoped>
</style>
