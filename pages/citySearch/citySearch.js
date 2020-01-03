// app实例化
const app = getApp()
// pages/citySearch/citySearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索框的值
    searchValue: '',
    // 城市名称,
    cityName: '',
    // 城市id
    cityId: 0,
    // 搜素结果
    searchListData: [],
    // 历史记录
    historyList: []
  },
  // 搜索地址实现双向绑定
  searchInp (e) {
    if (!e.detail.value) {
      this.setData({
        searchListData: [],
        searchValue: e.detail.value
      })
    } else {
      this.setData({
        searchValue: e.detail.value
      })
    }
    
  },
  // 获取搜索结果
  getSearchListData (id, text) {
    app.fetchApi.getSearchList(id, text)
    .then(res => {
      this.setData({
        searchListData: res
      })
      console.log(this.data.searchListData)
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 点击搜索
  goSearch () {
    // 执行搜索
    this.getSearchListData(this.data.cityId, this.data.searchValue)
  },
  // 跳转到首页
  toIndex (e) {
    let isok = false
    app.globalData.pickToAddress = e.currentTarget.dataset.item
    // 保存当前点击的对象数据
    const obj = e.currentTarget.dataset.item
    // 优先判断当前的历史记录数组是否为空。
    // 如果为空直接使用unshift添加数据
    // 如果不为空就循环数组的每项，
    // 如果当前点击项和数组中的某一项重复的话那就不添加到记录里。
    if (this.data.historyList.length > 0) {
      this.data.historyList.forEach(item => {
        if (item.geohash === obj.geohash) {
          isok = true
        }
      })
      if (!isok) {
        this.data.historyList.unshift(obj)
      }
    } else {
      this.data.historyList.unshift(obj)
    }
    this.setData({
      historyList: this.data.historyList
    })
    wx.setStorageSync('historyList', this.data.historyList)
    wx.setStorageSync('pickAddress', e.currentTarget.dataset.item)
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  // 清除所有历史记录
  clearAllHistory () {
    if (!wx.getStorageSync('historyList')) {
      wx.showToast({
        title: '暂无记录',
        icon: 'none',
        duration: 1500
      })
    } else {
      try {
        wx.removeStorageSync('historyList')
        this.setData({
          historyList: []
        })
        wx.showToast({
          title: '清除成功',
          icon: 'none',
          duration: 1500
        })
      } catch (e) {
        wx.showToast({
          title: '清除失败,请重试',
          icon: 'none',
          duration: 1500
        })
        console.log(e)
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 此处可以接收从上个页面路由传参的值
    this.setData({
      cityName: options.name,
      cityId: options.id
    }) 
    // 刚进页面先判断storage里面是否有历史记录
    if (wx.getStorageSync('historyList')) {
      this.setData({
        historyList: wx.getStorageSync('historyList')
      })
    }
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