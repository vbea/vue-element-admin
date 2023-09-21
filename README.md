# vue-element-admin

vue-element-admin精简版，适合新建空项目使用，只保留一个登录页面和一个Demo页面

## Environment

`Node >= 6`

## 开发

```bash
# 克隆项目
git clone https://github.com/vbea/vue-element-admin.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install
# 或
yarn install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
# 或
yarn dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建测试环境
npm run build:stage
# 或
yarn build:stage

# 构建生产环境
npm run build:prod
# 或
yarn build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```


## Document

[Vue.js](https://cn.vuejs.org/v2/guide/)  
[Element UI](https://element.eleme.cn/#/zh-CN/component/layout)  
[Vue Router](https://router.vuejs.org/zh/guide/)  
[Vuex](https://vuex.vuejs.org/zh/guide/)  
[Echarts](https://echarts.apache.org/zh/tutorial.html)  
[Axios](http://www.axios-js.com/zh-cn/docs/)  
[vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions |


邠心工作室@2022