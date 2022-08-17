/** 配置表 */
<template>
  <div id="page">
    <card class="header">
      <div style="display: flex;">
        <div style="margin-left: 20px;margin-right: 150px;">
          <span
            style="font-size: 14px; color:#606266;font-weight: 550;padding-right: 15px;"
            >页面切换</span
          >
          <el-radio v-model="mode" size="small" label="1"
            >电梯基本参数</el-radio
          >
          <el-radio v-model="mode" size="small" label="2">人机界面</el-radio>
        </div>
        <div style="margin-right: 150px;">
          <span
            style="font-size: 14px; color:#606266;font-weight: 550;padding-right: 10px;"
            >订单日期</span
          >
          <el-date-picker
            v-model="form.bdc006"
            align="right"
            size="mini"
            type="date"
            value-format="yyyy-M-d"
            :disabled="true"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <div>
          <!-- <el-button size="mini"
                     round
                     type="primary"
                     @click="isDialogShow = true">导入配置</el-button> -->
          <el-button size="mini" type="success" round @click="onPrint"
            >打印</el-button
          >
        </div>
      </div>
    </card>
    <card style="margin-top: 20px;">
      <table id="print1" border="1px" class="table" cellspacing="0">
        <tr>
          <td colspan="3" rowspan="1">
            GTEC188系统电气配置表-整梯
          </td>
          <td>
            版本号：
            <!-- <input
              :disabled="true"
              v-model="form.bdc003"
              type="text"
              class="under_input"
              style="width: 50px;"
            /> -->
            <span class="under_input">{{ form.bdc003 }}</span>
            梯号：
            <!-- <input
              :disabled="true"
              v-model="form.bdc004"
              type="text"
              class="under_input"
              style="width: 50px;"
            /> -->
            <span class="under_input">{{ form.bdc004 }}</span>
          </td>
        </tr>
      </table>

      <!-- 合并列 colspan  合并行 rowspan -->
      <table id="print2" border="1px" class="table" cellspacing="0">
        <tr>
          <th colspan="2" style="text-align: center;">项目名称</th>
          <th style="text-align: center;" colspan="2">
            <!-- <input
              :disabled="true"
              v-model="form."
              type="text"
              class="under_input"
              style="min-width: 500px;"
            /> -->
            <span class="under_input">{{ form.bdc002 }}</span>
          </th>
        </tr>
        <tr>
          <th colspan="2" style="text-align: center;">项目编号</th>
          <th style="text-align: center;" colspan="2">
            <!-- <input
              :disabled="true"
              v-model="form.bdc001"
              type="text"
              class="under_input"
              style="min-width: 500px;"
            /> -->
            <span class="under_input">{{ form.bdc001 }}</span>
          </th>
        </tr>
      </table>

      <!-- 电梯基本参数 -->
      <table
        id="print3"
        v-show="mode == '1'"
        border="1px"
        class="table"
        cellspacing="0"
      >
        <tr>
          <th colspan="4" style="background: rgba(116, 117, 155, .5);">
            电梯基本参数
          </th>
        </tr>

        <tr>
          <td width="30px">1</td>
          <td width="150px">电梯类型</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc011">
              <el-radio label="乘客梯">乘客电梯</el-radio>
              <el-radio label="货梯">载货电梯</el-radio>
              <el-radio label="别墅梯">家用电梯</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td width="30px">2</td>
          <td width="100px">机房类型</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc012">
              <el-radio label="MMR">有机房</el-radio>
              <el-radio label="MRL">无机房</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td width="30px">3</td>
          <td width="100px">主参数</td>
          <td colspan="2">
            <span class="gt-m-r-30"
              >载重量
              <!-- <input
                :disabled="true"
                v-model="form.bdc013"
                type="text"
                class="under_input"
              /> -->
              <span class="under_input">{{ form.bdc013 }}</span>

              Kg</span
            >
            速度
            <!-- <input
              :disabled="true"
              v-model="form.bdc13A"
              type="text"
              class="under_input"
            /> -->
            <span class="under_input">{{ form.bdc13A }}</span>

            m/s
          </td>
        </tr>

        <tr>
          <td width="30px" rowspan="3">4</td>
          <td width="100px" rowspan="3">电梯数量</td>
          <td colspan="2">
            <!-- <input
              :disabled="true"
              v-model="form.bdc014"
              type="text"
              class="under_input"
              style="width: 50px;"
            /> -->
            <span class="under_input">{{ form.bdc014 }}</span>

            台 （如配置上的差异，请再填一份此参数）
          </td>
        </tr>
        <tr>
          <td colspan="2">
            是否群控：<el-radio
              :disabled="true"
              v-model="form.bdc14A"
              label="是"
              >是</el-radio
            ><span
              >，梯间关系：
              <!-- <input
                v-if="form.bdc14A == '是'"
                :disabled="true"
                v-model="form.bdc14B"
                class="under_input"
                style="min-width: 500px;"
            /> -->
              <span class="under_input" v-if="form.bdc14A == '是'">{{
                form.bdc14B
              }}</span>
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio
              :disabled="true"
              v-model="form.bdc14A"
              style="margin-left: 80px"
              label="无"
              >否</el-radio
            >
          </td>
        </tr>

        <tr>
          <td>5</td>
          <td>供电电压</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc015">
              <el-radio label="220V">单项AC220V</el-radio>
              <el-radio label="380V">三相AC380V</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td rowspan="5">
            6
          </td>
          <td rowspan="5">层站</td>
          <td colspan="2">
            <!-- <input
              :disabled="true"
              v-model="form.bdc016"
              type="text"
              class="under_input"
              style="width: 50px;"
            /> -->
            <span class="under_input">{{ form.bdc016 }}</span>

            层
            <!-- <input
              :disabled="true"
              v-model="form.bdc16A"
              type="text"
              class="under_input"
              style="width: 50px;"
            /> -->
            <span class="under_input">{{ form.bdc16A }}</span>

            站
            <!-- <input
              :disabled="true"
              v-model="form.bdc16B"
              type="text"
              class="under_input"
              style="width: 50px;"
            /> -->
            <span class="under_input">{{ form.bdc16B }}</span>

            厅门
          </td>
        </tr>
        <tr>
          <td colspan="2">
            轿门数量：
            <!-- <input
              :disabled="true"
              v-model="form.bdc16C"
              type="text"
              class="under_input"
              style="width: 50px;"
            /> -->
            <span class="under_input">{{ form.bdc16C }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            消防楼层：
            <!-- <input
              :disabled="true"
              v-model="form.bdc16D"
              type="text"
              class="under_input"
              style="width: 50px;"
            /> -->
            <span class="under_input">{{ form.bdc16D }}</span>

            基站楼层：
            <!-- <input
              :disabled="true"
              v-model="form.bdc16E"
              type="text"
              class="under_input"
              style="width: 50px;"
            /> -->
            <span class="under_input">{{ form.bdc16E }}</span>

            出口楼层：
            <!-- <input
              :disabled="true"
              v-model="form.bdc16F"
              type="text"
              class="under_input"
              style="width: 50px;"
            /> -->
            <span class="under_input">{{ form.bdc16F }}</span>

            （标配带凸出⭐图案按钮）
          </td>
        </tr>
        <tr>
          <td colspan="2">
            前门服务层：
            <!-- <input
              :disabled="true"
              v-model="form.bdc16G"
              type="text"
              class="under_input"
              style="width: 100px;"
            /> -->
            <span class="under_input">{{ form.bdc16G }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            后门服务层：
            <!-- <input
              :disabled="true"
              v-model="form.bdc16H"
              type="text"
              class="under_input"
              style="width: 100px;"
            /> -->
            <span class="under_input">{{ form.bdc16H }}</span>
          </td>
        </tr>

        <tr>
          <td rowspan="2">7</td>
          <td rowspan="2">值班室对讲主机配置</td>
          <td colspan="2">
            <el-radio :disabled="true" v-model="form.bdc017" label="单局" />：
            <!-- <input
              v-if="form.bdc017 == '单局'"
              :disabled="true"
              v-model="form.bdc17A"
              type="text"
              class="under_input"
              style="width: 500px; text-align: left;"
            /> -->
            <span class="under_input" v-if="form.bdc017 == '单局'">{{
              form.bdc17A
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio :disabled="true" v-model="form.bdc017" label="多局" />：
            <!-- <input
              v-if="form.bdc017 == '多局'"
              :disabled="true"
              v-model="form.bdc17A"
              type="text"
              class="under_input"
              style="width: 500px; text-align: left;"
            /> -->
            <span class="under_input" v-if="form.bdc017 == '多局'">{{
              form.bdc17A
            }}</span>
          </td>
        </tr>

        <tr>
          <td rowspan="5">8</td>
          <td rowspan="5">开门方式</td>
          <td colspan="2">
            <el-radio
              :disabled="true"
              v-model="form.bdc018"
              label="自动门控制"
            />，请填写以下参数：
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding-left: 30px">
            门机生产厂家：
            <!-- <input
              v-if="form.bdc018 == '自动门控制'"
              :disabled="true"
              v-model="form.bdc18A"
              type="text"
              class="under_input"
              style="width: 150px;"
            /> -->
            <span class="under_input" v-if="form.bdc018 == '自动门控制'">{{
              form.bdc18A
            }}</span>

            型号：
            <!-- <input
              v-if="form.bdc018 == '自动门控制'"
              :disabled="true"
              v-model="form.bdc18B"
              type="text"
              class="under_input"
              style="width: 200px;"
            /> -->
            <span class="under_input" v-if="form.bdc018 == '自动门控制'">{{
              form.bdc18B
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding-left: 30px">
            门机驱动器生产厂家：
            <!-- <input
              v-if="form.bdc018 == '自动门控制'"
              :disabled="true"
              v-model="form.bdc18C"
              type="text"
              class="under_input"
              style="width: 150px;"
            /> -->
            <span class="under_input" v-if="form.bdc018 == '自动门控制'">{{
              form.bdc18C
            }}</span>

            型号：
            <!-- <input
              v-if="form.bdc018 == '自动门控制'"
              :disabled="true"
              v-model="form.bdc18D"
              type="text"
              class="under_input"
              style="width: 200px;"
            /> -->
            <span class="under_input" v-if="form.bdc018 == '自动门控制'">{{
              form.bdc18D
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio
              :disabled="true"
              v-model="form.bdc018"
              label="手拉门控制器"
            />，请填写下边参数：
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio :disabled="true" v-model="form.bdc18E" label="机械门刀" />
            <el-radio :disabled="true" v-model="form.bdc18E" label="电磁门刀" />
            （门刀供电电压
            <!-- <input
              v-if="form.bdc18E == '电磁门刀'"
              :disabled="true"
              v-model="form.bdc18F"
              type="text"
              class="under_input"
              style="width: 80px;"
            /> -->
            <span class="under_input" v-if="form.bdc18E == '电磁门刀'">{{
              form.bdc18F
            }}</span>

            V）
          </td>
        </tr>

        <tr>
          <td rowspan="2">9</td>
          <td rowspan="2">称重装置</td>
          <td colspan="2">
            类型：
            <el-radio-group :disabled="true" v-model="form.bdc019">
              <el-radio label="模拟量">模拟量</el-radio>
              <el-radio label="数字量">数字量</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            安装位置：
            <el-radio-group :disabled="true" v-model="form.bdc19A">
              <el-radio label="轿厢底部">轿厢底部</el-radio>
              <el-radio label="轿厢顶部">轿厢顶部</el-radio>
              <el-radio label="主机机架绳头">主机机架绳头</el-radio>
              <el-radio label="轿架上梁">轿架上梁</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td rowspan="3">10</td>
          <td rowspan="3">限速器</td>
          <td>类型：</td>
          <td>
            <el-radio-group :disabled="true" v-model="form.bdc020">
              <el-radio label="轿厢限速器">轿厢限速器</el-radio>
              <el-radio label="对重限速器">对重限速器</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td rowspan="2">复位方式：</td>
          <td>
            <el-radio :disabled="true" v-model="form.bdc20A" label="手动复位"
              >手动复位</el-radio
            >
          </td>
        </tr>
        <tr>
          <td>
            <el-radio :disabled="true" v-model="form.bdc20A" label="电磁铁复位"
              >电磁铁复位</el-radio
            >
            （复位电压：
            <el-radio-group
              v-if="form.bdc20A == '电磁铁复位'"
              :disabled="true"
              v-model="form.bdc20B"
            >
              <el-radio label="AC220V">AC220V</el-radio>
              <el-radio label="DC24V">DC24V</el-radio> </el-radio-group
            >）
          </td>
        </tr>

        <tr>
          <td rowspan="2">11</td>
          <td rowspan="2">通话配置</td>
          <td colspan="2">
            <el-radio
              :disabled="true"
              v-model="form.bdc021"
              label="监控室（电话）、机房、轿厢、轿顶、底坑（默认配置，电话线只提供至机房。如需配置至监控室或其他位置，请在非标需求上注明"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio
              :disabled="true"
              v-model="form.bdc021"
              label="一键通话（有线电话，布置在轿厢COP）"
            />
          </td>
        </tr>

        <tr>
          <td>12</td>
          <td>轿内IC卡功能</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc022">
              <el-radio label="无">不需要</el-radio>
              <el-radio label="有">需要</el-radio>
            </el-radio-group>
            <span
              >（注：分层控制：
              <el-radio-group
                v-if="form.bdc022 == '有'"
                :disabled="true"
                v-model="form.bdc22A"
              >
                <el-radio label="有">是</el-radio>
                <el-radio label="无">否</el-radio> </el-radio-group
              >）</span
            >
          </td>
        </tr>

        <tr>
          <td>13</td>
          <td>语音报站钟（轿顶）</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc023">
              <el-radio label="有">需要</el-radio>
              <el-radio label="无">不需要</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>14</td>
          <td>再平层功能</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc024">
              <el-radio label="有">需要</el-radio>
              <el-radio label="无">不需要</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>15</td>
          <td>ARD功能</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc025">
              <el-radio label="有">需要</el-radio>
              <el-radio label="无">不需要</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>16</td>
          <td>静音接触器</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc026">
              <el-radio label="有">需要</el-radio>
              <el-radio label="无">不需要</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>17</td>
          <td>包装</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc027">
              <el-radio label="国内木箱" />
              <el-radio label="出口木箱" />
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>18</td>
          <td>唛头要求</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc028">
              <el-radio label="与项目名称相同（默认）" />
              <el-radio label="其他" />
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>19</td>
          <td>缓冲器开关数量</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc029">
              <el-radio label="0" />
              <el-radio label="2" />
              <el-radio label="4" />
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>20</td>
          <td>轿顶安全开关</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc030">
              <el-radio label="安全窗开关" />
              <el-radio label="轿厢锁定开关" />
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>21</td>
          <td>控制柜制作方</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc031">
              <el-radio label="卓梅尼" />
              <el-radio label="虏克" />
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td colspan="4">其他非标需求</td>
        </tr>
        <tr>
          <td>1</td>
          <td colspan="3">
            <!-- <input
              :disabled="true"
              v-model="form.bdc32A"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            /> -->
            <span class="under_input">{{ form.bdc32A }}</span>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td colspan="3">
            <!-- <input
              :disabled="true"
              v-model="form.bdc32B"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            /> -->
            <span class="under_input">{{ form.bdc32B }}</span>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td colspan="3">
            <!-- <input
              :disabled="true"
              v-model="form.bdc32C"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            /> -->
            <span class="under_input">{{ form.bdc32C }}</span>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td colspan="3">
            <!-- <input
              :disabled="true"
              v-model="form.bdc32D"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            /> -->
            <span class="under_input">{{ form.bdc32D }}</span>
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td colspan="3">
            <!-- <input
              :disabled="true"
              v-model="form.bdc32E"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            /> -->
            <span class="under_input">{{ form.bdc32E }}</span>
          </td>
        </tr>
      </table>

      <!-- 人机界面 -->
      <table
        id="print4"
        v-show="mode == '2'"
        border="1px"
        class="table"
        cellspacing="0"
      >
        <tr>
          <th colspan="4" style="background: rgba(116, 117, 155, .5);">
            人机界面
          </th>
        </tr>

        <tr>
          <td width="30px" rowspan="2">1</td>
          <td width="150px" rowspan="2">操控箱数量</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc041">
              <el-radio label="主操纵箱">主操纵箱</el-radio>
              <el-radio label="配副操纵箱">配副操纵箱</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc41A">
              <el-radio label="配残疾人操纵箱">配残疾人操纵箱</el-radio>
            </el-radio-group>
            （<el-radio-group :disabled="true" v-model="form.bdc41B">
              <el-radio label="壁挂式">壁挂式</el-radio>
              <el-radio label="嵌入式）面板材质：发纹不锈钢"
                >嵌入式</el-radio
              > </el-radio-group
            >） 面板材质：
            <!-- <input
              :disabled="true"
              v-model="form.bdc32D"
              type="text"
              class="under_input"
              style="min-width: 200px;text-align: left"
            /> -->
            <span class="under_input">{{ form.bdc32D }}</span>
          </td>
        </tr>

        <tr>
          <td width="30px">2</td>
          <td width="150px">一体式COP制作方</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc042">
              <el-radio label="卓梅尼">卓梅尼</el-radio>
              <el-radio label="虏克">虏克</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td width="30px" rowspan="9">3</td>
          <td width="150px" style="background: rgba(116, 117, 155, .5);">
            主操纵箱类型
          </td>
          <td colspan="2" />
        </tr>
        <tr>
          <td rowspan="3">
            液晶显示屏
          </td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc43A">
              <el-radio label="红色LED">红色LED</el-radio>
              <el-radio label="5.7寸蓝白STN_LCD">5.7寸蓝白STN_LCD</el-radio>
              <el-radio label="7寸蓝白STN_LCD">7寸蓝白STN_LCD</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc43A">
              <el-radio label="7寸真彩TFT_LCD">7寸真彩TFT_LCD</el-radio>
              <el-radio label="8.4寸多媒体显示">8.4寸多媒体显示</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc43A">
              <el-radio label="10.4寸多媒体显示">10.4寸多媒体显示</el-radio>
              <el-radio label="12.1寸多媒体显示">12.1寸多媒体显示</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>
            按钮
          </td>
          <td colspan="2">
            <span style="padding-right: 30px">
              型号：
              <!-- <input
                :disabled="true"
                v-model="form.bdc43B"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /> -->
              <span class="under_input">{{ form.bdc43B }}</span>
            </span>

            <span style="padding-right: 30px">
              材质：
              <!-- <input
                :disabled="true"
                v-model="form.bdc43C"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /> -->
              <span class="under_input">{{ form.bdc43C }}</span>
            </span>

            <span style="padding-right: 30px">
              发光颜色：
              <!-- <input
                :disabled="true"
                v-model="form.bdc43D"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /> -->
              <span class="under_input">{{ form.bdc43D }}</span>
            </span>

            <el-radio-group :disabled="true" v-model="form.bdc43E">
              <el-radio label="红色LED">盲文按钮</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td rowspan="4">
            安装方式
          </td>
          <td colspan="1" width="200px">
            <el-radio-group :disabled="true" v-model="form.bdc43F">
              <el-radio label="壁挂旋转式">壁挂旋转式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            <el-radio-group
              v-if="form.bdc43F == '壁挂旋转式'"
              :disabled="true"
              v-model="form.bdc43G"
            >
              <el-radio label="COP-LU11">COP-LU11</el-radio>
              <el-radio label="COP-LU12">COP-LU12</el-radio>
              <el-radio label="COP-LU08">COP-LU08</el-radio>
              <el-radio label="COP-LU09">COP-LU09</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="1">
            <el-radio-group :disabled="true" v-model="form.bdc43F">
              <el-radio label="一体式">一体式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            面板材质：
            <!-- <input
              v-if="form.bdc43F == '一体式'"
              :disabled="true"
              v-model="form.bdc43G"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            /> -->
            <span class="under_input" v-if="form.bdc43F == '一体式'">{{
              form.bdc43G
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="1">
            <el-radio-group :disabled="true" v-model="form.bdc43F">
              <el-radio label="嵌入式">嵌入式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            面板材质：
            <!-- <input
              v-if="form.bdc43F == '嵌入式'"
              :disabled="true"
              v-model="form.bdc43G"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            /> -->
            <span class="under_input" v-if="form.bdc43F == '嵌入式'">{{
              form.bdc43G
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="1">
            <el-radio-group :disabled="true" v-model="form.bdc43F">
              <el-radio label="长条式">长条式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            面板材质：
            <!-- <input
              v-if="form.bdc43F == '长条式'"
              :disabled="true"
              v-model="form.bdc43G"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            /> -->
            <span class="under_input" v-if="form.bdc43F == '长条式'">{{
              form.bdc43G
            }}</span>
          </td>
        </tr>

        <tr>
          <td width="30px" rowspan="9">4</td>
          <td width="150px" style="background: rgba(116, 117, 155, .5);">
            副操纵箱类型
          </td>
          <td colspan="2" />
        </tr>
        <tr>
          <td rowspan="3">
            液晶显示屏
          </td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc44A">
              <el-radio label="红色LED">红色LED</el-radio>
              <el-radio label="5.7寸蓝白STN_LCD">5.7寸蓝白STN_LCD</el-radio>
              <el-radio label="7寸蓝白STN_LCD">7寸蓝白STN_LCD</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc44A">
              <el-radio label="7寸真彩TFT_LCD">7寸真彩TFT_LCD</el-radio>
              <el-radio label="8.4寸多媒体显示">8.4寸多媒体显示</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc44A">
              <el-radio label="10.4寸多媒体显示">10.4寸多媒体显示</el-radio>
              <el-radio label="12.1寸多媒体显示">12.1寸多媒体显示</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>
            按钮
          </td>
          <td colspan="2">
            <span style="padding-right: 30px">
              型号：
              <!-- <input
                :disabled="true"
                v-model="form.bdc44B"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /> -->
              <span class="under_input">{{ form.bdc44B }}</span>
            </span>

            <span style="padding-right: 30px">
              材质：
              <!-- <input
                :disabled="true"
                v-model="form.bdc44C"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /> -->
              <span class="under_input">{{ form.bdc44C }}</span>
            </span>

            <span style="padding-right: 30px">
              发光颜色：
              <!-- <input
                :disabled="true"
                v-model="form.bdc44D"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /> -->
              <span class="under_input">{{ form.bdc44D }}</span>
            </span>

            <el-radio-group :disabled="true" v-model="form.bdc44E">
              <el-radio label="红色LED">盲文按钮</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td rowspan="4">
            安装方式
          </td>
          <td colspan="1" width="200px">
            <el-radio-group :disabled="true" v-model="form.bdc44F">
              <el-radio label="壁挂旋转式">壁挂旋转式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            <el-radio-group
              v-if="form.bdc44F == '壁挂旋转式'"
              :disabled="true"
              v-model="form.bd44G"
            >
              <el-radio label="COP-LU11">COP-LU11</el-radio>
              <el-radio label="COP-LU12">COP-LU12</el-radio>
              <el-radio label="COP-LU08">COP-LU08</el-radio>
              <el-radio label="COP-LU09">COP-LU09</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="1">
            <el-radio-group :disabled="true" v-model="form.bdc44F">
              <el-radio label="一体式">一体式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            面板材质：
            <!-- <input
              v-if="form.bdc44F == '一体式'"
              :disabled="true"
              v-model="form.bdc44G"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            /> -->
            <span class="under_input" v-if="form.bdc44F == '一体式'">{{
              form.bdc44G
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="1">
            <el-radio-group :disabled="true" v-model="form.bdc44F">
              <el-radio label="嵌入式">嵌入式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            面板材质：
            <!-- <input
              v-if="form.bdc44F == '嵌入式'"
              :disabled="true"
              v-model="form.bdc44G"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            /> -->
            <span class="under_input" v-if="form.bdc44F == '嵌入式'">{{
              form.bdc44G
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="1">
            <el-radio-group :disabled="true" v-model="form.bdc44F">
              <el-radio label="长条式">长条式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            面板材质：
            <!-- <input
              v-if="form.bdc44F == '长条式'"
              :disabled="true"
              v-model="form.bdc44G"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            /> -->
            <span class="under_input" v-if="form.bdc44F == '长条式'">{{
              form.bdc44G
            }}</span>
          </td>
        </tr>

        <tr>
          <td>5</td>
          <td>第三方标志</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc045">
              <el-radio label="无">不需要</el-radio> </el-radio-group
            >（默认配置虏克logo）
            <el-radio-group :disabled="true" v-model="form.bdc045">
              <el-radio label="有">需要</el-radio>
            </el-radio-group>
            显示内容：
            <!-- <input
              v-if="form.bdc045 == '有'"
              :disabled="true"
              v-model="form.bdc45A"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            /> -->
            <span class="under_input" v-if="form.bdc045 == '有'">{{
              form.bdc45A
            }}</span>
          </td>
        </tr>

        <tr>
          <td rowspan="5">6</td>
          <td style="background: rgba(116, 117, 155, .5);">召唤盒</td>
        </tr>
        <tr>
          <td>显示屏</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc46A">
              <el-radio label="红色LED">红色LED</el-radio>
              <el-radio label="4.3寸蓝白STN_LCD">4.3寸蓝白STN_LCD</el-radio>
              <el-radio label="4.3寸TFT_LCD">4.3寸TFT_LCD</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>
            按钮
          </td>
          <td colspan="2">
            <span style="padding-right: 30px">
              型号：
              <!-- <input
                :disabled="true"
                v-model="form.bdc46B"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /> -->
              <span class="under_input">{{ form.bdc46B }}</span>
            </span>

            <span style="padding-right: 30px">
              材质：
              <!-- <input
                :disabled="true"
                v-model="form.bdc46C"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /> -->
              <span class="under_input">{{ form.bdc46C }}</span>
            </span>

            <span style="padding-right: 30px">
              发光颜色：
              <!-- <input
                :disabled="true"
                v-model="form.bdc46D"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /> -->
              <span class="under_input">{{ form.bdc46D }}</span>
            </span>

            <el-radio-group :disabled="true" v-model="form.bdc46E">
              <el-radio label="红色LED">盲文按钮</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td rowspan="2">
            安装方式
          </td>
          <td colspan="1" width="200px">
            <el-radio-group :disabled="true" v-model="form.bdc46G">
              <el-radio label="薄型壁挂式">薄型壁挂式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            <el-radio-group
              v-if="form.bdc46G == '薄型壁挂式'"
              :disabled="true"
              v-model="form.bdc46F"
            >
              <el-radio label="LIOP-LUL11">LIOP-LUL11</el-radio>
              <el-radio label="LIOP-LUL15">LIOP-LUL15</el-radio>
              <el-radio label="LIOP-LUL05">LIOP-LUL05</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc46G">
              <el-radio label="带底盒嵌入式">带底盒嵌入式</el-radio>
            </el-radio-group>
            面板材质：
            <!-- <input
              v-if="form.bdc46G == '带底盒嵌入式'"
              :disabled="true"
              v-model="form.bdc46F"
              type="text"
              class="under_input"
              style="min-width: 150px;text-align: left"
            /> -->
            <span v-if="form.bdc46G == '带底盒嵌入式'" class="under_input">{{
              form.bdc46F
            }}</span>
          </td>
        </tr>

        <tr>
          <td>7</td>
          <td>基站带基站锁</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc047">
              <el-radio label="无">不需要</el-radio>
              <el-radio label="有"> 需要</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>8</td>
          <td>第三方标志</td>
          <td colspan="2">
            <el-radio-group :disabled="true" v-model="form.bdc048">
              <el-radio label="无">不需要</el-radio> </el-radio-group
            >（默认配置虏克logo）
            <el-radio-group :disabled="true" v-model="form.bdc048">
              <el-radio label="有">需要</el-radio>
            </el-radio-group>
            显示内容：
            <!-- <input
              v-if="form.bdc048 == '有'"
              :disabled="true"
              v-model="form.bdc48A"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            /> -->
            <span v-if="form.bdc048 == '有'" class="under_input">{{
              form.bdc48A
            }}</span>
          </td>
        </tr>

        <tr>
          <td colspan="4">其他非标需求</td>
        </tr>
        <tr>
          <td>1</td>
          <td colspan="3">
            <!-- <input
              :disabled="true"
              v-model="form.bdc49A"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            /> -->
            <span class="under_input">{{ form.bdc49A }}</span>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td colspan="3">
            <!-- <input
              :disabled="true"
              v-model="form.bdc49B"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            /> -->
            <span class="under_input">{{ form.bdc49B }}</span>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td colspan="3">
            <!-- <input
              :disabled="true"
              v-model="form.bdc49C"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            /> -->
            <span class="under_input">{{ form.bdc49C }}</span>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td colspan="3">
            <!-- <input
              :disabled="true"
              v-model="form.bdc49D"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            /> -->
            <span class="under_input">{{ form.bdc49D }}</span>
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td colspan="3">
            <!-- <input
              :disabled="true"
              v-model="form.bdc49E"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            /> -->
            <span class="under_input">{{ form.bdc49E }}</span>
          </td>
        </tr>
        <tr>
          <td>6</td>
          <td colspan="3">
            <!-- <input
              :disabled="true"
              v-model="form.bdc49F"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            /> -->
            <span class="under_input">{{ form.bdc49F }}</span>
          </td>
        </tr>
      </table>

      <table id="print5" border="1px" class="table" cellspacing="0">
        <tr>
          <th colspan="2" style="background: rgba(116, 117, 155, .5);">
            其他参数
          </th>
        </tr>
        <tr>
          <td>变频器选型电流A（转换值）</td>
          <td style="min-width: 400px;">
            <!-- <input
              :disabled="true"
              v-model="form.bdc050"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            /> -->
            <span class="under_input">{{ form.bdc050 }}</span>
          </td>
        </tr>
        <tr>
          <td>曳引机实际额定电流A</td>
          <td>
            <!-- <input
              :disabled="true"
              v-model="form.bdc051"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            /> -->
            <span class="under_input">{{ form.bdc051 }}</span>
          </td>
        </tr>
        <tr>
          <td>曳引机功率KW</td>
          <td>
            <!-- <input
              :disabled="true"
              v-model="form.bdc052"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            /> -->
            <span class="under_input">{{ form.bdc052 }}</span>
          </td>
        </tr>
        <tr>
          <td>井道宽度</td>
          <td>
            <!-- <input
              :disabled="true"
              v-model="form.bdc053"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            /> -->
            <span class="under_input">{{ form.bdc053 }}</span>
          </td>
        </tr>
        <tr>
          <td>井道深度</td>
          <td>
            <!-- <input
              :disabled="true"
              v-model="form.bdc054"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            /> -->
            <span class="under_input">{{ form.bdc054 }}</span>
          </td>
        </tr>
        <tr>
          <td>轿厢高度</td>
          <td>
            <!-- <input
              :disabled="true"
              v-model="form.bdc055"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            /> -->
            <span class="under_input">{{ form.bdc055 }}</span>
          </td>
        </tr>
        <tr>
          <td>顶层高度M</td>
          <td>
            <!-- <input
              :disabled="true"
              v-model="form.bdc056"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            /> -->
            <span class="under_input">{{ form.bdc056 }}</span>
          </td>
        </tr>
        <tr>
          <td>底坑深度M</td>
          <td>
            <!-- <input
              :disabled="true"
              v-model="form.bdc057"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            /> -->
            <span class="under_input">{{ form.bdc057 }}</span>
          </td>
        </tr>
        <tr>
          <td>层高M</td>
          <td>
            <!-- <input
              :disabled="true"
              v-model="form.bdc058"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            /> -->
            <span class="under_input">{{ form.bdc058 }}</span>
          </td>
        </tr>
        <tr>
          <td>提升高度</td>
          <td>
            <!-- <input
              :disabled="true"
              v-model="form.bdc059"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            /> -->
            <span class="under_input">{{ form.bdc059 }}</span>
          </td>
        </tr>
        <tr>
          <td>井道总高</td>
          <td>
            <!-- <input
              :disabled="true"
              v-model="form.bdc060"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            /> -->
            <span class="under_input">{{ form.bdc060 }}</span>
          </td>
        </tr>
      </table>

      <div style="margin-top: 20px;display: flex; justify-content: flex-end;">
        <el-button type="primary" round @click="goBack">返回</el-button>
      </div>
    </card>
  </div>
</template>

<script>
  import UnderInput from '@/components/UnderInput/UnderInput.vue'
  import Card from '@/components/Card/Card'
  import { getSaleData } from '@/api/sale.js'
  export default {
    components: {
      UnderInput,
      Card,
    },
    data() {
      return {
        mode: '1',
        pickerOptions: {
          shortcuts: [
            {
              text: '昨天',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              },
            },
            {
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date())
              },
            },
            {
              text: '明天',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24)
                picker.$emit('pick', date)
              },
            },
          ],
        },
        form: {
          bdcId: '', // ID
          bdc001: '', // 项目编号
          bdc002: '', // 项目名称
          bdc003: '', // 版本号
          bdc004: '', // 梯号
          bdc005: '', // 客户名称
          bdc006: '', // 订单日期

          bdc011: '', // 电梯类型
          bdc012: '', // 机房类型
          bdc013: '', // 载重量/KG
          bdc13A: '', // 速度M/S
          bdc014: '', // 电梯数量
          bdc14A: '', // 是否群控
          bdc14B: '', // 梯间关系
          bdc015: '', // 供电电压
          bdc016: '', // 层
          bdc16A: '', // 站
          bdc16B: '', // 门
          bdc16C: '', // 轿门数量
          bdc16D: '', // 消防楼层
          bdc16E: '', // 基站楼层
          bdc16F: '', // 出口楼层
          bdc16G: '', // 前门服务层
          bdc16H: '', // 后门服务层
          bdc017: '', // 值班对讲主机配制
          bdc17A: '', // 对讲机内容
          bdc018: '', // 门控制
          bdc18A: '', // 门机生产厂家
          bdc18B: '', // 门机生产型号
          bdc18C: '', // 门机驱动厂家
          bdc18D: '', // 门机驱动型号
          bdc18E: '', // 手拉门类型
          bdc18F: '', // 手拉门电磁电压
          bdc019: '', // 称重装置类型
          bdc19A: '', // 称重安装位置
          bdc020: '', // 限速器类别
          bdc20A: '', // 限速器复位方式
          bdc20B: '', // 限速器复位电压

          bdc021: '', // 通话配制
          bdc022: '', // 轿内IC卡功能
          bdc22A: '', // 分层控制
          bdc023: '', // 语音报站(轿顶)
          bdc024: '', // 再平层功能
          bdc025: '', // ARD功能
          bdc026: '', // 静音接触器
          bdc027: '', // 包装
          bdc028: '', // 唛头要求
          bdc029: '', // 缓冲器开关数量
          bdc030: '', // 轿顶安全开关
          bdc031: '', // 控制柜制作方
          bdc032: '', // 非标自定义
          bdc32A: '', // 自定义栏位1
          bdc32B: '', // 自定义栏位2
          bdc32C: '', // 自定义栏位3
          bdc32D: '', // 自定义栏位4
          bdc32E: '', // 自定义栏位5
          bdc32F: '', // 自定义栏位6
          bdc041: '', // 有无主操纵箱
          bdc41A: '', // 有无副操纵箱
          bdc41B: '', // 有无配残疾人操纵箱
          bdc41C: '', // 残疾人操纵箱类型（壁挂式和嵌入式）
          bdc41D: '', // 残疾人操纵箱面板材质
          bdc042: '', // Cop制作方
          bdc043: '', // 主操作箱类型
          bdc43A: '', // 液晶显示屏
          bdc43B: '', // 按钮型号
          bdc43C: '', // 按钮材质
          bdc43D: '', // 按钮颜色
          bdc43E: '', // 按钮类型
          bdc43F: '', // 安装方式
          bdc43G: '', // 面板材质
          bdc044: '', // 副操作箱类型
          bdc44A: '', // 副液晶显示屏
          bdc44B: '', // 副按钮型号
          bdc44C: '', // 副按钮材质
          bdc44D: '', // 副按钮颜色
          bdc44E: '', // 副按钮类型
          bdc44F: '', // 副安装方式
          bdc44G: '', // 副面板材质
          bdc045: '', // 副第三方标志
          bdc45A: '', // 副第三方标志内容

          bdc046: '', // 召唤盒
          bdc46A: '', // 召唤盒显示屏
          bdc46B: '', // 召唤盒按钮型号
          bdc46C: '', // 召唤盒按钮材质
          bdc46D: '', // 召唤盒按钮颜色
          bdc46E: '', // 召唤盒按钮类型

          bdc46F: '', // 召唤盒安装方式
          bdc46G: '', // 召唤盒面板材质
          bdc047: '', // 基站带锁
          bdc048: '', // 召第三方标志
          bdc48A: '', // 召第三方标志内容
          bdc049: '', // 非标自定义
          bdc49A: '', // 非标栏位1
          bdc49B: '', // 非标栏位2
          bdc49C: '', // 非标栏位3
          bdc49D: '', // 非标栏位4
          bdc49E: '', // 非标栏位5
          bdc49F: '', // 非标栏位6

          bdc050: '', //变频器选型电流A（转换值） ,
          bdc051: '', //曳引机实际额定电流A ,
          bdc052: '', //曳引机功率KW ,
          bdc053: '', //井道宽度M ,
          bdc054: '', //井道深度M ,
          bdc055: '', //轿厢高度M ,
          bdc056: '', //顶层高度M ,
          bdc057: '', //底坑深度M ,
          bdc058: '', //层高M ,
          bdc059: '', //提升高度 ,
          bdc060: '', //井道总高 ,

          bdc070: '', //确认否 ,
          bdcacti: '', //数据有效码 ,
          bdcplant: '', //厂区 ,
          bdccuser: '', //建档人员 ,
          bdccdate: '', //建檔日期 ,
          bdcmuser: '', //修改人员 ,
          bdcmdate: '', //修改日期
        },
        input: '',
        textarea: '',
        currentPage: 1,
      }
    },
    mounted() {
      if (this.$route.query.bdc001) {
        this.getData(this.$route.query.bdc001, this.$route.query.bdc004)
      }
      this.currentPage = this.$route.query.currentPage
    },
    methods: {
      // 根据项目编号获取数据
      async getData(bdc001, bdc004) {
        const res = await getSaleData({
          bdc001: bdc001,
          bdc002: '',
          bdc004: bdc004,
          CurrentPage: 1,
          PageSize: 1,
        })
        this.form = Object.assign({}, res.rows[0])
        this.form.bdc029 =
          typeof this.form.bdc029 == 'number' ? this.form.bdc029.toString() : ''
      },
      // 返回列表页
      goBack() {
        this.$router.replace({
          path: '/configure/configure-list',
          query: { currentPage: this.currentPage },
        })
      },

      onPrint() {
        let doms = []
        for (let i = 0; i < 5; i++) {
          doms[i] = document.getElementById(`print${i + 1}`)
        }
        // let subOutputRankPrint = document.getElementById('print')
        // console.log(subOutputRankPrint.innerHTML)
        // let newContent = subOutputRankPrint.innerHTML
        let newContent = ''
        doms.forEach((i) => {
          newContent += i.outerHTML
        })
        let oldContent = document.body.innerHTML
        document.body.innerHTML = newContent
        window.print()
        window.location.reload()
        document.body.innerHTML = oldContent
        return false
      },
    },
  }
</script>

<style lang="scss" scoped>
  #page::v-deep .el-col {
    padding-right: 10px;
  }
  #page::v-deep .el-radio__input.is-disabled + span.el-radio__label,
  #page::v-deep .el-radio__input.is-disabled .el-radio__inner,
  .el-radio__input.is-disabled.is-checked .el-radio__inner {
    color: black;
  }
  #page::v-deep
    .el-radio__input.is-disabled.is-checked
    .el-radio__inner::after {
    background: black;
  }
  #page::v-deep input:disabled {
    background: #ffffff;
    color: black;
  }
  #page::v-deep td,
  th {
    padding: 4px;
  }
  .tableName {
    font-size: 28px;
    line-height: 42px;
    margin: 10px 0;
  }
  .title {
    font-size: 12px;
    color: #808695;
    font-weight: 600;
  }
  .table {
    width: 100%;
  }
  .under_input {
    border: 1px solid #888888;
    border-top-style: none;
    border-left-style: none;
    border-right-style: none;
    color: #606266;
    padding: 2px;
    text-align: center;
    &:focus {
      outline: none;
    }
  }
  .header {
    position: fixed;
    background: #ffffff;
    top: 50px;
    z-index: 999;
  }
  @for $i from 1 through 5 {
    #print#{$i} {
      // 谷歌
      -webkit-print-color-adjust: exact;
      //解决火狐浏览器打印
      print-color-adjust: exact;
      color-adjust: exact;

      &::v-deep .el-radio__input.is-disabled + span.el-radio__label,
      &::v-deep .el-radio__input.is-disabled .el-radio__inner,
      .el-radio__input.is-disabled.is-checked .el-radio__inner {
        color: black;
      }

      &::v-deep input:disabled {
        background: #ffffff;
        color: black;
      }

      &::v-deep
        .el-radio__input.is-disabled.is-checked
        .el-radio__inner::after {
        background: black;
      }
    }
  }
</style>

<style media="print" type="text/css">
  /* .Noprint {
    display: none;
  } */
  @page {
    undefinedsize: auto;
    margin: 5mm;
  }
</style>
