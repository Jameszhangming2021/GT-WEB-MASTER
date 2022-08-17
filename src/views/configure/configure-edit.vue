/** 配置表 */
<template>
  <div id="page">
    <card>
      <div class="tableName">电气配置表-整体</div>
      <el-form ref="form" label-position="top" label-width="100px" size="mini">
        <el-form-item label="电梯类型">
          <el-radio-group v-model="formData[0].value" size="mini">
            <el-radio border label="乘客电梯"></el-radio>
            <el-radio border label="载货电梯"></el-radio>
            <el-radio border label="家用电梯"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="机房类型">
          <el-radio-group v-model="formData[1].value" size="mini">
            <el-radio-button border label="有机房"></el-radio-button>
            <el-radio-button border label="无机房"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="主参数">
          <el-row>
            <el-col :span="8">
              <el-input placeholder="载重量" v-model="formData[2].value">
                <template slot="prepend">载重量</template>
                <template slot="append">Kg</template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input placeholder="速度" v-model="formData[3].value">
                <template slot="prepend">速度</template>
                <template slot="append">m/s</template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="电梯数量">
          <el-row>
            <el-col :span="5">
              <el-row>
                <el-col :span="20">
                  <el-input placeholder="数量" v-model="formData[4].value">
                    <template slot="append">台</template>
                  </el-input>
                </el-col>
                <el-col :span="4">
                  <el-tooltip
                    content="如配置上的差异，请再填一份此参数表"
                    placement="top"
                  >
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="gt-m-t-10">
            <el-col class="title" :span="6"
              >是否群控:
              <el-radio-group v-model="formData[5].value" size="mini">
                <el-radio-button border label="是"></el-radio-button>
                <el-radio-button border label="否"></el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col :span="12" v-if="formData[5].value == '是'">
              <el-input placeholder="" v-model="formData[6].value">
                <template slot="prepend">梯间关系</template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="供电电压" size="mini">
          <el-radio-group v-model="formData[7].value" size="mini">
            <el-radio-button border label="单项AC200V"></el-radio-button>
            <el-radio-button border label="三相AC380V"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="层站">
          <el-row>
            <el-col :span="5">
              <el-input v-model="formData[8].value">
                <template slot="append">层</template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-input v-model="formData[9].value">
                <template slot="append">站</template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-input v-model="formData[10].value">
                <template slot="append">厅门</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row class="gt-m-t-10">
            <el-col :span="5">
              <el-input v-model="formData[11].value">
                <template slot="prepend">轿门数量</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row class="gt-m-t-10">
            <el-col :span="5">
              <el-input v-model="formData[12].value">
                <template slot="prepend">消防楼层</template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-input v-model="formData[13].value">
                <template slot="prepend">基站楼层</template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-input v-model="formData[14].value">
                <template slot="prepend">出口楼层</template>
              </el-input>
            </el-col>
            <el-col :span="2">
              <el-tooltip content="标配带凸出⭐图案按钮" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </el-col>
          </el-row>
          <el-row class="gt-m-t-10">
            <el-col :span="7">
              <el-input v-model="formData[15].value">
                <template slot="prepend">前门服务层</template>
              </el-input>
            </el-col>
            <el-col :span="7">
              <el-input v-model="formData[16].value">
                <template slot="prepend">后门服务层</template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="值班室对讲主机配置" size="mini">
          <el-select v-model="formData[17].value" placeholder="请选择">
            <el-option label="单局" :value="2"> </el-option>
            <el-option label="多局" :value="3"> </el-option>
          </el-select>
          <el-input v-model="formData[18].value"></el-input>
          <el-input v-model="formData[19].value"></el-input>
        </el-form-item>

        <el-form-item label="开门方式">
          <el-radio-group v-model="formData[20].value" size="mini">
            <el-radio-button border label="自动门控制"></el-radio-button>
            <el-radio-button border label="手拉门控制"></el-radio-button>
          </el-radio-group>
          <el-row class="gt-m-t-10">
            <el-col :span="8">
              <el-input v-model="formData[21].value">
                <template slot="prepend">门机生产厂家</template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model="formData[22].value">
                <template slot="prepend">型号</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row class="gt-m-t-10">
            <el-col :span="8">
              <el-input v-model="formData[23].value">
                <template slot="prepend">门机驱动器生产厂家</template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model="formData[24].value">
                <template slot="prepend">型号</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row class="gt-m-t-10">
            <el-radio-group v-model="formData[25].value" size="mini">
              <el-radio-button border label="机械门刀"></el-radio-button>
              <el-radio-button border label="电磁门刀"></el-radio-button>
            </el-radio-group>
          </el-row>
          <el-row class="gt-m-t-10">
            <el-col :span="6">
              <el-input v-model="formData[26].value">
                <template slot="prepend">门刀供电电压</template>
                <template slot="append">V</template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="称重装置">
          <el-row class="title">
            类型:
            <el-radio-group v-model="formData[27].value">
              <el-radio label="模拟量" border></el-radio>
              <el-radio label="数字量" border></el-radio>
            </el-radio-group>
          </el-row>
          <el-row class="title gt-m-t-10">
            安装位置:
            <el-radio-group v-model="formData[28].value">
              <el-radio label="轿厢底部"></el-radio>
              <el-radio label="轿厢顶部"></el-radio>
              <el-radio label="主机机架绳头"></el-radio>
              <el-radio label="轿架上梁"></el-radio>
            </el-radio-group>
          </el-row>
        </el-form-item>

        <el-form-item label="限速器">
          <el-row class="title">
            类型:
            <el-radio-group v-model="formData[29].value">
              <el-radio label="轿厢限速器" border></el-radio>
              <el-radio label="对重限速器" border></el-radio>
            </el-radio-group>
          </el-row>
          <el-row class="title gt-m-t-10">
            安装位置:
            <el-radio-group v-model="formData[30].value">
              <el-radio-button label="手动复位"></el-radio-button>
              <el-radio-button label="电磁铁复位"></el-radio-button>
            </el-radio-group>
          </el-row>
          <el-row class="title gt-m-t-10">
            复位电压:
            <el-radio-group v-model="formData[31].value">
              <el-radio label="AC200V"></el-radio>
              <el-radio label="DC24V"></el-radio>
            </el-radio-group>
          </el-row>
        </el-form-item>

        <el-form-item label="通话配置">
          <el-row>
            <el-col>
              <el-radio v-model="formData[32].value" label="1"
                >监控室（电话）、机房、轿厢、轿顶、底坑（默认配置，电话线只提供至机房。如需配置至监控室或其他位置，请在非标需求上注明</el-radio
              >
            </el-col>
            <el-col>
              <el-radio v-model="formData[32].value" label="2"
                >一键通电话（有线电话，布置在轿厢COP）</el-radio
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="轿内IC卡功能">
          <el-radio-group v-model="formData[33].value">
            <el-radio-button label="不需要"></el-radio-button>
            <el-radio-button label="需要"></el-radio-button>
          </el-radio-group>
          <el-row class="title gt-m-t-10">
            分层控制:
            <el-select v-model="formData[34].value" size="mini">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-row>
        </el-form-item>

        <el-row>
          <el-col :span="8">
            <el-form-item label-width="200" label="语音报站钟（轿顶）">
              <el-select v-model="formData[35].value">
                <el-option label="需要" value="1"></el-option>
                <el-option label="不需要" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="200" label="再平层功能">
              <el-select v-model="formData[36].value">
                <el-option label="需要" value="1"></el-option>
                <el-option label="不需要" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="200" label="ARD功能">
              <el-select v-model="formData[37].value">
                <el-option label="需要" value="1"></el-option>
                <el-option label="不需要" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label-width="200" label="静音接触器">
              <el-select v-model="formData[38].value">
                <el-option label="需要" value="1"></el-option>
                <el-option label="不需要" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="200" label="包装">
              <el-select v-model="formData[39].value">
                <el-option label="国内木箱" value="1"></el-option>
                <el-option label="出口木箱" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="200" label="唛头要求">
              <el-select v-model="formData[40].value">
                <el-option label="与项目名称相同（默认）" value="1"></el-option>
                <el-option label="其他" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label-width="200" label="缓冲器开关数量">
              <el-select v-model="formData[41].value">
                <el-option label="0" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="4" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="200" label="轿顶安全开关">
              <el-select v-model="formData[42].value">
                <el-option label="安全窗开关" value="1"></el-option>
                <el-option label="轿厢锁定开关" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="200" label="控制柜制作方">
              <el-select v-model="formData[43].value">
                <el-option label="卓梅尼" value="1"></el-option>
                <el-option label="虏克" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="left">其他非标需求</el-divider>

        <el-form-item label="非标准需求">
          <el-input
            type="textarea"
            v-model="formData[44].value"
            :rows="4"
          ></el-input>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </card>
  </div>
