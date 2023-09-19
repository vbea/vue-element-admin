<template>
  <div class="vbe-table-actions">
    <div class="table-action action-edit" @click="handleView" v-if="showView">
      <i v-if="showIcon" class="el-icon-view"></i>
      <span>{{viewText}}</span>
    </div>
    <div class="table-action action-edit" @click="handleEdit" v-if="showEdit">
      <i v-if="showIcon" class="el-icon-edit-outline"/>
      <span>{{editText}}</span>
    </div>
    <div class="table-action action-delete" @click="handleDelete" v-if="showDel">
      <i v-if="showIcon" class="el-icon-delete"/>
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
.vbe-table-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  
  .table-action {
    padding: 0 8px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    i {
      font-size: 15px;
      margin-right: 3px;
    }
    span {
      white-space: nowrap;
    }
    & + .table-action::after {
      left: 0;
      height: 14px;
      content: " ";
      position: absolute;
      border-left: 1px solid #999;
    }
    &::before {
      top: auto;
      left: 6px;
      right: 5px;
      bottom: 1px;
      height: 1px;
      content: " ";
      position: absolute;
      transform: scaleX(0);
      transition: all .2s;
      background-color: #3179E4;
      backface-visibility: hidden;
    }
    &:hover::before {
      transform: scaleX(1);
    }
  }
  .action-edit {
    color: #3179E4;
  }
  .action-delete {
    color: #ED3F3F;
    &::before {
      background-color: #ED3F3F;
    }
  }
}
</style>
