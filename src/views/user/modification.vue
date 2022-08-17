/* 修改用户个人信息 */
<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="12">
        <el-card>
          <div slot="header">
            修改密码<span
              style="padding-left: 10px; font-size: 12px; color: #E6A23C;"
              >密码要求6到16位，必须包含字母、数字加英文符号</span
            >
          </div>
          <el-form :model="formData" ref="form" :rules="rules">
            <el-form-item label="新密码" prop="password">
              <el-input show-password v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item label="再次确认密码" prop="password_confirm">
              <el-input
                show-password
                v-model="formData.password_confirm"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSubmit" round>修改</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="12" v-if="allowSwitch == 'Y'">
        <el-card>
          <div slot="header">
            修改厂区
          </div>
          <el-form>
            <el-form-item label="厂区" prop="password">
              <el-select v-model="plant" placeholder="请选择厂区">
                <el-option
                  v-for="item in selectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="onChangeFactory" round>修改</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Card from '@/components/Card/Card'
  import { updataPassword, getUserType, modifyFactory } from '@/api/user'
  import { encryptData } from '@/utils/crypto'
  import { removeToken } from '@/utils/auth'
  export default {
    components: { Card },
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value !== this.formData.password) {
          callback(new Error('两次密码不相同'))
        } else {
          callback()
        }
      }
      return {
        formData: {
          password: '',
          password_confirm: '',
        },
        rules: {
          password: [
            {
              required: true,
              trigger: 'blur',
              min: 6,
              message: '密码不能少于6位',
            },
          ],
          password_confirm: [
            {
              required: true,
              trigger: 'blur',
              min: 6,
              message: '密码不能少于6位',
            },
          ],
        },
        selectList: [],
        allowSwitch: 'N',
        plant: '',
      }
    },
    mounted() {
      this.judgeUser()
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            this.$message('请填写必填项')
          } else if (
            this.formData.password !== this.formData.password_confirm
          ) {
            this.$message('两次密码不相同')
          } else {
            // 验证密码是否包含数字，字母，特殊符号
            const reg = /((^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,16}$)|(^(?=.*\d)(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{6,16}$)|(^(?=.*\d)(?=.*[a-z])(?=.*\W)[\da-zA-Z\W]{6,16}$)|(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z\W]{6,16}$))/
            if (!reg.test(this.formData.password)) {
              return this.$message({
                message: '密码要求6到16位，必须包含字母、数字加英文符号',
                duration: 4000,
                type: 'info',
              })
            }
            const encryPwd = encryptData(this.formData.password)
            updataPassword({ PasswordSecret: this.formData.password }).then(
              () => {
                this.$store.commit(
                  'user/SET_INIT_PASSWORD',
                  this.formData.password
                )
                this.formData.password = ''
                this.formData.password_confirm = ''
                this.$message.success('密码修改成功')
                removeToken()
                // this.$store.dispatch('user/logout')
                this.$router.replace('/login')
              }
            )
          }
        })
      },

      // 获取用户类型，根据是否是特殊用户，是否显示修改厂区框
      async judgeUser() {
        const res = await getUserType()
        this.allowSwitch = res.data.allowSwitch
        this.plant = res.data.plant
        this.selectList = res.data.labelValuePairs
      },

      // 修改厂区
      async onChangeFactory() {
        await modifyFactory({ plant: this.plant })
        const plant = this.selectList.find((i) => i.value === this.plant).label
        this.$store.commit('user/SET_PLANT', plant)
        this.$message.success('修改成功！')
      },
    },
  }
</script>

<style lang="scss" scoped></style>
