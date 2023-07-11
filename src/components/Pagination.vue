<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, prev, pager, next, sizes'//, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.$emit('pagination', { page: this.currentPage, limit: pageSize})
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(page) {
      this.$emit('pagination', { page, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>
<style lang="scss" scoped="scoped">
  @import '../styles/element-ui.scss';
  .pagination-container ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: $--color-primary;
  }
</style>
<style scoped="scoped">
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
.pagination-container >>> .el-pagination.is-background .el-pager li:not(.disabled) {
  color: #333;
  border: 1px solid #eee;
  background-color: white;
}
.pagination-container >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  color: #fff;
}
.pagination-container >>> .btn-prev,
.pagination-container >>> .btn-next {
  border: 1px solid #eee;
  background-color: white;
}
.pagination-container >>> .el-pagination__total {
  color: #333;
}
</style>
