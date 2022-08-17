<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>交期回复</span>
      </div>
      <el-row>
        <el-col class="padd" :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
          采购单号：{{ data.pu027 }}
        </el-col>
        <el-col class="padd" :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
          行号：{{ data.pu028 }}
        </el-col>
      </el-row>
      <el-row>
        <el-col class="padd" :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
          物料编号：{{ data.pu009 }}
        </el-col>
        <el-col class="padd" :xl="20" :lg="18" :md="16" :sm="24" :xs="24">
          物料名称：{{ data.pu011 }}
        </el-col>
      </el-row>
      <el-row>
        <el-col class="padd" :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
          含税单价：{{ data.pu040 }}
        </el-col>
        <el-col class="padd" :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
          采购金额：{{ data.pu037 }}
        </el-col>
        <el-col class="padd" :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
          采购数量：{{ data.pu036 }}
        </el-col>
      </el-row>
      <el-row>
        <el-col class="padd"> 规格：{{ data.pu012 }} </el-col>
      </el-row>

      <el-divider content-position="left">回复</el-divider>
      <div>
        计划到货日期：
        <span style="padding-left: 10px;">{{ data.pu039 | dealTime }}</span>
      </div>
      <div v-if="data.pu089">
        <div class="padd">
          第一次回复时间:
          <span style="padding-left: 10px;">{{ data.pu089 }}</span>
        </div>
        <div class="padd" v-if="data.pu087">
          第一次回复说明:
          <span style="padding-left: 10px;  word-wrap:break-word;">{{
            data.pu087
          }}</span>
        </div>
      </div>

      <div v-if="data.pu090">
        <div class="padd">
          第二次回复时间:
          <span style="padding-left: 10px;">{{ data.pu089 }}</span>
        </div>
        <div class="padd" v-if="data.pu088">
          第二次回复说明:
          <span style="padding-left: 10px;  word-wrap:break-word;">{{
            data.pu087
          }}</span>
        </div>
      </div>

      <el-row v-if="!data.pu090">
        <el-col style="display: flex; align-items: center;" class="padd">
          回复时间
          <el-date-picker
            style="padding-left: 10px;"
            size="mini"
            v-model="time"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            :clearable="true"
            placeholder="选择日期"
            @change="onChange"
          >
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row v-if="!data.pu090">
        <el-col class="padd">
          回复说明
          <el-input
            size="mini"
            style="margin-top: 5px;"
            v-model="desc"
            type="textarea"
            :rows="2"
          ></el-input>
        </el-col>
      </el-row>

      <el-button
        v-if="!data.pu090"
        size="mini"
        round
        type="primary"
        :disabled="btnDisable"
        @click="onSubmit"
        >保存</el-button
      >
    </el-card>
  </div>
</template>

<script>
  import { getPurchaseDetail, confirmDelivery } from '@/api/delivery-reply'

  export default {
    data() {
      return {
        data: {},
        time: '',
        desc: '',
      }
    },
    mounted() {
      this.getData(this.$route.query.pu027, this.$route.query.pu028)
    },
    filters: {
      dealTime(value) {
        return value ? value.substring(0, 10) : ''
      },
    },
    computed: {
      btnDisable() {
        if (!this.time) {
          return true
        } else if (this.time > this.data.pu039 && !this.desc) {
          return true
        } else {
          return false
        }
      },
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

      // 时间选择器改变
      onChange(v) {
        // 如果选择时间大于计划到货时间，提示要填写回复说明
        if (v > this.data.pu039) {
          this.$message('回复时间大于计划到货时间，请填写回复说明')
        }
      },

      // 保存数据
      async onSubmit() {
        // 处理是回复那次的，如果存在第一次，则是当前是回复第二次的
        if (this.data.pu089) {
          this.data.pu090 = this.time
          this.data.pu088 = this.desc
        } else {
          this.data.pu089 = this.time
          this.data.pu087 = this.desc
        }
        await confirmDelivery(this.data)
        this.$message.success('回复成功')
        // 回到上一页
        this.$router.go(-1)
      },
    },
  }
</script>

<style scoped lang="scss">
  .padd {
    padding: 10px 0;
  }
</style>
