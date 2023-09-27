module.exports = {
  /**
   * 项目开工时间
   */
  year: 2023,
  /**
   * @type {string}
   * @description 项目标题
   */
  title: 'Vue Element Admin',
  
  /**
   * @type {string} 项目标识
   * @description 该字段将用在各存储字段前缀
   */
  projectName: 'DEMO',
  /**
   * 公司名称，将用在版权申明中
   */
  company: 'Vbe Studio Pte. Ltd.',
  defaultCountry: 'SG',
  defaultCalling: '65',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,
  showHamburger: true,
  /**
   * 是否启用在线校验路由
   * - true 每次刷新都将获取最新的路由权限
   * - false 每次刷新获取本地缓存的路由权限
   */
  enableOnlineAuth: false,
  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production',
  /**
   * 指示是否需要缓存路由页面
   */
  cachedViews: []
}
