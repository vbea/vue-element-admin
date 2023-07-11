import Vue from 'vue'
import {write} from 'clipboardy/browser'

function clipboardSuccess() {
  Vue.prototype.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}

function clipboardError() {
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  })
}

export default function handleClipboard(text, event) {
  /*const clipboard = new Clipboard(event.target, {
    text: () => text
  })*/
  write(text).then(res => {
    clipboardSuccess()
  }).catch(err => {
    clipboardError()
  })
}
