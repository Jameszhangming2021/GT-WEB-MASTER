<template>
  <div>
    <card>
      <div class="content">
        <!-- tag -->
        <div class="tag" :style="{color: tagColor}">
          <i :class="iconName"></i>
        </div>

        <!-- 数据 -->
        <div>
          <div class="title">{{ title }}</div>
          <div class="number">{{ number | dealNumber }}</div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import card from "../../../components/Card/Card.vue";
export default {
  props: {
    iconName: {
      type: String,
      default: "",
    },
    title: {
      type: String,
    },
    number: {
      type: [String, Number],
    },
    tagColor: {
        type: String,
    }
  },
  components: {
    card,
  },
  filters: {
      dealNumber(value) {
          if(!value) {
              return 0
          }
          let num = value.toString()
          let res = ''
          while(num.length > 3) {
              res = ',' + num.slice(-3) + res
              num = num.slice(0, num.length - 3)
          }
          if(num) {
              res = num + res
          }
          return res

      }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;

  .tag {
    font-size: 48px;
  }
  .title {
      font-size: 16px;
      margin-bottom: 10px;
      color: rgba(0, 0, 0, .45);
  }
  .number {
      font-weight: 700;
      font-size: 20px;
      color: #666;
  }
}
</style>