<!-- 配置列表页 -->

<template>
  <div class="page">
    <div class="product">
      <card>
        <el-form label-width="80px">
          <el-row>
            <el-col :xl="5" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item size="mini" label="订单编号">
                <el-input
                  v-model="searchList.pu027orPu009"
                  placeholder="请输入订单编号或物料号"
                  :clearable="true"
                />
              </el-form-item>
            </el-col>
            <!-- <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
              <el-form-item size="mini" label="行号">
                <el-input
                  v-model="searchList.bdc001"
                  placeholder="请输入行号"
                  :clearable="true"
                />
              </el-form-item>
            </el-col> -->
            <!-- <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
              <el-form-item size="mini" label="物料编号">
                <el-input
                  v-model="searchList.bdc004"
                  placeholder="请输入物料编号"
                  :clearable="true"
                />
              </el-form-item>
            </el-col> -->
            <el-col :xl="5" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item size="mini" label="采购日期">
                <el-date-picker
                  v-model="searchList.pu029"
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
            <el-col :xl="14" :lg="12" :md="8" :sm="12" :xs="24">
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
                <el-switch
                  style="margin-left: 10px;"
                  v-model="switchValue"
                  active-text="常规表格"
                  inactive-text="Excel表格"
                >
                </el-switch> </el-form-item
            ></el-col>
          </el-row>
        </el-form>
      </card>

      <card style="margin-top: 10px; width: 100%">
        <el-table
          v-if="switchValue"
          v-loading="isLoading"
          :data="tableData"
          border
          :highlight-current-row="true"
          size="mini"
          style="width: 100%;"
          element-loading-text="玩命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-table-column
            prop="pu027"
            align="center"
            header-align="center"
            label="订单编号"
            min-width="100"
          />
          <el-table-column
            prop="pu028"
            label="行号"
            header-align="center"
            align="center"
            min-width="50"
          />
          <el-table-column
            prop="pu029"
            label="采购日期"
            header-align="center"
            align="center"
            min-width="90"
          />
          <el-table-column
            prop="pu009"
            label="物料编号"
            align="center"
            header-align="center"
            width="120"
            min-width="120"
          />
          <el-table-column
            prop="pu011"
            label="物料名称"
            :show-overflow-tooltip="true"
            align="center"
            header-align="center"
            min-width="200"
          />
          <el-table-column
            prop="pu036"
            label="采购数量"
            align="center"
            header-align="center"
            min-width="70"
          />
          <el-table-column
            prop="bdc006"
            label="到货数量"
            align="center"
            header-align="center"
            min-width="70"
          />
          <el-table-column
            prop="pu037"
            label="采购金额"
            align="center"
            header-align="center"
            min-width="70"
          />
          <el-table-column
            prop="pu040"
            label="含税单价"
            align="center"
            header-align="center"
            min-width="70"
          />
          <el-table-column
            prop="pu039"
            label="计划到货日期"
            align="center"
            header-align="center"
            min-width="100"
          />
          <el-table-column
            prop="pu087"
            label="交期回复说明"
            align="center"
            :show-overflow-tooltip="true"
            header-align="center"
            min-width="150"
          />
          <el-table-column
            prop="pu089"
            label="交期回复时间"
            align="center"
            header-align="center"
            min-width="100"
          />
          <el-table-column
            prop="pu088"
            label="第二次交期回复说明"
            align="center"
            :show-overflow-tooltip="true"
            header-align="center"
            min-width="150"
          />
          <el-table-column
            prop="pu090"
            label="第二次交期回复时间"
            align="center"
            header-align="center"
            min-width="130"
          />
          <el-table-column
            label="操作"
            width="250"
            header-align="center"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <!-- <el-button
                size="mini"
                type="success"
                round
                icon="el-icon-search"
                @click="onView(scope.row)"
              >
                查看
              </el-button> -->
              <el-button
                size="mini"
                type="primary"
                round
                icon="el-icon-edit-outline"
                @click="onEdit(scope.row)"
                >回复
              </el-button>
              <el-button
                size="mini"
                type="success"
                round
                icon="el-icon-download"
                @click="downloadOrder"
                >下载订单
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="!switchValue" style="color: #e46828; font-size: 10px;">
          * 表格内有红色说明数据不对，是无法保存的
        </div>
        <hot-table
          ref="hotTableComponent"
          v-if="!switchValue"
          :data="tableData"
          v-loading="isLoading"
          :settings="settings"
        >
          <hot-column title="订单编号" data="pu027" read-only="true">
          </hot-column>
          <hot-column title="行号" data="pu028" read-only="true"> </hot-column>
          <hot-column title="采购日期" data="pu009" read-only="true">
          </hot-column>
          <hot-column title="物料名称" data="pu011" read-only="true">
          </hot-column>
          <hot-column title="采购数量" data="pu036" read-only="true">
          </hot-column>
          <hot-column title="到货数量" data="bdc006" read-only="true">
          </hot-column>
          <hot-column title="采购金额" data="pu037" read-only="true">
          </hot-column>
          <hot-column title="含税单价" data="pu040" read-only="true">
          </hot-column>
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
        <div
          style="margin-top: 10px;display: flex; justify-content: flex-start;"
        >
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
  import { getPurchaseDate } from '@/api/delivery-reply'
  import { HotTable, HotColumn } from '@handsontable/vue'
  import { registerAllModules } from 'handsontable/registry'

  registerAllModules()

  export default {
    name: 'AdminUserListPage',
    components: { Card, HotTable, HotColumn },
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
          pu027orPu009: '', // 采购单号或物料号
          pu029: '', // 采购日期
          bdc004: '', // 梯号
          bdc006: '', // 订单时间
        },
        // 切换表格模式
        switchValue: true,
        // excel表格
        settings: {
          height: 'auto',
          strectchH: 'all',
          // 没有底部脚本
          licenseKey: 'non-commercial-and-evaluation',
          maxCols: 20,
          columnSorting: true, //排序
          customBorders: [], //添加边框
          manualColumnFreeze: true, //手动固定列
          manualColumnMove: true, //手动移动列
          manualRowMove: true, //手动移动行
          manualColumnResize: true, //手工更改列距
          manualRowResize: true, //手动更改行距
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
      switchValue: {
        handler(value) {
          if (!value) {
            this.$message.info(
              'Excel表格模式下，操作完后请点击保存，否则数据无法自动保存'
            )
            this.pageSize = 20
          } else {
            this.pageSize = 10
          }
          this.getTableData()
        },
      },
    },
    created() {
      this.getTableData()
    },
    methods: {
      // 获取表格数据
      async getTableData() {
        this.isLoading = true
        const res = await getPurchaseDate({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          pu027orPu009: this.searchList.pu027orPu009,
          pu029: this.searchList.pu029,
        })

        this.dataTotal = res.total
        this.tableData = res.rows
        this.tableData.forEach((item) => {
          if (item.pu029) {
            item.pu029 = item.pu029.substring(0, 10).replaceAll('/', '-')
          }
          if (item.pu039) {
            item.pu039 = item.pu039.substring(0, 10).replaceAll('/', '-')
          }
          if (item.pu090) {
            item.pu090 = item.pu090.substring(0, 10).replaceAll('/', '-')
          }
          if (item.pu089) {
            item.pu089 = item.pu089.substring(0, 10).replaceAll('/', '-')
          }
        })
        this.currentPage = res.currentPage
        this.isLoading = false
        // 更新excel表格的数据
        this.updateHotTableData(this.tableData)
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

      // 搜索重置
      onSearchReset() {
        for (let key in this.searchList) {
          this.searchList[key] = ''
        }
        this.getTableData()
      },

      // 搜索
      onSearch() {
        // 去掉前后空格
        for (let key in this.searchList) {
          this.searchList[key] = this.searchList[key].trim()
        }
        this.getTableData()
      },

      // 查看
      onView(item) {
        this.$router.push(
          `/delivery-reply/delivery-reply-view?pu027=${item.pu027}&pu028=${item.pu028}`
        )
      },

      // 编辑
      onEdit(item) {
        this.$router.push(
          `/delivery-reply/delivery-reply-edit?pu027=${item.pu027}&pu028=${item.pu028}`
        )
      },

      // 更新excel表格的数据
      updateHotTableData(data) {
        this.$refs.hotTableComponent.hotInstance.loadData(data)
      },

      // 保存
      onSubmit() {
        // 检查回复时间是否非法
        const reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/
        for (let i = 0; i < this.tableData.length; i++) {
          let val = this.tableData[i]
          for (let key in val) {
            if (
              (key == 'pu089' || key == 'pu090') &&
              val[key] &&
              val[key].length > 0
            ) {
              if (!reg.test(val[key])) {
                this.$message.error('时间格式不正确，标准格式为“xxxx-xx-xx”')
                return
              }
            }
          }
        }
        // TODO 数据验证成功后的操作
        console.log('success')
        this.tableData = this.tableData.filter((item) => {
          item.bdc027
        })
        console.log(this.tableData)
      },

      // 下载订单
      downloadOrder() {
        // TODO 下载相关逻辑
        this.$message.info('下载中')
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

<style
  src="../../../node_modules/handsontable/dist/handsontable.full.css"
></style>
