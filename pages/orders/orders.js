const app = getApp()
// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    user: {},
    imgUrl:'https://elm.cangdu.org/img/',
    // 列表数据
    orderListData: [],
    limit: 20,
    offset: 0
  },
  // 获取列表数据
  getOrdersData(user_id, limit, offset) {
    if (!user_id) {
      return false
    }
    wx.showLoading({
      title: '数据加载中...'
    })
    app.fetchApi.getOrders(
      user_id,
      limit,
      offset
    )
    .then(res => {
      wx.hideLoading()
      this.setData({
        orderListData: res
      })
      console.log(res)
    })
    .catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: app.globalData.userInfo
    })
    console.log(this.data.user)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.user && this.data.user.user_id) {
      this.getOrdersData(
        this.data.user.user_id,
        this.data.limit,
        this.data.offset
      )
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 自定义tabbar 手动赋值
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
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