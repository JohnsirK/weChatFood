// 导入request封装文件。
const FetchApi = require('./utils/request')
//app.js
App({
  // 在此实例化fetchApi供全局使用。由于采用class方式创建。所以实例化需要new操作符
  fetchApi: new FetchApi(),
  // 实例化towxml
  onLaunch: function () {},
  globalData: {
    // userInfo: null
    // 当前选择城市
    nowCity: wx.getStorageSync('nowPickCity') || {},
    // 当前选择地址
    pickToAddress: wx.getStorageSync('pickAddress') || {},
    // 用户登录信息
    userInfo: wx.getStorageSync('userInfo') || null,
    // 加入购物车成功
    shopCartSuccess: wx.getStorageSync('shopSuccess') || null
  }
})