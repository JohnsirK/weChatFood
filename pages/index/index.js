//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 当前选择城市
    nowCity: {},
    // 当前选择地址
    pickToAddress: {},
    // 食品分类数组
    indexEntryData: [],
    // banner 滚动图列表
    bannerList: [
      'https://i3.meishichina.com/attachment/magic/2019/11/20/2019112015742153873858197577.jpg',
      'https://i3.meishichina.com/attachment/magic/2019/11/01/2019110115725739506058197577.jpg',
      'https://i3.meishichina.com/attachment/magic/2019/11/15/2019111515737840152668197577.jpg',
      'https://i3.meishichina.com/attachment/magic/2019/11/11/2019111115734435933728197577.jpg'
    ],
    // 图片路径
    imgUrl: 'https://fuss10.elemecdn.com',
    // banner高度
    height: '',
    // 今日推荐数据
    todayHotData: [],
    // 今日推荐所需请求变量
    // 跳过数据
    offset: 0,
    // 请求数量
    limit: 20,
    // 排序方式
    // 1: 起送价
    // 2: 配送速度
    // 3: 评分
    // 4: 智能排序
    // 5: 距离最近
    // 6: 销量最高
    order_by: 4
  },
  // 获取食品分类数据
  // 由于swiper要求的数据结构，一页显示8个。所以需要处理一下数据。
  // 需要将数据改成data / 8 页
  getIndexEntryData() {
    app.fetchApi.getIndexEntry()
    .then(res => {
      const _data = res 
      const page = parseInt(_data.length / 8)
      // 定义新数组，用于存放最后的数据
      let dataArr = []
      // 定义若干个arr, 用来存放每个page里面的8个数据
      let arr = []
      // 循环总数据 / 8的页数。
      for (let i = 0; i < page; i++) {
        // 每次进来之前先把当前page页面的arr数组清空
        arr = []
        // 循环每个page页面里的8个数据
        for (let j = 0; j < 8; j++) {
          // 将原数据中当前page * 8 + j的数据一次存入当前page的arr数组中。
          // 如 page循环到1的时候,j 循环到2
          // _data[1 * 8 + 2] = 10。就将第10条数据添加到arr中。
          arr.push(_data[i * 8 + j])
        }
        // 然后将每页的page arr的数组添加给dataArr
        dataArr.push(arr)
        arr = []
        // 还有一种情况。如果总数据返回的个数不是8的倍数。
        // 处理思路：判断页数 * 8 是否 小于 数据总个数，说明一页不够8个数据
        if (page * 8 < _data.length) {
          // 循环所有的_data数据
          for (let i = 0; i < _data.length; i++) {
            // 将page * 8剩余的个数依次存入arr数组中。因为此时page * 8的倍数数据已经被处理，只剩下比这个数字大或者小的情况
            arr.push(_data[page * 8 + i])
          }
          dataArr.push(arr)
        }
      }
      // 将处理后的数据赋值给data里面的变量
      this.setData({
        indexEntryData: dataArr
      })
      
      console.log(this.data.indexEntryData)
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 获取今日推荐数据
  // latitude 必选 纬度
  // longitude  必选 经度
  // offset 可选    跳过多少条数据,默认0
  // limit  可选    请求数据的数量,默认20
  // order_by 可选  排序方式id: 1: 起送价, 2: 配送速度, 3: 评分, 4: 智能排序(优化), 5: 距离最近, 6: 销量最高
  getShoppingData(latitude, longitude, offset, limit, order_by) {
    app.fetchApi.getShopping(latitude, longitude, offset, limit, order_by)
    .then(res => {
      if (res) {
        this.setData({
          todayHotData: res
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 获取图片高度
  imgHeight(e) {
    // 获取当前屏幕宽度
    const winWidth = wx.getSystemInfoSync().windowWidth
    // 获取图片高度
    const imgH = e.detail.height
    // 图片宽度
    const imgW = e.detail.width
    // 等比设置swiper的高度
    // 即 屏幕宽度 / swiper 高度 = 图片宽度 / 图片高度 ==> swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    const swiperH = winWidth * imgH / imgW + 'px'
    this.setData({
      height: swiperH
    })
  },
  // 跳转到更多
  toMore() {
    wx.navigateTo({
      url: '/pages/allShop/allShop'
    })
  },
  // 跳转至分类页面
  toFood(e) {
    wx.navigateTo({
      url: `/pages/food/food?id=${e.currentTarget.dataset.item.id}&title=${e.currentTarget.dataset.item.title}`
    })
  },
  // 刚进页面加载
  onLoad: function () {
    // 判断有没有选择地址和当前地址
    if (!app.globalData.nowCity.id && !app.globalData.pickToAddress.geohash) {
      wx.navigateTo({
        url: '/pages/allCity/allCity'
      })
      return false
    } else {
      this.setData({
        nowCity: app.globalData.nowCity,
        pickToAddress: app.globalData.pickToAddress
      })
    }
    // 动态修改标题栏
    wx.setNavigationBarTitle({
      title: this.data.nowCity.name + '-' + this.data.pickToAddress.name
    })
   // 获取商铺分类数据
   
  },
  // 切后台或者页面进入
  onShow: function() {
    // 自定义tabbar 手动赋值
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  // DOM加载完毕
  onReady: function() {
    this.getIndexEntryData()
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
  }
})
