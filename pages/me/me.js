const app = getApp()
// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'https://elm.cangdu.org/img/',
    // 用户数据
    user: {} 
  },
  // 跳转到服务中心页面
  goExplain () {
    wx.navigateTo({
      url: '/pages/me/children/explain/explain'
    })
  },
  // 跳转到修改密码
  goChangePwd () {
    wx.navigateTo({
      url: '/pages/me/children/changePwd/changePwd'
    })
  },
  // 跳转到登录
  goLogin () {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断当前是否登录
    if (app.globalData.userInfo && app.globalData.userInfo.id) {
      this.setData({
        user: app.globalData.userInfo
      })
    }
    console.log(this.data.user)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.userInfo && app.globalData.userInfo.id) {
      this.setData({
        user: app.globalData.userInfo
      })
    }
    // 自定义tabbar 手动赋值
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})