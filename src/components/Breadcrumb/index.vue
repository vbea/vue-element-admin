<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <div class="parent-router" v-if="item.meta.parent">
          <a v-if="item.meta.parent.path" @click.prevent="handleParent(item.meta.parent)">
            {{ item.meta.parent.title }}
          </a>
          <i class="el-breadcrumb__separator el-icon-arrow-right" style="display: inline;"></i>
        </div>
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">
          {{ item.meta.title }}
          <template v-if="item.meta.subTitle">{{ item.meta.subTitle }}</template>
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { compile } from 'path-to-regexp'
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        console.log('#####################################################')
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect).catch((failure) => {
          if (!isNavigationFailure(failure, NavigationFailureType.duplicated)) {
            //throw failure
          }
        })
      } else {
        this.$router.push(this.pathCompile(path)).catch((failure) => {
          if (!isNavigationFailure(failure, NavigationFailureType.duplicated)) {
            //throw failure
          }
        })

      }
    },
    handleParent(parent) {
      if (parent.path) {
        this.$router.push({path: parent.path})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: $navigationBarHeight;
  margin-left: 8px;

  .no-redirect {
    color: #333333;
    cursor: text;
  }
  .parent-router {  
    display: inline;
    a {
      color: #303133;
      cursor: pointer;
      height: 30px;
    }
    a:hover {
      color: #001489;
      cursor: pointer;
    }
  }
}

</style>
<style>
  .el-breadcrumb__separator {
    color: #555 !important;
    font-weight: bold !important;
  }
</style>