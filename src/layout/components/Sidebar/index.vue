<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/variables.scss'
  import { getStorage } from '@/utils/localstorage'
  export default {
    components: { SidebarItem, Logo },
    computed: {
      ...mapGetters(['sidebar']),
      routes() {
        // return this.generateRoute()
        return this.$router.options.routes
      },
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      showLogo() {
        return this.$store.state.settings.sidebarLogo
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      },
    },

    methods: {
      generateRoute() {
        const routes = this.$router.options.routes
        const permission = getStorage('permission')
        return this.filter(routes, permission)
      },
      filter(routes, permission) {
        let res = []
        routes.forEach((route) => {
          let tmp = { ...route }
          if (this.hasPermission(route, permission)) {
            if (route.children && route.children.length > 0) {
              tmp.children = this.filter(route.children, permission)
            }
            res.push(tmp)
          }
        })
        return res
      },
      hasPermission(route, permission) {
        if (route.meta && route.meta.permission) {
          return permission.some((i) => route.meta.permission == i)
        } else {
          return true
        }
      },
    },
  }
</script>
