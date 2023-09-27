<template>
  <div :class="{'has-logo':showLogo}">
    <logo
      v-if="showLogo"
      :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        @select="onMenuItemSelect"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :activeMenu="activeMenu"
          :selectedItemIndex="selectedItemIndex"
          :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <div
      @click="toggleSideBar"
      class="dev-toggle-icon"
      :class="{open: sidebar.opened}"
      v-if="isDev && !showHamburger">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { getAuthRoutes } from '@/utils/auth'
import permission from '@/utils/permission'
import setting from '../../../settings.js'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      selectedItemIndex: '',
      authRoutesList: [],
      showHamburger: setting.showHamburger
    }
  },
  created() {
    
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    onMenuItemSelect(index) {
      this.selectedItemIndex = index
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
    ]),
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
    isDev() {
      return (process.env.NODE_ENV == 'development');
    }
  }
}
</script>
<style lang="scss">
  .dev-toggle-icon {
    left: 0;
    bottom: 0;
    color: #333;
    padding: 18px;
    font-size: 20px;
    cursor: pointer;
    text-align: center;
    position: absolute;
    transition: all .3s;
    &.open {
      transform: rotate(180deg);
    }
  }
</style>