<template>
  <div class="test-container">
    <!-- 顶部搜索 -->
    <div class="search">
      <el-card shadow="never" :body-style="{ padding: '0px 0px 0px 10px' }">
        <el-form :inline="true">
          <el-form-item
            label="采购单号"
            class="form-item"
            v-if="searchType == 'order'"
          >
            <el-input
              size="mini"
              v-model="pur_code"
              placeholder="采购单号"
              :clearable="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="物号"
            class="form-item"
            v-if="searchType == 'mater'"
          >
            <el-input
              size="mini"
              v-model="marterial_number"
              placeholder="物号"
              :clearable="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item"
            label="时间"
            v-if="searchType == 'order'"
          >
            <el-date-picker
              size="mini"
              v-model="orderDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="类型" class="form-item">
            <el-select
              @change="onSelectChange"
              v-model="searchType"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in selectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item">
            <el-button
              :loading="btn_loading"
              type="primary"
              @click="doSearch"
              icon="el-icon-search"
              round
              size="mini"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- 主体 -->
    <div class="content" v-if="searchType == 'order'">
      <el-card
        shadow="never"
        class="content-card"
        :body-style="{ padding: '0px' }"
      >
        <el-row class="card">
          <el-col
            :xs="9"
            :sm="9"
            :md="9"
            :lg="7"
            :xl="5"
            style="border-right: 1px solid #d4c4b7;"
          >
            <div class="card-title card-flex">
              <div>采购单号</div>
              <div v-if="isAdmin">供应商</div>
              <div>日期</div>
            </div>
            <div class="card-items" v-loading="btn_loading">
              <div
                :class="{
                  'card-item': true,
                  'card-flex': true,
                  'current-item': curProjectNo == i.cPOID,
                }"
                v-for="i in project_list"
                :key="i.cPOID"
                @click="search_marterail(i.cPOID)"
              >
                <div>{{ i.cPOID }}</div>
                <div v-if="isAdmin">{{ i.cVenCode }}</div>
                <div>{{ i.dPODate }}</div>
              </div>
            </div>
          </el-col>
          <el-col
            :xs="7"
            :sm="7"
            :md="7"
            :lg="5"
            :xl="5"
            style="border-right: 1px solid #d4c4b7"
          >
            <div style="display: flex; justify-content: space-between;">
              <div class="card-title">
                物号
              </div>
              <div class="card-title" v-if="marterial_list.length > 0">
                是否下载BOM
              </div>
            </div>

            <div class="card-items" v-loading="btn_loading">
              <div
                :class="{
                  'card-item': true,
                  'current-item': curMaterialNo == i,
                }"
                v-for="(i, index) in marterial_list"
                :key="index"
                @click="search_data(i)"
              >
                <div>
                  <div>{{ i.cInvCode }}</div>
                  <div style="color: #909399;font-size: 14px;">
                    {{ i.cInvName }}
                  </div>
                </div>
                <div @click.stop="selectCheck">
                  <el-checkbox
                    v-model="isDownloadBOM"
                    v-if="curMaterialNo == i"
                    @change="onChange"
                  ></el-checkbox>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="9" :lg="12" :xl="14">
            <div>
              <div style="margin-left: 10px">
                <el-tag style="margin-right: 10px"
                  >已选中 {{ selected_total }} 项</el-tag
                >
                <el-button
                  :loading="btn_loading"
                  type="success"
                  :disabled="btnDisable"
                  round
                  size="mini"
                  icon="el-icon-download"
                  @click="download(null)"
                  >批量打包下载</el-button
                >
                <!--                     :disabled="marterial_list.length <= 0" -->
                <el-tooltip
                  content="订单中的项目图纸太多，非必要时不要使用此功能！"
                  placement="top"
                  ><el-button
                    type="warning"
                    size="mini"
                    round
                    style="margin-left: 10px"
                    :disabled="curProjectNo.length == 0"
                    :loading="btn_loading"
                    @click="downloadAll"
                    >一键下载所有文件</el-button
                  ></el-tooltip
                >
              </div>
              <div class="table">
                <el-table
                  ref="table"
                  v-loading="btn_loading"
                  :data="tableData"
                  :height="table_height"
                  @selection-change="handleSelectionChange"
                  :border="false"
                  :row-class-name="tableRowClassName"
                  empty-text="暂无数据"
                  style="width: 100%"
                >
                  <el-table-column fixed type="selection" width="50">
                  </el-table-column>
                  <el-table-column label="类型" width="50">
                    <template slot-scope="scope">
                      <img
                        v-if="scope.row.fileType == 'doc'"
                        src="../../../assets/file-image/doc.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'cdr'"
                        src="../../../assets/file-image/cdr.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'png'"
                        src="../../../assets/file-image/png.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'dwg'"
                        src="../../../assets/file-image/dwg.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'jpg'"
                        src="../../../assets/file-image/jpg.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'pcb'"
                        src="../../../assets/file-image/pcb.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'pdf'"
                        src="../../../assets/file-image/pdf.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'tif'"
                        src="../../../assets/file-image/tif.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'xls'"
                        src="../../../assets/file-image/xls.png"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="file_name"
                    label="文件名"
                    min-width="300"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="dc_docdate"
                    label="上传日期"
                    min-width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="cinvcode"
                    label="子件物料编号"
                    min-width="120"
                  ></el-table-column>
                  <el-table-column
                    prop="ptcode"
                    label="母件物号"
                    min-width="120"
                  ></el-table-column>
                  <el-table-column
                    prop="action"
                    label="操作"
                    width="70"
                    fixed="right"
                  >
                    <template slot-scope="scope">
                      <el-button
                        :loading="btn_loading"
                        @click="download(scope.row)"
                        circle
                        type="success"
                        icon="el-icon-download"
                        size="small"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- 主体 -->
    <div class="content" v-if="searchType == 'mater'">
      <el-card
        shadow="never"
        class="content-card"
        :body-style="{ padding: '0px' }"
      >
        <el-row class="card">
          <el-col>
            <div>
              <div style="margin-left: 10px">
                <el-tag style="margin-right: 10px"
                  >已选中 {{ selected_total }} 项</el-tag
                >
                <el-button
                  :loading="btn_loading"
                  type="success"
                  :disabled="btnDisable"
                  round
                  size="mini"
                  icon="el-icon-download"
                  @click="download(null)"
                  >批量打包下载</el-button
                >
              </div>
              <div class="table">
                <el-table
                  ref="table"
                  v-loading="btn_loading"
                  :data="tableData"
                  :height="table_height"
                  @selection-change="handleSelectionChange"
                  :border="false"
                  :row-class-name="tableRowClassName"
                  empty-text="暂无数据"
                  style="width: 100%"
                >
                  <el-table-column fixed type="selection" width="50">
                  </el-table-column>
                  <el-table-column label="类型" width="50">
                    <template slot-scope="scope">
                      <img
                        v-if="scope.row.fileType == 'doc'"
                        src="../../../assets/file-image/doc.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'cdr'"
                        src="../../../assets/file-image/cdr.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'png'"
                        src="../../../assets/file-image/png.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'dwg'"
                        src="../../../assets/file-image/dwg.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'jpg'"
                        src="../../../assets/file-image/jpg.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'pcb'"
                        src="../../../assets/file-image/pcb.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'pdf'"
                        src="../../../assets/file-image/pdf.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'tif'"
                        src="../../../assets/file-image/tif.png"
                      />
                      <img
                        v-if="scope.row.fileType == 'xls'"
                        src="../../../assets/file-image/xls.png"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="file_name"
                    label="文件名"
                    min-width="300"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="dc_docdate"
                    label="上传日期"
                    min-width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="cinvcode"
                    label="子件物料编号"
                    min-width="120"
                  ></el-table-column>
                  <el-table-column
                    prop="ptcode"
                    label="母件物号"
                    min-width="120"
                  ></el-table-column>
                  <el-table-column
                    prop="action"
                    label="操作"
                    width="70"
                    fixed="right"
                  >
                    <template slot-scope="scope">
                      <el-button
                        :loading="btn_loading"
                        @click="download(scope.row)"
                        circle
                        type="success"
                        icon="el-icon-download"
                        size="small"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="90%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      @close="onDialogClose"
      top="5vh"
    >
      <el-tag type="success">已选：{{ tableSelectoinList.length }}</el-tag>
      <el-switch
        style="margin-left: 10px;"
        v-model="switchValue"
        active-text="下载bom"
      >
      </el-switch>
      <el-button
        type="primary"
        size="mini"
        round
        :disabled="btnDisable"
        style="margin-left: 10px"
        :loading="btn_loading"
        @click="download(null, 'ALL')"
        >打包下载</el-button
      >
      <el-button
        type="warning"
        size="mini"
        round
        style="margin-left: 10px"
        :loading="btn_loading"
        @click="dialogVisible = false"
        >退出</el-button
      >
      <!--        -->
      <el-table
        v-loading="btn_loading"
        element-loading-text="拼命加载中"
        :data="allData"
        :height="table_height"
        @selection-change="handleSelectionChange"
        :border="false"
        empty-text="暂无数据"
        style="width: 100%"
        :class="{ 'table-opacity': btn_loading }"
      >
        <el-table-column fixed type="selection" width="50"> </el-table-column>
        <el-table-column label="类型" width="50">
          <template slot-scope="scope">
            <!-- TODO 优化图片引入方式：因为webpack打包会使得用变量作为src路径出错 -->
            <img
              v-if="scope.row.fileType == 'cdr'"
              src="../../../assets/file-image/cdr.png"
            />
            <img
              v-if="scope.row.fileType == 'doc'"
              src="../../../assets/file-image/doc.png"
            />
            <img
              v-if="scope.row.fileType == 'png'"
              src="../../../assets/file-image/png.png"
            />
            <img
              v-if="scope.row.fileType == 'dwg'"
              src="../../../assets/file-image/dwg.png"
            />
            <img
              v-if="scope.row.fileType == 'jpg'"
              src="../../../assets/file-image/jpg.png"
            />
            <img
              v-if="scope.row.fileType == 'pcb'"
              src="../../../assets/file-image/pcb.png"
            />
            <img
              v-if="scope.row.fileType == 'pdf'"
              src="../../../assets/file-image/pdf.png"
            />
            <img
              v-if="scope.row.fileType == 'tif'"
              src="../../../assets/file-image/tif.png"
            />
            <img
              v-if="scope.row.fileType == 'xls'"
              src="../../../assets/file-image/xls.png"
            />
          </template>
        </el-table-column>
        <el-table-column prop="file_name" label="文件名" min-width="400">
        </el-table-column>
        <el-table-column prop="cpoid" label="采购单号" min-width="200">
        </el-table-column>
        <el-table-column prop="dc_docdate" label="上传日期" min-width="150">
        </el-table-column>
        <el-table-column
          prop="cinvcode"
          label="子件物料编号"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="ptcode"
          label="母件物号"
          min-width="120"
        ></el-table-column>
      </el-table>
      <div class="masking" v-if="isDownload">
        <div>当前下载速度</div>
        <el-progress
          style="width: 80%;"
          :format="format"
          :text-inside="true"
          :stroke-width="24"
          :percentage="downloadPercent"
          :status="downloadStatus"
        ></el-progress>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getPurOrders,
    getMaterByPur,
    getDrawing,
    downloadDrawing,
    getUpdateDrawing,
    getDownloadPer,
  } from '@/api/drawing-download'
  export default {
    data() {
      return {
        // 要搜索的项目号
        pur_code: '',
        // 要搜索的物号
        marterial_number: '',
        // 单选框的值（1：未归档，2：已归档）
        radio: 1,
        // 当前选中的项目号
        curProjectNo: '',
        // 项目编号列表
        project_list: [],
        // 物号编号列表
        marterial_list: [],
        // 当前选中的物号
        curMaterialNo: '',
        // 表格已选的项
        tableSelectoinList: [],
        // 表格的数据
        tableData: [],
        // 表格高度
        table_height: document.body.clientHeight - 220,
        // 所有按钮loading
        btn_loading: false,
        // 时间选择器绑定的值
        orderDate: '',
        dpodatestrart: '',
        dpodateend: '',
        // 是否下载BOM
        isDownloadBOM: false,
        // 是否下载BOM
        downbomYN: 'N', // ALL：下载全部 Y：下载单个 N：不下载BOM
        dialogVisible: false, // 弹窗
        // 一键下载的表格数据
        allData: [],
        // 弹窗标题
        dialogTitle: '文件列表',
        // 多选总数
        selected_total: 0,
        // 多选框的值
        checkboxValue: false,
        // 开关的值
        switchValue: false,
        // 是否在下载中
        isDownload: false,
        // 下载进度条百分比
        downloadPercent: 0,
        // 下载进度条状态
        downloadStatus: 'success',
        // 定时器
        timer: null,
        // 类型选择器
        selectList: [
          {
            label: '按单号搜索',
            value: 'order',
          },
          {
            label: '按物号搜索',
            value: 'mater',
          },
        ],
        // 搜索类型
        searchType: '',
      }
    },
    mounted() {
      this.getUpdateDrawingData()
      // 类型选择默认值
      this.searchType = this.selectList[0].value
    },
    computed: {
      // 一键下载是否下载bom
      downloadAllBom() {
        return this.switchValue ? 'ALL' : 'N'
      },
      // 批量下载按钮是否可按
      btnDisable() {
        return this.tableSelectoinList.length > 0 ? false : true
      },
      // selected_total() {
      //   return this.tableSelectoinList.length
      // },
      // 是否为超级用户
      isAdmin() {
        return this.$store.state.user.isAdmin
      },
    },
    beforeRouteEnter() {},
    watch: {
      // 侦测时间选择器的结果，解构成请求的参数
      orderDate(value) {
        if (value) {
          this.dpodatestrart = new Date(value[0])
            .toLocaleDateString()
            .replaceAll('/', '-')
          this.dpodateend = new Date(value[1])
            .toLocaleDateString()
            .replaceAll('/', '-')
        } else {
          this.dpodatestrart = ''
          this.dpodateend = ''
        }
      },
      tableSelectoinList: {
        deep: true,
        handler(value) {
          this.selected_total = value.length
        },
      },
      isDownload(val) {
        if (!val) {
          this.downloadPercent = 0
          this.timer = null
        } else {
          if (!this.timer) {
            this.percentAdd()
          }
        }
      },
    },
    methods: {
      // 表格多项选择
      handleSelectionChange(selection) {
        this.tableSelectoinList = selection
      },
      // 搜索
      async doSearch() {
        if (this.searchType === 'order') {
          if (
            this.pur_code.length == 0 &&
            this.dpodatestrart.length == 0 &&
            this.dpodateend.length == 0
          ) {
            return
          }
          // 时间选择最多30天
          let startTime = new Date(this.dpodatestrart).valueOf()
          let endTime = new Date(this.dpodateend).valueOf()
          if (endTime - startTime > 30 * 24 * 60 * 60 * 1000 + 1) {
            return this.$message.error('时间选择最大跨度为30天')
          }
          this.btn_loading = true
          this.curProjectNo = ''
          this.tableData = []
          this.clear_all_data()
          try {
            const res = await getPurOrders({
              currentPage: 1,
              pageSize: 10000,
              cPOID: this.pur_code,
              dpodatestrart: this.dpodatestrart,
              dpodateend: this.dpodateend,
            })
            this.project_list = res.rows
          } catch (err) {
          } finally {
            this.btn_loading = false
          }
        } else {
          this.search_data({
            cInvCode: this.marterial_number,
            cInvName: '',
            poid: '',
            cPOID: '',
            currentPage: 1,
            pageSize: 10000,
            cinvocdeAllYn: '',
          })
        }
      },

      // 获取物号列表
      async search_data(item) {
        this.curMaterialNo = item
        this.btn_loading = true
        this.tableData = []
        // 清除表格用户的选择框选中的项
        this.$refs.table.clearSelection()
        const res = await getDrawing({
          ...item,
          currentPage: 1,
          pageSize: 10000,
          cinvocdeAllYn: '',
        })
        // 数据渲染
        this.btn_loading = false

        res.rows.forEach((i) => {
          let fileType = i.dc_docname
            .slice(i.dc_docname.lastIndexOf('.') + 1)
            .toLowerCase()
          this.tableData.push({
            file_name: `${i.ptcode}_${i.cinvcode}_${i.dc_docname}`,
            fileType,
            ...i,
          })
        })
      },

      // 根据采购单号获取物料号数据
      async search_marterail(no) {
        this.curProjectNo = no
        this.btn_loading = true
        this.marterial_list = []
        this.tableData = []
        const res = await getMaterByPur({
          currentPage: 1,
          pageSize: 10000,
          cPOID: no,
          dpodatestrart: this.dpodatestrart,
          dpodateend: this.dpodateend,
        })
        res.data.forEach((i) => {
          this.marterial_list.push({
            cInvCode: i.cInvCode,
            cInvName: i.cInvName,
            poid: i.poid,
            cPOID: i.cPOID,
          })
        })
        this.btn_loading = false
      },

      // 清空所有数据
      clear_all_data() {
        this.tableData = []
        this.project_list = []
        this.marterial_list = []
      },

      // 一键下载所有的图纸
      async downloadAll() {
        try {
          this.$refs.table.clearSelection()
          this.tableSelectoinList = []
          this.allData = []
          // 打开弹窗
          this.dialogVisible = true
          this.dialogTitle = '文件列表'
          this.switchValue = false
          // 表格loading
          this.btn_loading = true
          const res = await getDrawing({
            currentPage: 1,
            pageSize: 10000,
            cinvocdeAllYn: 'Y',
            poid: 0,
            cPOID: this.curProjectNo,
            cInvCode: '',
          })
          res.rows.forEach((i) => {
            let fileType = i.dc_docname
              .slice(i.dc_docname.lastIndexOf('.') + 1)
              .toLowerCase()
            this.allData.push({
              file_name: `${i.ptcode}_${i.cinvcode}_${i.dc_docname}`,
              fileType,
              ...i,
            })
          })
        } catch (err) {
        } finally {
          this.btn_loading = false
        }
      },

      // 物号单选框
      selectCheck(code) {},

      // 物号单选框
      onChange(value) {
        this.checkboxValue = value
        this.downbomYN = value ? 'Y' : 'N'
      },

      async download(data, isBom = 'not') {
        this.isDownload = true
        if (isBom == 'ALL' && this.switchValue) {
          this.downbomYN = 'ALL'
        }
        let arr = []
        this.btn_loading = true
        if (data) {
          arr.push(data)
        } else {
          arr = this.tableSelectoinList
        }
        try {
          const res = await downloadDrawing({
            ptcode: this.curMaterialNo.cInvCode,
            downbomYN: this.downbomYN,
            downloadList: arr,
          })
          this.btn_loading = false
          // 下载
          window.location.href = res.data
        } catch (err) {
        } finally {
          this.btn_loading = false
          this.isDownload = false
        }
      },

      // 表格更新提示
      tableRowClassName({ row }) {
        if (row.downstatus) {
          return 'success-row'
        }
        return ''
      },

      // 获取图标更新信息
      async getUpdateDrawingData() {
        const res = await getUpdateDrawing()
        const _this = this
        if (res.list.length > 0) {
          this.$message({
            type: 'error',
            message: '您下载过的图纸有更新，请在新弹窗中及时下载新的图纸文件',
            duration: 4000,
            onClose() {
              _this.dialogVisible = true
              _this.dialogTitle = '您下载过的图纸有更新，请下载新的图纸文件'
              res.list.forEach((i) => {
                _this.allData.push({
                  file_name: `${i.ptcode}_${i.cinvcode}_${i.dc_docname}`,
                  ...i,
                })
              })
            },
          })
        }
      },

      // 当弹窗关闭后，要重置已选的数量
      onDialogClose() {
        this.selected_total = 0
        this.tableSelectoinList = []
        this.downbomYN = this.checkboxValue ? 'Y' : 'N'
      },

      percentAdd() {
        this.timer = setInterval(() => {
          this.downloadPercent = Math.floor(Math.random() * 100)
        }, 400)
      },

      format(val) {
        return `${val * 100 + Math.floor(Math.random() * 1000)}Kb`
      },

      async getPercent() {
        const timer = setInterval(async () => {
          const res = await getDownloadPer()
          if (res.list1[0].dbfb > 99) {
            clearInterval(timer)
          }
        }, 1000)
      },

      // 类型选择器发生改变时
      onSelectChange() {
        // 欢迎所有数据
        this.marterial_number = ''
        this.tableData = []
        this.pur_code = ''
        this.project_list = []
        this.marterial_list = []
      },
    },
  }
