<template>
  <div class="sidebar-logo-container">
    <router-link v-if="!collapse" class="sidebar-logo-link" to="/">
      <img src="@/assets/sidebar_logo.png" class="sidebar-logo" v-if="hasLogo"/>
      <span class="title">Welcome to</span>
      <span class="title bold">Admin</span>
    </router-link>
    <router-link v-else-if="hasLogo" class="sidebar-logo-link" to="/">
      <img src="@/assets/sidebar_logo.png" class="sidebar-logo" />
    </router-link>
  </div>
</template>

<script>
import settings from '@/settings'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      hasLogo: settings.sidebarLogo
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex !important;
    align-items: center;
    justify-content: center;
    text-overflow: ellipsis;
    overflow: hidden;
    .sidebar-logo {
      width: 24px;
      height: 24px;
    }
    .title {
      color: #fff;
      display: inline-block;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      margin-top: 6px;
      margin-left: 6px;
      white-space: nowrap;
    }
    .bold {
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
