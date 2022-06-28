<template>
    <el-breadcrumb class="app-breadcrumb">
        <transition-group name="breadcrumb">
            <span class="el-breadcrumb__item" key="breadcrumb-span">
                <img :class="['home',levelList.length>1?'pointer':'']" src="@/assets/nav/home.png" @click.prevent="handleLink(levelList[0])" />
                <span class="el-breadcrumb__separator separator-red">/</span>
            </span>
            <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.name">
                <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" :class="['no-redirect',index===0?'hover-red':'']">
                    {{ item.meta.title }}
                    <template v-if="item.meta.subTitle">
                        {{ item.meta.subTitle }}
                    </template>
                </span>
                <a v-else @click.prevent="handleLink(item)" class="hover-red">
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
            levelList: null,
        }
    },
    watch: {
        $route(route) {
            // if you go to the redirect page, do not update the breadcrumbs
            if (route.path.startsWith('/redirect/')) {
                return
            }
            this.getBreadcrumb()
        },
    },
    created() {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {
            let matched = this.$route.matched.filter(
                (item) => item.meta && item.meta.title
            )
            this.levelList = matched.filter(
                (item) =>
                    item.meta &&
                    item.meta.title &&
                    item.meta.breadcrumb !== false
            )
            let titleList = []
            let levelList = []
            this.levelList.map((i) => {
                let title = i.meta.title
                if (!titleList.includes(title)) {
                    levelList.push(i)
                    titleList.push(title)
                }
            })
            this.levelList = levelList
        },
        pathCompile(path) {
            const { params } = this.$route
            var toPath = compile(path)
            return toPath(params)
        },
        handleLink(item) {
            const { redirect, path } = item
            if (redirect) {
                this.$router.push(redirect).catch((failure) => {
                    if (
                        !isNavigationFailure(
                            failure,
                            NavigationFailureType.duplicated
                        )
                    ) {
                        throw failure
                    }
                })
            } else {
                this.$router.push(this.pathCompile(path)).catch((failure) => {
                    if (
                        !isNavigationFailure(
                            failure,
                            NavigationFailureType.duplicated
                        )
                    ) {
                        throw failure
                    }
                })
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.app-breadcrumb.el-breadcrumb {
    font-size: 14px;
    padding-left: 20px;
    line-height: $navigationBarHeight;
    background-color: #EBF1F9;
    .no-redirect {
        color: #a09ba6;
        cursor: text;
    }
    .home {
        display: inline-block;
        height: 16px;
        width: 16px;
        vertical-align: middle;
        margin-top: -5px;
    }
    .pointer {
        cursor: pointer;
    }
    .separator-red {
        color: #d14c3e;
    }
    .hover-red {
        color: #d14c3e;
        &:hover {
            color: #d14c3e;
        }
    }
}
</style>
