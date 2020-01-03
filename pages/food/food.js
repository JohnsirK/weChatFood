// 引入app实例
const app = getApp()
// pages/food/food.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前选择城市
    nowCity: {},
    // 当前选择地址
    pickToAddress: {},
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
        value: 1
      },
      {
        text: '配送最快',
        value: 2
      },
      {
        text: '评分高',
        value: 3
      },
      {
        text: '智能排序 ',
        value: 4
      },
      {
        text: '距离最近',
        value: 5
      },
      {
        text: '销量最高',
        value: 6
      }
    ],
    // 选中值的序号
    num: 3,
    // 选中值的文字
    text: '智能排序',
    // 分类列表数据
    categoryList: [],
    // 获取的数据
    categoryData: [],
    // 左侧id
    leftId: null,
    // 当前页数
    page: 0,
    // items数据结构
    items: [
      {
        // 导航名称
        text: '所有城市',
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '温州',
            // id，作为匹配选中状态的标识
            id: 1,
          },
          {
            text: '杭州',
            id: 2
          }
        ]
      }
    ],
    mainActiveIndex: 0,
    activeId: null,
  },
  // 
  changeIndex(e) {
    this.setData({
      order_by: e.detail,
      offset: 0,
      page: 0
    })
    wx.showLoading({
      title: '数据加载中'
    })
    app.fetchApi.getShoppingTwo(
      this.data.pickToAddress.latitude,
      this.data.pickToAddress.longitude, 
      this.data.offset, 
      this.data.limit,
      this.data.leftId,
      this.data.order_by,
      this.data.activeId
    )
    .then(res => {
      wx.hideLoading()
      this.setData({
        categoryData: res
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 点击左侧
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
      leftId: this.data.categoryList[detail.index].id
    })
  },
  // 点击右侧
  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id
    this.setData({
      offset: 0,
      activeId,
      page: 0
    })
    wx.showLoading({
      title: '数据加载中'
    })
    // 执行请求
    app.fetchApi.getShoppingTwo(
      this.data.pickToAddress.latitude,
      this.data.pickToAddress.longitude, 
      this.data.offset, 
      this.data.limit,
      this.data.leftId,
      this.data.order_by,
      this.data.activeId
    )
    .then(res => {
      wx.hideLoading()
      this.setData({
        categoryData: res
      })
    })
    .catch(err => {
      console.log(err)
    })
    // 关闭选择条件框
    this.selectComponent('#toggleStatus').toggle()
  },
  // 获取当前点击的数据
  getShoppingData(latitude, longitude, offset, limit, restaurant_category_id, order_by, restaurant_category_ids) {
    wx.showLoading({
      title: '数据加载中'
    })
    app.fetchApi.getShoppingTwo(
      latitude, 
      longitude, 
      offset,
      limit,
      restaurant_category_id,
      order_by,
      restaurant_category_ids
    )
    .then(res => {
      wx.hideLoading()
      this.setData({
        categoryData: [...this.data.categoryData, ...res]
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 获取分类数据
  // 参数: latitude 纬度, longitude 经度
  getCategoryData(latitude, longitude) {
    app.fetchApi.getCategory(latitude, longitude)
    .then(res => {
      // 总数组
      let allArr = []
      // 规格数组
      if (res) {
        // 改造数据
        res.forEach(item => {
          // 思路:判断sub_categories字段里面有没有数据
          // 没数据直接添加暂无数据.
          if (!item.sub_categories.length) {
            allArr.push({
              count: item.count,
              id: item.id,
              ids: item.ids,
              image_url: item.image_url,
              level: item.level,
              text: item.name,
              children: [{text: '暂无数据', disabled: true}],
              __v: item.__v
            })
          } else {
            // 如果有数据的话,需要循环数组每一项.
            let oneArr = []
            item.sub_categories.forEach(li => {
              oneArr.push({
                count: li.count,
                id: li.id,
                image_url: li.image_url,
                level: li.level,
                text: li.name,
                _id: li._id
              })
            })
            // 重新每一项添加个新数组.
            allArr.push({
              count: item.count,
              id: item.id,
              ids: item.ids,
              image_url: item.image_url,
              level: item.level,
              text: item.name,
              children: oneArr,
              __v: item.__v
            })
          }
        })
      }
      this.setData({
        categoryList: allArr
      })
    })
    .catch(err => {
      console.log(err)
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
    // 获取页面传过来的参数
    this.setData({
      leftId: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCategoryData(this.data.pickToAddress.latitude, this.data.pickToAddress.longitude)
    this.getShoppingData(
      this.data.pickToAddress.latitude, 
      this.data.pickToAddress.longitude, 
      this.data.offset, 
      this.data.limit,
      this.data.leftId,
      this.data.order_by,
      this.data.activeId
    )
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
    this.setData({
      // 跳过数据
      offset: this.data.page * this.data.limit
    })
    // 获取新数据
    this.getShoppingData(
      this.data.pickToAddress.latitude, 
      this.data.pickToAddress.longitude, 
      this.data.offset, 
      this.data.limit,
      this.data.leftId,
      this.data.order_by,
      this.data.activeId
    )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})