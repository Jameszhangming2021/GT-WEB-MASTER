<!-- 配置列表页 -->

<template>
  <div class="page">
    <div class="product">
      <card>
        <el-form label-width="80px">
          <el-row>
            <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item size="mini" label="项目名称">
                <el-input
                  v-model="searchList.bdc002"
                  placeholder="请输入项目名"
                  :clearable="true"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item size="mini" label="项目编号">
                <el-input
                  v-model="searchList.bdc001"
                  placeholder="请输入项目编号"
                  :clearable="true"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item size="mini" label="梯号">
                <el-input
                  v-model="searchList.bdc004"
                  placeholder="请输入梯号"
                  :clearable="true"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item size="mini" label="订单日期">
                <el-date-picker
                  v-model="searchList.bdc006"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  style="width:100%;"
                  type="date"
                  :clearable="true"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xl="4" :lg="8" :md="8" :sm="12" :xs="24">
              <el-form-item>
                <el-button
                  round
                  size="mini"
                  icon="el-icon-search"
                  type="primary"
                  :loading="isLoading"
                  @click="onSearch"
                  >搜索</el-button
                >
                <el-button
                  size="mini"
                  round
                  icon="el-icon-refresh-right"
                  :loading="isLoading"
                  @click="onSearchReset"
                  >重置</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </card>

      <card style="margin-top: 10px; width: 100%">
        <div style="margin-bottom: 10px">
          <!-- <el-button size="mini">已选中 {{ selectedTotal }} 项</el-button> -->
          <el-button
            type="success"
            size="mini"
            :loading="isLoading"
            @click="create"
            >新增</el-button
          >
          <!-- <el-button type="primary"
                     size="mini"
                     :loading="isLoading"
                     @click="create"
                     round
                     plain
                     icon="el-icon-date">时间</el-button> -->
          <!-- <el-button type="danger"
                     size="mini"
                     :disabled="batchBtn"
                     :loading="isLoading"
                     @click="onDelete()">批量删除</el-button> -->
        </div>
        <el-table
          v-loading="isLoading"
          :data="tableData"
          border
          :highlight-current-row="true"
          size="mini"
          style="width: 100%;"
          element-loading-text="玩命加载中"
          element-loading-spinner="el-icon-loading"
          @selection-change="onSelectionChange"
        >
          <!-- <el-table-column type="selection"
                           width="55"
                           fixed
                           align="center" /> -->
          <el-table-column
            prop="bdcId"
            align="center"
            header-align="center"
            label="序号"
            width="60"
          />
          <el-table-column
            prop="bdc001"
            align="center"
            header-align="center"
            label="项目编号"
            min-width="200"
          />
          <el-table-column
            prop="bdc002"
            label="项目名称"
            header-align="center"
            align="center"
            min-width="200"
          />
          <el-table-column
            prop="bdc004"
            label="梯号"
            header-align="center"
            align="center"
            min-width="200"
          />
          <el-table-column
            prop="bdc006"
            label="订单时间"
            align="center"
            header-align="center"
            width="200"
            min-width="200"
          />
          <el-table-column
            prop="bdc006"
            label="状态"
            align="center"
            header-align="center"
            min-width="100"
          />
          <el-table-column
            label="操作"
            width="200"
            header-align="center"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="success"
                icon="el-icon-search"
                size="small"
                circle
                @click="viewData(scope.row)"
              />
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                v-if="!scope.row.bdc070"
                circle
                @click="editData(scope.row)"
              />
              <el-button
                type="warning"
                icon="el-icon-download"
                size="small"
                v-if="scope.row.bdc070"
                circle
                @click="onDownload(scope.row)"
              />
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                v-if="!scope.row.bdc070"
                circle
                @click="onDelete(scope.row)"
              />

              <el-tooltip
                effect="dark"
                content="订单已提交，点击此按钮会关闭订单"
                placement="top-start"
              >
                <el-button
                  type="danger"
                  icon="el-icon-circle-close"
                  size="small"
                  circle
                  v-if="scope.row.bdc070"
                  plain
                  @click="onClose(scope.row)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="dataTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </card>
    </div>

    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="false"
      :visible.sync="isDialog"
    >
      <div v-if="dialogType == 'remove'">
        <div style="margin-bottom: 10px;">
          数据删除后，不可复原，请确定是否要删除
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="isDialog = false">取 消</el-button>
          <el-button type="danger" size="mini" @click="confirmDelete"
            >确定删除</el-button
          >
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Card from '@/components/Card/Card.vue'
  import {
    getSaleData,
    removeSale,
    confirmSale,
    downloadExcel,
  } from '@/api/sale'
  import { formatDate } from '@/utils/helper.js'
  export default {
    name: 'AdminUserListPage',
    components: { Card },
    data() {
      return {
        // 表格数据
        tableData: [],
        // 弹窗是否显示
        isDialog: false,
        // 当前选中的id
        userId: '',
        // 模式
        mode: 'create',
        // 已选中的数据
        selected: [],
        // 批量操作按钮是否可按
        batchBtn: false,
        // 组件loading
        isLoading: false,
        // 当前页面
        currentPage: 1,
        // 当前页面size
        pageSize: 10,
        // 数据总数
        dataTotal: 0,
        // 当前用户的id
        curItem: null,
        // 弹窗类型
        dialogType: '',
        // 弹窗标题
        dialogTitle: '',
        // 搜索字段
        searchList: {
          bdc001: '', // 项目编号
          bdc002: '', // 项目名称
          bdc004: '', // 梯号
          bdc006: '', // 订单时间
        },
      }
    },
    computed: {
      selectedTotal() {
        return this.selected.length
      },
    },
    watch: {
      selected: {
        immediate: true,
        handler(value) {
          this.batchBtn = !(value.length > 0)
        },
      },
    },
    created() {
      if (this.$route.query.currentPage)
        this.currentPage = parseInt(this.$route.query.currentPage)
      this.getTableData()
    },
    methods: {
      // 获取所有用户数据
      async getTableData(id = 0) {
        this.isLoading = true
        const res = await getSaleData({
          bdc001: this.searchList.bdc001,
          bdc002: this.searchList.bdc002,
          bdc004: this.searchList.bdc004,
          bdc006: this.searchList.bdc006,
          CurrentPage: this.currentPage,
          PageSize: this.pageSize,
        })
        this.dataTotal = res.total
        // res.rows.forEach(i => {
        //   if (i.bdc006) {
        //     i.bdc006 = i.bdc006.replaceAll('T', ' ')
        //   }
        // })
        const len = res.rows.length
        for (let i = 0; i < len; i++) {
          if (res.rows[i].bdc006) {
            res.rows[i].bdc006 = formatDate(res.rows[i].bdc006)
          }
        }
        this.tableData = res.rows
        this.currentPage = res.currentPage
        this.isLoading = false
      },
      // 查看单个用户的数据
      viewData(item) {
        this.$router.push({
          path: '/configure/configure-view',
          query: {
            bdc001: item.bdc001,
            bdc004: item.bdc004,
            currentPage: this.currentPage,
          },
        })
      },
      // 新增用户
      create() {
        this.$router.push('/configure/configure-edit-1')
      },
      // 编辑单个用户
      editData(item) {
        this.$router.push({
          path: '/configure/configure-edit-1',
          query: {
            bdc001: item.bdc001,
            bdc004: item.bdc004,
            currentPage: this.currentPage,
          },
        })
      },
      // 删除用户
      onDelete(item) {
        this.isDialog = true
        this.dialogType = 'remove'
        this.dialogTitle = '操作提示'
        this.curItem = item
      },
      // 表格单选框
      onSelectionChange(selection) {
        this.selected = selection
      },
      // 分页每页总数发生改变
      handleSizeChange(index) {
        this.pageSize = index
        this.getTableData()
      },
      // 分页当前页码发生改变
      handleCurrentChange(index) {
        this.currentPage = index
        this.getTableData()
      },

      // 分类节点被点击
      onNodeClick(id) {
        // 如果已经是当前分类，则不请求
        if (this.curCatId == id) {
          return
        } else {
          this.getProductData(id)
          this.curCatId = id
        }
      },

      // 搜索重置
      onSearchReset() {
        for (let key in this.searchList) {
          this.searchList[key] = ''
        }
        this.getTableData()
      },

      // 搜索
      onSearch() {
        for (let key in this.searchList) {
          if (key != 'bdc006') {
            this.searchList[key] = this.searchList[key].trim()
          }
        }
        this.getTableData()
      },

      // 确定删除
      async confirmDelete() {
        this.isLoading = true
        this.isDialog = false
        await removeSale(this.curItem)
        this.isLoading = false
        this.$message.success('删除成功!!')
        this.getTableData()
      },

      // 关闭订单
      async onClose(item) {
        this.isLoading = true
        await confirmSale(item)
        this.$message.success('订单关闭成功')
        this.getTableData()
      },

      onTip() {
        this.$message.info('功能在开发中，敬请期待')
      },

      // 下载excel
      async onDownload(item) {
        this.isLoading = true
        const res = await downloadExcel(item)
        this.isLoading = false
        window.open(res.data)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }
  .product {
    flex: 1;
    width: 100px;
  }
  .pagination {
    display: flex;
    margin-top: 10px;
    justify-content: flex-start;
    align-items: center;
  }
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
