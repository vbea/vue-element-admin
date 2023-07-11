<template>
  <div class="table-actions">
    <div class="table-action action-edit" @click="handleView" v-if="showView">
      <i v-if="showIcon" class="el-icon el-icon-view"></i>
      <span>{{viewText}}</span>
    </div>
    <div class="table-action action-edit" @click="handleEdit" v-if="showEdit">
      <img v-if="showIcon" src="../assets/ic-update.png"/>
      <span>{{editText}}</span>
    </div>
    <div class="table-action action-delete" @click="handleDelete" v-if="showDel">
      <img v-if="showIcon" src="../assets/ic-delete.png" />
      <span>{{deleteText}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TableAction',
    props: {
      viewText: {
        type: String,
        default: "View"
      },
      editText: {
        type: String,
        default: "Edit"
      },
      deleteText: {
        type: String,
        default: "Delete"
      },
      showDel: {
        type: Boolean,
        default: true
      },
      showEdit: {
        type: Boolean,
        default: true
      },
      showView: {
        type: Boolean,
        default: false
      },
      showIcon: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      handleEdit() {
        this.$emit('edit');
      },
      handleDelete() {
        this.$emit('delete');
      },
      handleView() {
        this.$emit('view');
      }
    }
  }
</script>

<style lang="scss">
  .table-actions {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .table-action {
    padding: 0 14px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    & span {
      white-space: nowrap;
    }
    & + .table-action::before {
      left: 0;
      height: 14px;
      content: " ";
      position: absolute;
      border-left: 1px solid #999;
    }
  }
  .action-edit {
    color: #3179E4;
    img {
      width: 15px;
      margin-right: 5px;
    }
    .el-icon {
      font-size: 16px;
      font-weight: bold;
      margin-right: 5px;
    }
  }
  .action-delete {
    color: #ED3F3F;
    img {
      width: 20px;
    }
  }
</style>
