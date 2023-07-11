<template>
  <div>
    <el-upload
      v-bind="$props"
      :http-request="onUpload">
      <slot></slot>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: "MyUpload",
    props: {
      accept: String,
      action: {
        type: String,
        required: true
      },
      autoUpload: {
        type: Boolean,
        default: true
      },
      beforeRemove:Function,
      beforeUpload: Function,
      disabled: Boolean,
      drag: Boolean,
      dragger: Boolean,
      fileList: Array,
      headers: Object,
      httpRequest: Function,
      isBlob:Boolean,
      limit: Number,
      listType: String,
      multiple: Boolean,
      name: String,
      onChange: Function,
      onError: Function,
      onExceed: Function,
      onPreview: Function,
      onProgress: Function,
      onRemove: Function,
      onSuccess: Function,
      showFileList: Boolean,      
      type: String,
      withCredentials: Boolean
    },
    data() {
      return {
        
      };
    },
    mounted() {
      
    },
    methods: {
      onUpload(option) {
        var _this = this;
        if (this.httpRequest) {
          return this.httpRequest();
        }
        option.isBlob = this.isBlob;
        if (typeof XMLHttpRequest === 'undefined') {
          return;
        }
        var xhr = new XMLHttpRequest();
        var action = option.action;
        if (xhr.upload) {
          xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
              e.percent = e.loaded / e.total * 100;
            }
            option.onProgress(e);
          };
        }
            
        var formData = new FormData();
        if (option.data) {
          Object.keys(option.data).forEach(function (key) {
            formData.append(key, option.data[key]);
          });
        }
        formData.append(option.filename, option.file, option.file.name);
        xhr.onerror = function error(e) {
          option.onError(e);
        };
            
        xhr.onload = function() {
          if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(action, option, xhr));
          }
          if (option.isBlob) {
            option.onSuccess(xhr.response);
          } else {
            option.onSuccess(_this.getBody(xhr));
          }
        };
        
        if (option.isBlob) {
          xhr.responseType="blob";
        }
        xhr.open('post', action, true);
            
        if (option.withCredentials && 'withCredentials' in xhr) {
          xhr.withCredentials = true;
        }
            
        var headers = option.headers || {};
            
        for (var item in headers) {
          if (headers.hasOwnProperty(item) && headers[item] !== null) {
            xhr.setRequestHeader(item, headers[item]);
          }
        }
        xhr.send(formData);
        return xhr;
      },
      getBody(xhr) {
        /*xhr.overrideMimeType(
          'text/plain; charset=x-user-defined'
        );*/
        var text = xhr.responseText || xhr.response;
        if (!text) {
          return text;
        }
      
        try {
          return JSON.parse(text);
        } catch (e) {
          return text;
        }
      }
    }
  }
</script>

<style scoped>

</style>