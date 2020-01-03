// pages/allShop/allShop.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前选择城市
    nowCity: {},
    // 当前选择地址
    pickToAddress: {},
    // 图片路径
    imgUrl: 'https://fuss10.elemecdn.com',
    // 今日推荐数据
    todayHotData: [],
    // 今日推荐所需请求变量
    // 跳过数据
    offset: 0,
    // 请求数量
    limit: 20,
    // 当前第几页
    page: 0,
    // 排序方式
    // 1: 起送价
    // 2: 配送速度
    // 3: 评分
    // 4: 智能排序
    // 5: 距离最近
    // 6: 销量最高
    order_by: 4,
    orderList: [
      {
        text: '起送最低',
        id: 1
      },
      {
        text: '配送最快',
        id: 2
      },
      {
        text: '评分高',
        id: 3
      },
      {
        text: '智能排序 ',
        id: 4
      },
      {
        text: '距离最近',
        id: 5
      },
      {
        text: '销量最高',
        id: 6
      }
    ],
    // 选中值的序号
    num: 3,
    // 选中值的文字
    text: '智能排序',
    // 筛选条件显示隐藏
    isShow: false,
    // 筛选条件动画
    isShowAni: "",
    // 执行显示还是关闭动画
    showNum: 1,
    // scrollView高度
    numHeight: 0
  },
  // 获取今日推荐数据
  // latitude 必选 纬度
  // longitude  必选 经度
  // offset 可选    跳过多少条数据,默认0
  // limit  可选    请求数据的数量,默认20
  // order_by 可选  排序方式id: 1: 起送价, 2: 配送速度, 3: 评分, 4: 智能排序(优化), 5: 距离最近, 6: 销量最高
  getShoppingData(latitude, longitude, offset, limit, order_by) {
    wx.showLoading({
      title: '数据加载中,请稍后'
    })
    app.fetchApi.getShopping(latitude, longitude, offset, limit, order_by)
    .then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          todayHotData: [...this.data.todayHotData, ...res]
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 改变index
  changeIndex (e) {
    if (e.currentTarget.dataset.item.id !== this.data.order_by) {
    wx.showLoading({
      title: '数据加载中,请稍后'
    })
    this.setData({
      num: e.currentTarget.dataset.index,
      text: e.currentTarget.dataset.item.text,
      order_by: e.currentTarget.dataset.item.id,
      offset: 0
    })
    app.fetchApi.getShopping(
      // 纬度
      this.data.pickToAddress.latitude,
      // 经度
      this.data.pickToAddress.longitude,
      // 跳过多少数据
      this.data.offset,
      // 请求数据的数量
      this.data.limit,
      // 排序方式id
      this.data.order_by
    )
    .then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          todayHotData: res
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
    }
    this.hideSelect()
  },
  // 判断当前条件是显示还是隐藏
  isNum() {
    if(this.data.showNum) {
      this.showSelect()
    } else {
      this.hideSelect()
    }
  },
  // 筛选条件显示
  showSelect() {
    // 创建动画
    let animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      delay: 0
    })
    animation.opacity(1).top(40).step()
    this.setData({
      showNum: 0,
      isShow: true,
      isShowAni: animation.export()
    })
  },
  // 筛选条件隐藏
  hideSelect() {
    let animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      delay: 0
    })
    animation.opacity(0).top(-200).step()
    this.setData({
      showNum: 1,
      isShow: false,
      isShowAni: animation.export()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断有没有选择地址和当前地址
    if (!app.globalData.nowCity.id && !app.globalData.pickToAddress.geohash) {
      return false
    } else {
      this.setData({
        nowCity: app.globalData.nowCity,
        pickToAddress: app.globalData.pickToAddress
      })
    }
    // 获取今日热门数据
    this.getShoppingData(
      // 纬度
      this.data.pickToAddress.latitude,
      // 经度
      this.data.pickToAddress.longitude,
      // 跳过多少数据
      this.data.offset,
      // 请求数据的数量
      this.data.limit,
      // 排序方式id
      this.data.order_by
    )
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
    this.data.page += 1
    console.log(this.data.page)
    this.setData({
      offset: this.data.page * this.data.limit,
    })
    this.getShoppingData(
      // 纬度
      this.data.pickToAddress.latitude,
      // 经度
      this.data.pickToAddress.longitude,
      // 跳过多少数据
      this.data.offset,
      // 请求数据的数量
      this.data.limit,
      // 排序方式id
      this.data.order_by
    )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})