<!-- 消息列表 -->
<template>
  <div>
    <div class="title">我的消息</div>
    <div class="list">
      <div class="item-title">您下载过的图纸有更新，点击查看前往</div>
      <div>
        <el-button size="mini" @click="toDrawingDown">查看</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router'
  export default {
    methods: {
      // 路由跳转
      navigatoUrl(url) {
        this.$router.push(url)
      },

      // 跳往图纸下载页
      toDrawingDown() {
        let url = ''
        let route = this.$router.options.routes.find((route) =>
          route.path.includes('/drawing-download')
        )
        url = route.children[0].path
        this.$router.push(url)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .title {
    font-weight: 600;
  }
  .list {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 5px;

    .item-title {
      font-size: 14px;
      line-height: 100%;
      color: #808080;
    }
  }
</style>
