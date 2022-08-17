<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎, {{ name }}</div>

    <card style="margin-top: 20px;">
      <h4>图纸下载地址推荐</h4>
      <ol>
        <li style="color: red; margin-bottom: 10px; font-weight: 550;">
          银海工厂：<a href="http://58.210.205.18:8082"
            >http://58.210.205.18:8082</a
          >
        </li>
        <li>
          卓梅尼及其他工厂：
          <a href="http://14.215.246.162:8082">http://14.215.246.162:8082</a>
        </li>
      </ol>
    </card>

    <!-- 数据统计 -->
    <el-row :gutter="32">
      <el-col :xl="6" :lg="6" :md="6" :sm="8" :xs="12" class="col">
        <tag-card
          iconName="el-icon-user-solid"
          title="人数"
          :number="1122223"
          tagColor="#40c9c6"
        ></tag-card
      ></el-col>
      <el-col :xl="6" :lg="6" :md="6" :sm="8" :xs="12" class="col">
        <tag-card
          iconName="el-icon-s-comment"
          title="新消息"
          :number="112223"
          tagColor="#36a3f7"
        ></tag-card
      ></el-col>
      <el-col :xl="6" :lg="6" :md="6" :sm="8" :xs="12" class="col">
        <tag-card
          iconName="el-icon-user-solid"
          title="人数"
          :number="1123"
          tagColor="#f4516c"
        ></tag-card
      ></el-col>
      <el-col :xl="6" :lg="6" :md="6" :sm="8" :xs="12" class="col">
        <tag-card
          iconName="el-icon-user-solid"
          title="人数"
          :number="111223"
          tagColor="#34bfa3"
        ></tag-card
      ></el-col>
    </el-row>
    <card style="width: 100%; height: 500px; margin-top: 20px">
      <chart></chart>
    </card>

    <!-- 个人消息 -->
    <!-- <card style="margin-top: 20px; width: 50%">
      <message-list></message-list>
    </card> -->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TagCard from './components/tag-card.vue'
  import Chart from './components/chart.vue'
  import Card from '../../components/Card/Card.vue'
  import MessageList from './components/message-list.vue'
  import { getUpdateDrawing } from '@/api/drawing-download.js'
  export default {
    name: 'Dashboard',
    components: { TagCard, Chart, Card, MessageList },
    computed: {
      ...mapGetters(['name']),
    },
    mounted() {
      // this.getUpdate()
    },
    methods: {
      // TODO 获取图纸是否有更新  需要有消息模块
      async getUpdate() {
        const res = await getUpdateDrawing()
        if (res.list.length > 0) {
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-text {
      font-size: 16px;
      line-height: 16px;
    }
  }

  .col {
    margin-top: 10px;
  }

  .chart {
    margin-top: 30px;
    width: 100%;
    height: 350px;
  }
</style>
