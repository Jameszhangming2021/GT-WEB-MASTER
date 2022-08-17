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
            @change="dateChange"
            type="date"
            value-format="yyyy-M-d"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <div style="">
          <el-button
            size="mini"
            round
            type="primary"
            @click="isDialogShow = true"
            >导入配置</el-button
          >
          <!-- <el-button size="mini"
                     type="success"
                     round>导出</el-button> -->
        </div>
      </div>
    </card>
    <card style="margin-top: 60px;">
      <table border="1px" class="table" cellspacing="0">
        <tr>
          <td
            colspan="3"
            style="font-weight: 550; text-align: center;font-size: 24px;"
          >
            GTEC438系统电气配置表-整梯
          </td>
          <td>
            版本号：<input
              v-model="form.bdc003"
              type="text"
              class="under_input"
              style="width: 50px;"
            />
            梯号：
            <input
              v-model="form.bdc004"
              type="text"
              class="under_input"
              style="width: 50px;"
            />
          </td>
        </tr>
      </table>

      <!-- 合并列 colspan  合并行 rowspan -->
      <table border="1px" class="table" cellspacing="0">
        <tr>
          <th colspan="2" style="text-align: center;">项目名称</th>
          <th style="text-align: center;" colspan="2">
            <input
              v-model="form.bdc002"
              type="text"
              class="under_input"
              style="min-width: 500px;"
            />
          </th>
        </tr>
        <tr>
          <th colspan="2" style="text-align: center;">项目编号</th>
          <th style="text-align: center;" colspan="2">
            <input
              v-model="form.bdc001"
              type="text"
              class="under_input"
              style="min-width: 500px;"
            />
          </th>
        </tr>
      </table>

      <!-- 电梯基本参数 -->
      <table v-if="mode == '1'" border="1px" class="table" cellspacing="0">
        <tr>
          <th colspan="4" style="background: rgba(116, 117, 155, .5);">
            电梯基本参数
          </th>
        </tr>

        <tr>
          <td width="30px">1</td>
          <td width="150px" @click="clear('bdc011')" class="pointer">
            电梯类型
          </td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc011">
              <el-radio label="乘客梯">乘客电梯</el-radio>
              <el-radio label="货梯">载货电梯</el-radio>
              <el-radio label="别墅梯">家用电梯</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td width="30px">2</td>
          <td width="100px" @click="clear('bdc012')" class="pointer">
            机房类型
          </td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc012">
              <el-radio label="MMR">有机房</el-radio>
              <el-radio label="MRL">无机房</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td width="30px">3</td>
          <td width="100px" @click="clear('bdc013', 'bdc13A')" class="pointer">
            主参数
          </td>
          <td colspan="2">
            <span class="gt-m-r-30"
              >载重量<input
                v-model="form.bdc013"
                type="text"
                class="under_input"
              />
              Kg</span
            >
            速度<input v-model="form.bdc13A" type="text" class="under_input" />
            m/s
          </td>
        </tr>

        <tr>
          <td width="30px" rowspan="3">4</td>
          <td
            width="100px"
            rowspan="3"
            @click="clear('bdc014', 'bdc14A', 'bdc14B')"
            class="pointer"
          >
            电梯数量
          </td>
          <td colspan="2">
            <input
              v-model="form.bdc014"
              type="text"
              class="under_input"
              style="width: 50px;"
            />台 （如配置上的差异，请再填一份此参数）
          </td>
        </tr>
        <tr>
          <td colspan="2">
            是否群控：<el-radio v-model="form.bdc14A" label="是">是</el-radio
            ><span
              >，梯间关系：<input
                v-if="form.bdc14A == '是'"
                v-model="form.bdc14B"
                class="under_input"
                style="min-width: 500px;"
            /></span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio v-model="form.bdc14A" style="margin-left: 80px" label="无"
              >否</el-radio
            >
          </td>
        </tr>

        <tr>
          <td>5</td>
          <td @click="clear('bdc015')" class="pointer">供电电压</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc015">
              <el-radio label="220V">单项AC220V</el-radio>
              <el-radio label="380V">三相AC380V</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td rowspan="5">
            6
          </td>
          <td
            rowspan="5"
            @click="
              clear(
                'bdc016',
                'bdc16A',
                'bdc16B',
                'bdc16C',
                'bdc16D',
                'bdc16E',
                'bdc16F',
                'bdc16G',
                'bdc16H'
              )
            "
            class="pointer"
          >
            层站
          </td>
          <td colspan="2">
            <input
              v-model="form.bdc016"
              type="text"
              class="under_input"
              style="width: 50px;"
            />层<input
              v-model="form.bdc16A"
              type="text"
              class="under_input"
              style="width: 50px;"
            />站<input
              v-model="form.bdc16B"
              type="text"
              class="under_input"
              style="width: 50px;"
            />厅门
          </td>
        </tr>
        <tr>
          <td colspan="2">
            轿门数量：
            <input
              v-model="form.bdc16C"
              type="text"
              class="under_input"
              style="width: 50px;"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            消防楼层：<input
              v-model="form.bdc16D"
              type="text"
              class="under_input"
              style="width: 50px;"
            />
            基站楼层：<input
              v-model="form.bdc16E"
              type="text"
              class="under_input"
              style="width: 50px;"
            />
            出口楼层：
            <input
              v-model="form.bdc16F"
              type="text"
              class="under_input"
              style="width: 50px;"
            />（标配带凸出⭐图案按钮）
          </td>
        </tr>
        <tr>
          <td colspan="2">
            前门服务层：
            <input
              v-model="form.bdc16G"
              type="text"
              class="under_input"
              style="width: 100px;"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            后门服务层：
            <input
              v-model="form.bdc16H"
              type="text"
              class="under_input"
              style="width: 100px;"
            />
          </td>
        </tr>

        <tr>
          <td rowspan="2">7</td>
          <td rowspan="2" @click="clear('bdc017', 'bdc17A')" class="pointer">
            值班室对讲主机配置
          </td>
          <td colspan="2">
            <el-radio v-model="form.bdc017" label="单局" />：
            <input
              v-if="form.bdc017 == '单局'"
              v-model="form.bdc17A"
              type="text"
              class="under_input"
              style="width: 500px; text-align: left;"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio v-model="form.bdc017" label="多局" />：
            <input
              v-if="form.bdc017 == '多局'"
              v-model="form.bdc17A"
              type="text"
              class="under_input"
              style="width: 500px; text-align: left;"
            />
          </td>
        </tr>

        <tr>
          <td rowspan="5">8</td>
          <td
            rowspan="5"
            @click="
              clear(
                'bdc018',
                'bdc18A',
                'bdc18B',
                'bdc18C',
                'bdc18D',
                'bdc18E',
                'bdc18F'
              )
            "
            class="pointer"
          >
            开门方式
          </td>
          <td colspan="2">
            <el-radio
              v-model="form.bdc018"
              label="自动门控制"
            />，请填写以下参数：
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding-left: 30px">
            门机生产厂家：<input
              v-if="form.bdc018 == '自动门控制'"
              v-model="form.bdc18A"
              type="text"
              class="under_input"
              style="width: 150px;"
            />
            型号：<input
              v-if="form.bdc018 == '自动门控制'"
              v-model="form.bdc18B"
              type="text"
              class="under_input"
              style="width: 200px;"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding-left: 30px">
            门机驱动器生产厂家：<input
              v-if="form.bdc018 == '自动门控制'"
              v-model="form.bdc18C"
              type="text"
              class="under_input"
              style="width: 150px;"
            />
            型号：<input
              v-if="form.bdc018 == '自动门控制'"
              v-model="form.bdc18D"
              type="text"
              class="under_input"
              style="width: 200px;"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio
              v-model="form.bdc018"
              label="手拉门控制器"
            />，请填写下边参数：
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio
              v-model="form.bdc18E"
              :disabled="form.bdc018 != '手拉门控制器'"
              label="机械门刀"
            />
            <el-radio
              v-model="form.bdc18E"
              :disabled="form.bdc018 != '手拉门控制器'"
              label="电磁门刀"
            />
            （门刀供电电压<input
              v-if="form.bdc18E == '电磁门刀'"
              v-model="form.bdc18F"
              type="text"
              class="under_input"
              style="width: 80px;"
            />V）
          </td>
        </tr>

        <tr>
          <td rowspan="2">9</td>
          <td rowspan="2" @click="clear('bdc019', 'bdc19A')" class="pointer">
            称重装置
          </td>
          <td colspan="2">
            类型：
            <el-radio-group v-model="form.bdc019">
              <el-radio label="模拟量">模拟量</el-radio>
              <el-radio label="数字量">数字量</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            安装位置：
            <el-radio-group v-model="form.bdc19A">
              <el-radio label="轿厢底部">轿厢底部</el-radio>
              <el-radio label="轿厢顶部">轿厢顶部</el-radio>
              <el-radio label="主机机架绳头">主机机架绳头</el-radio>
              <el-radio label="轿架上梁">轿架上梁</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td rowspan="3">10</td>
          <td
            rowspan="3"
            @click="clear('bdc020', 'bdc20A', 'bdc20B')"
            class="pointer"
          >
            限速器
          </td>
          <td>类型：</td>
          <td>
            <el-radio-group v-model="form.bdc020">
              <el-radio label="轿厢限速器">轿厢限速器</el-radio>
              <el-radio label="对重限速器">对重限速器</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td rowspan="2">复位方式：</td>
          <td>
            <el-radio v-model="form.bdc20A" label="手动复位">手动复位</el-radio>
          </td>
        </tr>
        <tr>
          <td>
            <el-radio v-model="form.bdc20A" label="电磁铁复位"
              >电磁铁复位</el-radio
            >
            （复位电压：
            <el-radio-group
              v-if="form.bdc20A == '电磁铁复位'"
              v-model="form.bdc20B"
            >
              <el-radio label="AC220V">AC220V</el-radio>
              <el-radio label="DC24V">DC24V</el-radio> </el-radio-group
            >）
          </td>
        </tr>

        <tr>
          <td rowspan="2">11</td>
          <td rowspan="2" @click="clear('bdc021')" class="pointer">通话配置</td>
          <td colspan="2">
            <el-radio v-model="form.bdc021" label="无"
              >监控室（电话）、机房、轿厢、轿顶、底坑（默认配置，电话线只提供至机房。如需配置至监控室或其他位置，请在非标需求上注明</el-radio
            >
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio v-model="form.bdc021" label="有">
              一键通话（有线电话，布置在轿厢COP）</el-radio
            >
          </td>
        </tr>

        <tr>
          <td>12</td>
          <td @click="clear('bdc022', 'bdc22A')" class="pointer">
            轿内IC卡功能
          </td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc022">
              <el-radio label="无">不需要</el-radio>
              <el-radio label="有">需要</el-radio>
            </el-radio-group>
            <span
              >（注：分层控制：
              <el-radio-group v-if="form.bdc022 == '有'" v-model="form.bdc22A">
                <el-radio label="有">是</el-radio>
                <el-radio label="无">否</el-radio> </el-radio-group
              >）</span
            >
          </td>
        </tr>

        <tr>
          <td>13</td>
          <td @click="clear('bdc023')" class="pointer">语音报站钟（轿顶）</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc023">
              <el-radio label="有">需要</el-radio>
              <el-radio label="无">不需要</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>14</td>
          <td @click="clear('bdc024')" class="pointer">再平层功能</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc024">
              <el-radio label="有">需要</el-radio>
              <el-radio label="无">不需要</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>15</td>
          <td @click="clear('bdc025')" class="pointer">ARD功能</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc025">
              <el-radio label="有">需要</el-radio>
              <el-radio label="无">不需要</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>16</td>
          <td @click="clear('bdc026')" class="pointer">静音接触器</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc026">
              <el-radio label="有">需要</el-radio>
              <el-radio label="无">不需要</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>17</td>
          <td @click="clear('bdc027')" class="pointer">包装</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc027">
              <el-radio label="国内木箱" />
              <el-radio label="出口木箱" />
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>18</td>
          <td @click="clear('bdc028')" class="pointer">唛头要求</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc028">
              <el-radio label="与项目名称相同（默认）" />
              <el-radio label="其他" />
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>19</td>
          <td @click="clear('bdc029')" class="pointer">缓冲器开关数量</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc029">
              <el-radio label="0" />
              <el-radio label="2" />
              <el-radio label="4" />
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>20</td>
          <td @click="clear('bdc030')" class="pointer">轿顶安全开关</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc030">
              <el-radio label="安全窗开关" />
              <el-radio label="轿厢锁定开关" />
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>21</td>
          <td @click="clear('bdc031')" class="pointer">控制柜制作方</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc031">
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
            <input
              v-model="form.bdc32A"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            />
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td colspan="3">
            <input
              v-model="form.bdc32B"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            />
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td colspan="3">
            <input
              v-model="form.bdc32C"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            />
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td colspan="3">
            <input
              v-model="form.bdc32D"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            />
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td colspan="3">
            <input
              v-model="form.bdc32E"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            />
          </td>
        </tr>
      </table>

      <!-- 人机界面 -->
      <table v-if="mode == '2'" border="1px" class="table" cellspacing="0">
        <tr>
          <th colspan="4" style="background: rgba(116, 117, 155, .5);">
            人机界面
          </th>
        </tr>

        <tr>
          <td width="30px" rowspan="2">1</td>
          <td
            width="150px"
            rowspan="2"
            @click="clear('bdc41B', 'bdc41C', 'bdc41D')"
            class="pointer"
          >
            操控箱数量
          </td>
          <td colspan="2">
            <el-checkbox v-model="checkBoxValueBdc041" @change="changeBDC041"
              >主操纵箱</el-checkbox
            >
            <el-checkbox v-model="checkBoxValueBdc41A" @change="changeBDC41A"
              >配副操纵箱</el-checkbox
            >
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio-group v-model="form.bdc41B">
              <el-radio label="有">配残疾人操纵箱</el-radio>
            </el-radio-group>
            （<el-radio-group
              v-model="form.bdc41C"
              :disabled="form.bdc41B !== '有'"
            >
              <el-radio label="壁挂式">壁挂式</el-radio>
              <el-radio label="嵌入式）面板材质：发纹不锈钢"
                >嵌入式</el-radio
              > </el-radio-group
            >） 面板材质：
            <input
              :disabled="form.bdc41B !== '有'"
              v-model="form.bdc41D"
              type="text"
              class="under_input"
              style="min-width: 200px;text-align: left"
            />
          </td>
        </tr>

        <tr>
          <td width="30px">2</td>
          <td width="150px" @click="clear('bdc042')" class="pointer">
            一体式COP制作方
          </td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc042">
              <el-radio label="卓梅尼">卓梅尼</el-radio>
              <el-radio label="虏克">虏克</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td width="30px" rowspan="9">3</td>
          <td
            width="150px"
            @click="
              clear(
                'bdc043',
                'bdc43A',
                'bdc43B',
                'bdc43C',
                'bdc43D',
                'bdc43E',
                'bdc43F',
                'bdc43G'
              )
            "
            class="th-title pointer"
          >
            主操纵箱类型
          </td>
          <td colspan="2" />
        </tr>
        <tr>
          <td rowspan="3">
            液晶显示屏
          </td>
          <td colspan="2">
            <el-radio-group
              v-model="form.bdc43A"
              :disabled="form.bdc041 !== '有'"
            >
              <el-radio label="红色LED">红色LED</el-radio>
              <el-radio label="5.7寸蓝白STN_LCD">5.7寸蓝白STN_LCD</el-radio>
              <el-radio label="7寸蓝白STN_LCD">7寸蓝白STN_LCD</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio-group
              v-model="form.bdc43A"
              :disabled="form.bdc041 !== '有'"
            >
              <el-radio label="7寸真彩TFT_LCD">7寸真彩TFT_LCD</el-radio>
              <el-radio label="8.4寸多媒体显示">8.4寸多媒体显示</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio-group
              v-model="form.bdc43A"
              :disabled="form.bdc041 !== '有'"
            >
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
              型号：<input
                :disabled="form.bdc041 !== '有'"
                v-model="form.bdc43B"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /></span>

            <span style="padding-right: 30px">
              材质：<input
                :disabled="form.bdc041 !== '有'"
                v-model="form.bdc43C"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /></span>

            <span style="padding-right: 30px">
              发光颜色：<input
                :disabled="form.bdc041 !== '有'"
                v-model="form.bdc43D"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /></span>

            <el-radio-group
              v-model="form.bdc43E"
              :disabled="form.bdc041 !== '有'"
            >
              <el-radio label="盲文按钮">盲文按钮</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td rowspan="4">
            安装方式
          </td>
          <td colspan="1" width="200px">
            <el-radio-group
              v-model="form.bdc43F"
              :disabled="form.bdc041 !== '有'"
            >
              <el-radio label="壁挂旋转式">壁挂旋转式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            <el-radio-group
              v-if="form.bdc43F == '壁挂旋转式'"
              v-model="form.bdc43G"
              :disabled="form.bdc041 !== '有'"
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
            <el-radio-group
              v-model="form.bdc43F"
              :disabled="form.bdc041 !== '有'"
            >
              <el-radio label="一体式">一体式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            面板材质：
            <input
              v-if="form.bdc43F == '一体式'"
              v-model="form.bdc43G"
              :disabled="form.bdc041 !== '有'"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            />
          </td>
        </tr>
        <tr>
          <td colspan="1">
            <el-radio-group
              v-model="form.bdc43F"
              :disabled="form.bdc041 !== '有'"
            >
              <el-radio label="嵌入式">嵌入式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            面板材质：
            <input
              v-if="form.bdc43F == '嵌入式'"
              :disabled="form.bdc041 !== '有'"
              v-model="form.bdc43G"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            />
          </td>
        </tr>
        <tr>
          <td colspan="1">
            <el-radio-group
              v-model="form.bdc43F"
              :disabled="form.bdc041 !== '有'"
            >
              <el-radio label="长条式">长条式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            面板材质：
            <input
              v-if="form.bdc43F == '长条式'"
              v-model="form.bdc43G"
              :disabled="form.bdc041 !== '有'"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            />
          </td>
        </tr>

        <tr>
          <td width="30px" rowspan="9">4</td>
          <td
            width="150px"
            @click="
              clear(
                'bdc044',
                'bdc44A',
                'bdc44B',
                'bdc44C',
                'bdc44D',
                'bdc44E',
                'bdc44F',
                'bdc44G'
              )
            "
            class="th-title pointer"
          >
            副操纵箱类型
          </td>
          <td colspan="2" />
        </tr>
        <tr>
          <td rowspan="3">
            液晶显示屏
          </td>
          <td colspan="2">
            <el-radio-group
              v-model="form.bdc44A"
              :disabled="form.bdc41A !== '有'"
            >
              <el-radio label="红色LED">红色LED</el-radio>
              <el-radio label="5.7寸蓝白STN_LCD">5.7寸蓝白STN_LCD</el-radio>
              <el-radio label="7寸蓝白STN_LCD">7寸蓝白STN_LCD</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio-group
              v-model="form.bdc44A"
              :disabled="form.bdc41A !== '有'"
            >
              <el-radio label="7寸真彩TFT_LCD">7寸真彩TFT_LCD</el-radio>
              <el-radio label="8.4寸多媒体显示">8.4寸多媒体显示</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio-group
              v-model="form.bdc44A"
              :disabled="form.bdc41A !== '有'"
            >
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
              型号：<input
                v-model="form.bdc44B"
                type="text"
                :disabled="form.bdc41A !== '有'"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /></span>

            <span style="padding-right: 30px">
              材质：<input
                :disabled="form.bdc41A !== '有'"
                v-model="form.bdc44C"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /></span>

            <span style="padding-right: 30px">
              发光颜色：<input
                :disabled="form.bdc41A !== '有'"
                v-model="form.bdc44D"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /></span>

            <el-radio-group
              v-model="form.bdc44E"
              :disabled="form.bdc41A !== '有'"
            >
              <el-radio label="红色LED">盲文按钮</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td rowspan="4">
            安装方式
          </td>
          <td colspan="1" width="200px">
            <el-radio-group
              v-model="form.bdc44F"
              :disabled="form.bdc41A !== '有'"
            >
              <el-radio label="壁挂旋转式">壁挂旋转式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            <el-radio-group
              :disabled="form.bdc41A !== '有'"
              v-if="form.bdc44F == '壁挂旋转式'"
              v-model="form.bdc44G"
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
            <el-radio-group
              v-model="form.bdc44F"
              :disabled="form.bdc41A !== '有'"
            >
              <el-radio label="一体式">一体式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            面板材质：
            <input
              v-if="form.bdc44F == '一体式'"
              v-model="form.bdc44G"
              type="text"
              :disabled="form.bdc41A !== '有'"
              class="under_input"
              style="min-width: 500px;text-align: left"
            />
          </td>
        </tr>
        <tr>
          <td colspan="1">
            <el-radio-group
              v-model="form.bdc44F"
              :disabled="form.bdc41A !== '有'"
            >
              <el-radio label="嵌入式">嵌入式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            面板材质：
            <input
              v-if="form.bdc44F == '嵌入式'"
              v-model="form.bdc44G"
              type="text"
              :disabled="form.bdc41A !== '有'"
              class="under_input"
              style="min-width: 500px;text-align: left"
            />
          </td>
        </tr>
        <tr>
          <td colspan="1">
            <el-radio-group
              v-model="form.bdc44F"
              :disabled="form.bdc41A !== '有'"
            >
              <el-radio label="长条式">长条式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            面板材质：
            <input
              v-if="form.bdc44F == '长条式'"
              :disabled="form.bdc41A !== '有'"
              v-model="form.bdc44G"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            />
          </td>
        </tr>

        <tr>
          <td>5</td>
          <td @click="clear('bdc045', 'bdc45A')" class="pointer">第三方标志</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc045">
              <el-radio label="无">不需要</el-radio> </el-radio-group
            >（默认配置虏克logo）
            <el-radio-group v-model="form.bdc045">
              <el-radio label="有">需要</el-radio>
            </el-radio-group>
            显示内容：<input
              v-if="form.bdc045 == '有'"
              v-model="form.bdc45A"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            />
          </td>
        </tr>

        <tr>
          <td rowspan="5">6</td>
          <td
            @click="
              clear(
                'bdc046',
                'bdc46A',
                'bdc46B',
                'bdc46C',
                'bdc46D',
                'bdc46E',
                'bdc46F',
                'bdc46G'
              )
            "
            class="th-title pointer"
          >
            召唤盒
          </td>
        </tr>
        <tr>
          <td>显示屏</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc46A">
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
              型号：<input
                v-model="form.bdc46B"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /></span>

            <span style="padding-right: 30px">
              材质：<input
                v-model="form.bdc46C"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /></span>

            <span style="padding-right: 30px">
              发光颜色：<input
                v-model="form.bdc46D"
                type="text"
                class="under_input"
                style="min-width: 100px;text-align: left"
            /></span>

            <el-radio-group v-model="form.bdc46E">
              <el-radio label="红色LED">盲文按钮</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td rowspan="2">
            安装方式
          </td>
          <td colspan="1" width="200px">
            <el-radio-group v-model="form.bdc46F">
              <el-radio label="薄型壁挂式">薄型壁挂式</el-radio>
            </el-radio-group>
          </td>
          <td colspan="1">
            <el-radio-group
              v-if="form.bdc46F == '薄型壁挂式'"
              v-model="form.bdc46G"
            >
              <el-radio label="LIOP-LUL11">LIOP-LUL11</el-radio>
              <el-radio label="LIOP-LUL15">LIOP-LUL15</el-radio>
              <el-radio label="LIOP-LUL05">LIOP-LUL05</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-radio-group v-model="form.bdc46F">
              <el-radio label="带底盒嵌入式">带底盒嵌入式</el-radio>
            </el-radio-group>
            面板材质：发纹不锈钢
          </td>
        </tr>

        <tr>
          <td>7</td>
          <td @click="clear('bdc047')" class="pointer">基站带基站锁</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc047">
              <el-radio label="无">不需要</el-radio>
              <el-radio label="有"> 需要</el-radio>
            </el-radio-group>
          </td>
        </tr>

        <tr>
          <td>8</td>
          <td @click="clear('bdc048', 'bdc48A')" class="pointer">第三方标志</td>
          <td colspan="2">
            <el-radio-group v-model="form.bdc048">
              <el-radio label="无">不需要</el-radio> </el-radio-group
            >（默认配置虏克logo）
            <el-radio-group v-model="form.bdc048">
              <el-radio label="有">需要</el-radio>
            </el-radio-group>
            显示内容：<input
              v-if="form.bdc048 == '有'"
              v-model="form.bdc48A"
              type="text"
              class="under_input"
              style="min-width: 500px;text-align: left"
            />
          </td>
        </tr>

        <tr>
          <td colspan="4">其他非标需求</td>
        </tr>
        <tr>
          <td>1</td>
          <td colspan="3">
            <input
              v-model="form.bdc49A"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            />
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td colspan="3">
            <input
              v-model="form.bdc49B"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            />
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td colspan="3">
            <input
              v-model="form.bdc49C"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            />
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td colspan="3">
            <input
              v-model="form.bdc49D"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            />
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td colspan="3">
            <input
              v-model="form.bdc49E"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            />
          </td>
        </tr>
        <tr>
          <td>6</td>
          <td colspan="3">
            <input
              v-model="form.bdc49F"
              type="text"
              class="under_input"
              style="min-width: 800px;text-align: left"
            />
          </td>
        </tr>
      </table>

      <table v-if="mode == '2'" border="1px" class="table" cellspacing="0">
        <tr>
          <th colspan="2" style="background: rgba(116, 117, 155, .5);">
            其他参数
          </th>
        </tr>
        <tr>
          <td>变频器选型电流A（转换值）</td>
          <td>
            <input
              v-model="bdc050"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center;background: #b598a1;color: #ffffff;"
              :disabled="true"
            />
          </td>
        </tr>
        <tr>
          <td>曳引机实际额定电流A</td>
          <td>
            <input
              v-model="form.bdc051"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            />
          </td>
        </tr>
        <tr>
          <td>曳引机功率KW</td>
          <td>
            <input
              v-model="form.bdc052"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            />
          </td>
        </tr>
        <tr>
          <td>井道宽度</td>
          <td>
            <input
              v-model="form.bdc053"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            />
          </td>
        </tr>
        <tr>
          <td>井道深度</td>
          <td>
            <input
              v-model="form.bdc054"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            />
          </td>
        </tr>
        <tr>
          <td>轿厢高度</td>
          <td>
            <input
              v-model="form.bdc055"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            />
          </td>
        </tr>
        <tr>
          <td>顶层高度M</td>
          <td>
            <input
              v-model="form.bdc056"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            />
          </td>
        </tr>
        <tr>
          <td>底坑深度M</td>
          <td>
            <input
              v-model="form.bdc057"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            />
          </td>
        </tr>
        <tr>
          <td>层高M</td>
          <td>
            <input
              v-model="form.bdc058"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            />
          </td>
        </tr>
        <tr>
          <td>提升高度</td>
          <td>
            <input
              v-model="form.bdc059"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center"
            />
          </td>
        </tr>
        <tr>
          <td>井道总高</td>
          <td>
            <input
              v-model="bdc060"
              type="text"
              class="under_input"
              style="min-width: 400px;text-align: center;background: #b598a1;color: #ffffff;"
              :disabled="true"
            />
          </td>
        </tr>
      </table>

      <div style="margin-top: 20px;display: flex; justify-content: flex-end;">
        <el-button round @click="goList" type="danger">取消保存</el-button>
        <el-tooltip effect="dark" placement="top-start">
          <div slot="content">
            仅保存，还能再次修改<br />公司也不会处理该订单
          </div>
          <el-button type="primary" round @click="onSubmit">保存</el-button>
        </el-tooltip>
        <el-tooltip effect="dark" placement="top" v-if="form.bdcId">
          <div slot="content">
            点击提交后公司将会正式处理您的订单<br />
            此后您的订单无法进行修改
          </div>
          <el-button type="success" round @click="onConfirm">提交</el-button>
        </el-tooltip>
      </div>
    </card>

    <el-dialog title="请选择导入项目" :visible.sync="isDialogShow" width="30%">
      <span>cccc</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="isDialogShow = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UnderInput from '@/components/UnderInput/UnderInput.vue'
  import Card from '@/components/Card/Card'
  import { createSale, getSaleData, updateSale, confirmSale } from '@/api/sale'
  export default {
    components: {
      UnderInput,
      Card,
    },
    watch: {
      'form.bdc14A': function(value) {
        if (value != '是') {
          this.form.bdc14B = ''
        }
      },
      'form.bdc017': function(newValue, oldValue) {
        if (oldValue && newValue != oldValue) {
          this.form.bdc17A = ''
        }
      },
      'form.bdc018': function(value) {
        if (value != '自动门控制') {
          this.form.bdc18A = ''
          this.form.bdc18B = ''
          this.form.bdc18C = ''
          this.form.bdc18D = ''
        } else if (value != '手拉门控制') {
          this.form.bdc18E = ''
          this.form.bdc18F = ''
        }
      },
      'form.bdc18E': function(value) {
        if (value != '电磁门刀') {
          this.form.bdc18F = ''
        }
      },
      'form.bdc20A': function(value) {
        if (value != '电磁铁复位') {
          this.form.bdc20B = ''
        }
      },
      'form.bdc022': function(value) {
        if (value != '是') {
          this.form.bdc22A = ''
        }
      },
      'form.bdc43F': function(newValue, oldValue) {
        if (oldValue && newValue != oldValue) {
          this.form.bdc43G = ''
        }
      },
      'form.bdc44F': function(newValue, oldValue) {
        if (oldValue && newValue != oldValue) {
          this.form.bdc44G = ''
        }
      },
      'form.bdc46F': function(newValue, oldValue) {
        if (oldValue && newValue != oldValue) {
          this.form.bdc46G = ''
        }
      },
      'form.bdc41B': function(newValue, oldValue) {
        if (oldValue && newValue != oldValue) {
          this.form.bdc41C = ''
          this.form.bdc41D = ''
        }
      },
    },
    computed: {
      // 井道高度
      bdc060() {
        const res = (
          parseFloat(this.form.bdc059) +
          parseFloat(this.form.bdc056) +
          parseFloat(this.form.bdc057)
        ).toFixed(2)
        return isNaN(res) ? '' : res
      },
      // 转换值
      bdc050() {
        // IF(C5<=1.75,F3,IF(AND(C5>1.75,C5<=3),F3*1.2,IF(AND(C5>3,C5<=4),F3*1.4,F3*1.6)))
        const v = this.form.bdc13A
        const w = this.form.bdc051
        if (v <= 1.75) {
          return w
        } else if (v <= 3) {
          return Math.round(w * 1.2)
        } else if (v <= 4) {
          return Math.round(w * 1.4)
        } else {
          return Math.round(w * 1.6)
        }
      },
      // 功率
      bdc010() {
        const A = this.bdc050
        const W = this.bdc502
        if (A < 9 && W < 3.7) {
          return 3.7
        } else if (A < 12.5 && W < 5.5) {
          return 5.5
        } else if (A < 18 && W < 7.5) {
          return 7.5
        } else if (A < 27 && W < 11) {
          return 11
        } else if (A < 33 && W < 15) {
          return 15
        } else if (A < 39 && W < 18.5) {
          return 18.5
        } else if (A < 48 && W < 22) {
          return 22
        } else if (A < 60 && W < 30) {
          return 30
        } else {
          return 0
        }
      },
    },
    data() {
      return {
        isDialogShow: false,
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
        isCreate: true,
        selectOptions: [
          {
            value: '未提交',
            label: '未提交',
          },
          {
            value: '已提交',
            label: '已提交',
          },
          {
            value: '处理中',
            label: '处理中',
          },
        ],
        selectValue: '',
        checkBoxValueBdc041: false,
        checkBoxValueBdc41A: false,
      }
    },
    watch: {
      checkBoxValueBdc041: {
        immediate: true,
        handler(value) {
          this.form.bdc041 = value ? '有' : '无'
          if (!value) {
            this.form.bdc043 = '' // 主操作箱类型
            this.form.bdc43A = '' // 液晶显示屏
            this.form.bdc43B = '' // 按钮型号
            this.form.bdc43C = '' // 按钮材质
            this.form.bdc43D = '' // 按钮颜色
            this.form.bdc43E = '' // 按钮类型
            this.form.bdc43F = '' // 安装方式
            this.form.bdc43G = '' // 面板材质
          }
        },
      },
      checkBoxValueBdc41A: {
        immediate: true,
        handler(value) {
          console.log(value, '41a')
          this.form.bdc41A = value ? '有' : '无'
          if (!value) {
            this.form.bdc044 = '' // 主操作箱类型
            this.form.bdc44A = '' // 液晶显示屏
            this.form.bdc44B = '' // 按钮型号
            this.form.bdc44C = '' // 按钮材质
            this.form.bdc44D = '' // 按钮颜色
            this.form.bdc44E = '' // 按钮类型
            this.form.bdc44F = '' // 安装方式
            this.form.bdc44G = '' // 面板材质
          }
          console.log(this.form.bdc41A)
        },
      },
    },
    mounted() {
      if (this.$route.query.bdc001) {
        this.isCreate = false
        this.getData(this.$route.query.bdc001, this.$route.query.bdc004)
      }
      this.currentPage = this.$route.query.currentPage
      if (window.history && window.history.pushState) {
        // 向历史记录中插入了当前页
        history.pushState(null, null, document.URL)
        window.addEventListener('popstate', this.goBack, false)
      }
    },
    destroyed() {
      window.removeEventListener('popstate', this.goBack, false)
    },
    methods: {
      goBack() {
        this.$message.info('请点击表单底部进行返回')
        history.pushState(null, null, document.URL)
      },
      async onSubmit() {
        if (this.form.bdc001.length == 0) {
          this.$message.error('请填写项目编号')
          return
        }
        if (this.form.bdc004.length == 0) {
          this.$message.error('请填写梯号')
          return
        }
        this.form.bdc060 = this.bdc060
        this.form.bdc050 = this.bdc050
        if (this.form.bdc46F == '带底盒嵌入式') this.form.bdc46G = '发纹不锈钢'
        console.log(this.form.bdc41A)
        if (this.isCreate) {
          await createSale(this.form)
          this.$message.success('新增成功!!')
        } else {
          await updateSale(this.form)
          this.$message.success('更新成功!!')
        }

        this.$router.replace({
          path: '/configure/configure-list',
          query: { currentPage: this.currentPage },
        })
      },
      // 回到列表页
      goList() {
        this.$confirm('退出此页面已经填好的数据将会丢失, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$router.replace({
              path: '/configure/configure-list',
              query: { currentPage: this.currentPage },
            })
          })
          .catch(() => {
            return
          })
      },
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
        console.log(this.form)
        this.form.bdc029 =
          typeof this.form.bdc029 == 'number' ? this.form.bdc029.toString() : ''
        this.checkBoxValueBdc041 = this.form.bdc041 == '有' ? true : false
        this.checkBoxValueBdc41A = this.form.bdc41A == '有' ? true : false
      },

      // 时间选择器
      dateChange(value) {},

      // 确定订单
      async onConfirm() {
        if (!this.form.bdc006) {
          this.$message.error('请选择订单时间')
          return
        }
        await confirmSale(this.form)
        this.$router.replace({
          path: '/configure/configure-list',
          query: { currentPage: this.currentPage },
        })
        this.$message.success('订单确定成功')
      },

      // 清空数据
      clear() {
        const params = [...arguments]
        params.forEach((key) => {
          if (this.form.hasOwnProperty(key)) {
            this.form[key] = ''
          }
          // 特殊处理主操纵箱的多选框的值
          // if (key === 'bdc041') {
          //   this.checkBoxValueBdc041 = false
          //   this.checkBoxValueBdc41A = false
          // }
        })
      },

      changeBDC041(value) {
        console.log(this.form.bdc41A)
        // this.form.bdc041 = value ? '有' : '无'
        // if (!value) {
        //   this.form.bdc043 = '' // 主操作箱类型
        //   this.form.bdc43A = '' // 液晶显示屏
        //   this.form.bdc43B = '' // 按钮型号
        //   this.form.bdc43C = '' // 按钮材质
        //   this.form.bdc43D = '' // 按钮颜色
        //   this.form.bdc43E = '' // 按钮类型
        //   this.form.bdc43F = '' // 安装方式
        //   this.form.bdc43G = '' // 面板材质
        // }
      },
      changeBDC41A(value) {
        // this.form.bdc41A = value ? '有' : '无'
        // if (!value) {
        //   this.form.bdc044 = '' // 主操作箱类型
        //   this.form.bdc44A = '' // 液晶显示屏
        //   this.form.bdc44B = '' // 按钮型号
        //   this.form.bdc44C = '' // 按钮材质
        //   this.form.bdc44D = '' // 按钮颜色
        //   this.form.bdc44E = '' // 按钮类型
        //   this.form.bdc44F = '' // 安装方式
        //   this.form.bdc44G = '' // 面板材质
        // }
      },

      onTip() {
        this.$message.info('功能在开发中，敬请期待')
      },
    },
  }
</script>

<style lang="scss" scoped>
  #page::v-deep .el-col {
    padding-right: 10px;
  }
  #page::v-deep td,
  th {
    padding: 4px;
  }
  #page {
    margin-top: -30px;
  }
  .header {
    position: fixed;
    background: #ffffff;
    top: 50px;
    z-index: 999;
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
  .pointer {
    cursor: pointer;
    transition: all 0.5;
    &:hover {
      background: #c8adc4;
    }
  }
  .th-title {
    background: rgba(116, 117, 155, 0.5);
  }
</style>
