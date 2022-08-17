<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <div class="avatar">{{$store.state.user.name | avatar_name}}</div> -->
          <avatar
            style="width: 40px; height: 40px;cursor: pointer;"
            :username="userName"
          ></avatar>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              后台主页
            </el-dropdown-item>
          </router-link>
          <router-link to="/user/modification">
            <el-dropdown-item>
              个人信息
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="toHelpDoc">
            说明文档
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 用户信息 -->
    <div
      style="float: right;
      height: 100%;
      line-height: 50px;
      margin: 0 20px;
      display: flex;
      align-items: center;"
    >
      <div>
        <div style="color: #ffffff; background: #2b73af;padding: 10px;">
          工厂：{{ plantName }}
        </div>
      </div>
      <div style="margin-left: 20px;">
        {{ userName }}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import Avatar from 'vue-avatar'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      Avatar,
    },
    computed: {
      ...mapGetters(['sidebar', 'avatar']),
      userName() {
        return this.$store.state.user.name || '访客'
      },
      plantName() {
        return this.$store.state.user.plant
      },
    },
    filters: {
      avatar_name(value) {
        return value.slice(0, 1)
      },
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login`)
      },
      // 跳往说明文档
      toHelpDoc() {
        // window.location.href = 'https://web.gtechzs.com/docs/#/GT-Web/'
        window.open('https://web.gtechzs.com/docs/#/GT-Web/')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
          }

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
