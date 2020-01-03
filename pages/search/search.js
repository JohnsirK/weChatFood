const app = getApp()
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 城市数据
    city: {},
    // 用户输入
    searchText: '',
    // 搜索的餐馆数据
    searchData: [],
    imgUrl:'https://elm.cangdu.org/img/',
  },
  // 跳转到商铺页面
  goShop(e) {
    wx.redirectTo({
      url: `/pages/shop/shop?id=${e.currentTarget.dataset.item.id}`,
    })
  },
  // 双向绑定输入值
  changeInput(e) {
    this.setData({
      searchText: e.detail.value
    })
  },
  // 执行搜索
  goSearch() {
    let geohash = this.data.city.latitude + ',' + this.data.city.longitude
    if (!this.data.searchText) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.getRestaurantsData(geohash, this.data.searchText)
    }
    
  },
  // 判断是否有城市数据
  isCity() {
    if(app.globalData.nowCity && app.globalData.nowCity.id) {
      this.setData({
        city: app.globalData.nowCity
      })
    }
  },
  // 搜索餐馆数据
  getRestaurantsData(
    geohash,
    keyword
  ) {
    wx.showLoading({
      title: '搜索中...',
    })
    app.fetchApi.getRestaurants(geohash, keyword)
    .then(res => {
      wx.hideLoading()
      this.setData({
        searchData: res
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
    this.isCity()
    console.log(this.data.city)
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
    // 自定义tabbar 手动赋值
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
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