</script>

<style lang="scss" scoped>
  .test-container {
    .search {
      width: 100%;
      min-height: 80px;
      .form-item {
        margin-top: 22px;
        margin-right: 20px;
      }
    }
    .content {
      margin-top: 10px;
      .content-card {
        height: calc(100vh - 180px);
        .card {
          padding: 10px 0;
          .card-title {
            padding-left: 10px;
            padding-right: 10px;
            font-weight: 600;
            font-size: 14px;
            color: #9ea7b4;
            margin-bottom: 0px;
          }

          .card-flex {
            display: flex;
            justify-content: space-between;
          }

          .card-items {
            height: calc(100vh - 210px);
            overflow-y: auto;
            .card-item {
              padding: 10px 10px;
              font-size: 14px;
              color: #464c5b;
              width: 100%;
              cursor: pointer;
              transition: all 0.15s;
              position: relative;
              display: flex;
              justify-content: space-between;
              &:hover {
                background: #f1eded;
              }
            }
            .current-item {
              background: #f1eded;
            }
          }
        }
      }
    }
  }

  .red-dot {
    background: red;
    margin-right: 5px;
    border-radius: 50%;
    width: 8px;
    height: 8px;
  }
  .success-row {
    background: #cfeebe;
  }
  .table-opacity {
    opacity: 0.2;
  }
  .masking {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 30px;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
</style>
