/* 只有下拉框的输入框 */
<template>
  <div>
    <input
      class="input"
      ref="input"
      :styel="{ width: inputWidth + 'px' }"
      :value="value"
      @input="onInput"
    />
  </div>
</template>

<script>
  export default {
    props: {
      // input绑定的值
      value: {
        type: [String, Number],
        default: '',
      },
      inputWidth: {
        type: [String],
        default: '10',
      },
    },
    mounted() {},
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .input {
    border: 1px solid #dcdfe6;
    border-top-style: none;
    border-left-style: none;
    border-right-style: none;
    color: #606266;
    padding: 8px;
    &:focus {
      outline: none;
    }
  }
</style>
