<template>
  <div>
    <hot-table
      ref="hotTableComponent"
      v-if="!switchValue"
      :data="tableData"
      v-loading="isLoading"
      :settings="settings"
    >
      <hot-column title="订单编号" data="pu027" read-only="true"> </hot-column>
      <hot-column title="行号" data="pu028" read-only="true"> </hot-column>
      <hot-column title="采购日期" data="pu009" read-only="true"> </hot-column>
      <hot-column title="物料名称" data="pu011" read-only="true"> </hot-column>
      <hot-column title="采购数量" data="pu036" read-only="true"> </hot-column>
      <hot-column title="到货数量" data="bdc006" read-only="true"> </hot-column>
      <hot-column title="采购金额" data="pu037" read-only="true"> </hot-column>
      <hot-column title="含税单价" data="pu040" read-only="true"> </hot-column>
      <hot-column title="计划到货日期" data="pu039" read-only="true">
      </hot-column>
      <hot-column
        title="交期回复时间"
        data="pu089"
        type="date"
        dateFormat="YYYY-MM-DD"
      >
      </hot-column>
      <hot-column title="交期回复说明" data="pu087"> </hot-column>
      <hot-column
        title="第二次交期回复时间"
        data="pu090"
        type="date"
        dateFormat="YYYY-MM-DD"
      >
      </hot-column>
      <hot-column title="第二次交期回复说明" data="pu088"> </hot-column>
    </hot-table>
    <div style="margin-top: 10px;display: flex; justify-content: flex-start;">
      <el-button
        type="warning"
        round
        size="mini"
        v-if="!switchValue"
        @click="onSubmit"
        :loading="isLoading"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // excel表格
        settings: {
          height: 'auto',
          strectchH: 'all',
          // 没有底部脚本
          licenseKey: 'non-commercial-and-evaluation',
        },
      }
    },
  }
</script>

<style scoped lang="scss"></style>