</template>

<script>
  import UnderInput from '@/components/UnderInput/UnderInput.vue'
  import Card from '@/components/Card/Card'
  export default {
    components: {
      UnderInput,
      Card,
    },
    data() {
      return {
        formData: [
          // 1电梯类型
          {
            key: 'P0100',
            value: '',
          },
          // 2机房类型
          {
            key: 'P0200',
            value: '',
          },
          // 3主参数-载重量
          {
            key: 'P0300',
            value: '',
          },
          // 4主参数-速度
          {
            key: 'P0301',
            value: '',
          },
          // 5电梯数量-数量
          {
            key: 'P0400',
            value: '',
          },
          // 6电梯数量-是否群控
          {
            key: 'P0401',
            value: '',
          },
          // 7电梯数量-梯间关系
          {
            key: 'P0402',
            value: '',
          },
          // 8供电电压
          {
            key: 'P0500',
            value: '',
          },
          // 9层站-层数
          {
            key: 'P0600',
            value: '',
          },
          // 10层站-站数
          {
            key: 'P0601',
            value: '',
          },
          // 11层站-厅门
          {
            key: 'P0602',
            value: '',
          },
          // 12层站-轿门数量
          {
            key: 'P0603',
            value: '',
          },
          // 13层站-消防楼层
          {
            key: 'P0604',
            value: '',
          },
          // 14层站-基站楼层
          {
            key: 'P0605',
            value: '',
          },
          // 15层站-出口楼层
          {
            key: 'P0606',
            value: '',
          },
          // 16层站-前门服务层
          {
            key: 'P0607',
            value: '',
          },
          // 17层站-后门服务层
          {
            key: 'P0608',
            value: '',
          },
          // 18对讲主机-单局多局
          {
            key: 'P0700',
            value: '',
          },
          // 19对讲主机-单局内容
          {
            key: 'P0701',
            value: '',
          },
          // 20对讲主机-多局内容
          {
            key: 'P0702',
            value: '',
          },
          // 21开门方式-自动或手拉
          {
            key: 'P0800',
            value: '',
          },
          // 22开门方式-自动-门机生产厂家
          {
            key: 'P0801',
            value: '',
          },
          // 23开门方式-自动-门机生产型号
          {
            key: 'P0802',
            value: '',
          },
          // 24开门方式-自动-驱动器生产厂家
          {
            key: 'P0803',
            value: '',
          },
          // 25开门方式-自动-驱动器型号
          {
            key: 'P0804',
            value: '',
          },
          // 26开门方式-手动-机械或电磁
          {
            key: 'P0805',
            value: '',
          },
          // 27开门方式-手动-电磁-供电电压
          {
            key: 'P0806',
            value: '',
          },
          // 28称重装置-类型
          {
            key: 'P0900',
            value: '',
          },
          // 29称重装置安装位置
          {
            key: 'P0901',
            value: '',
          },
          // 30限速器-类型
          {
            key: 'P1000',
            value: '',
          },
          // 31限速器-复位方式
          {
            key: 'P1001',
            value: '',
          },
          // 32限速器-电磁体复位-电压
          {
            key: 'P1002',
            value: '',
          },
          // 33通话配置
          {
            key: 'P1100',
            value: '',
          },
          // 34轿内IC卡功能
          {
            key: 'P1200',
            value: '',
          },
          // 35轿内IC卡功能-分层控制
          {
            key: 'P1201',
            value: '',
          },
          // 36语音报站钟
          {
            key: 'P1300',
            value: '',
          },
          // 37再平层功能
          {
            key: 'P1400',
            value: '',
          },
          // 38ARD功能
          {
            key: 'P1500',
            value: '',
          },
          // 39静音接触器
          {
            key: 'P1600',
            value: '',
          },
          // 40包装
          {
            key: 'P1700',
            value: '',
          },
          // 41唛头要求
          {
            key: 'P1800',
            value: '',
          },
          // 42缓冲器开关数量
          {
            key: 'P1900',
            value: '',
          },
          // 43轿顶安全开关
          {
            key: 'P2000',
            value: '',
          },
          // 44控制柜制作方
          {
            key: 'P2100',
            value: '',
          },
          // 45非标要求
          {
            key: 'P2200',
            value: '',
          },
        ],
        input: '',
        textarea: '',
      }
    },
    methods: {
      onSubmit() {},
    },
  }
</script>

<style lang="scss" scoped>
  #page::v-deep .el-col {
    padding-right: 10px;
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
</style>
