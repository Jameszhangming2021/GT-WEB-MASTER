<template>
  <div>
    <el-upload
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :before-remove="beforeRemove"
      :data="data"
      :auto-upload="false"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-button @click="upload('test', '123123123')">上传</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        data: {
          tableName: '',
          tableRowId: '',
          fileUsing: '',
        },
      }
    },
    props: {
      isSingle: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      fileList: {
        deep: true,
        immediate: true,
        handler(value) {},
      },
    },
    methods: {
      /**
       * @param {String} tableName 表名
       * @param {String} tableRowId 该表下的字段id
       * @param {String} fileUsing 文件用途：封面（Cover），轮播图（Swiper）
       */
      upload(tableName, tableRowId, type, fileUsing) {
        this.data.tableName = tableName
        this.data.tableRowId = tableRowId
        this.data.fileUsing = fileUsing
        this.$refs.upload.submit()
      },
      // 删除文件
      handleRemove(file, fileList) {},
      // 放大图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 删除前的处理
      beforeRemove(file, fileList) {
        return false
      },
    },
  }
</script>

<style lang="scss" scoped></style>
