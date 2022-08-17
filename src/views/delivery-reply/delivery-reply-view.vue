<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>采购单信息</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
  import { getPurchaseDetail } from '@/api/delivery-reply'
  export default {
    data() {
      return {
        data: {},
      }
    },
    mounted() {
      this.getData(this.$route.query.pu027, this.$route.query.pu028)
    },
    methods: {
      // 获取数据
      async getData(pu027, pu028) {
        const res = await getPurchaseDetail({
          pu027,
          pu028,
        })
        this.data = Object.assign({}, res.data)
      },
    },
  }
</script>

<style scoped lang="scss">
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }
</style>
