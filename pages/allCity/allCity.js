// 获取应用实例
const app = getApp()
// pages/allCity/allCity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 热门城市数据
    hotCity: [],
    // 全部城市数据
    allCity: {},
    // 全部城市数据数组
    allCityArr: [],
    // 是否显示
    isShow: true,
    // 右侧索引
    text: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
    // 当前点击或者选择的索引id
    indexId: '',
    // 
    toView: 'e',
    // 滚动条距离顶部高度
    indexY: '',
    // 中间的放大索引是否显示
    indexShow: false,
    // 滚动条位置
    scrollTop: 0,
    // 所有view高度数组
    allHeight: [],
    // 选择变量
    currt: 'A'
  },
  // 获取城市列表
  getCityListData (type) {
    app.fetchApi.getCityList(type)
    .then(res => {
      if (type === 'hot') {
        this.setData({
          // 热门城市
          hotCity: res
        })
      } else {
        // 由于后端返回的数据没有按照a-z的顺序。所以必须处理一下后端的数据改成可供我们使用的数据
        // 思路：利用字符A-Z对应的ASCII值。分别查找返回的数据对应的。然后添加给新对象里面去。
        // 具体实现如下
        // 新建一个空对象
        let newObj = {}
        let newArr = []
        // 字符A-Z对应的ASCII值是65-90。依次加1，所以采用for循环
        for (let i = 65; i <= 90; i++) {
          let o = {}
          // String.formCharCode() 返回参数对应的ASCII值
          let num = String.fromCharCode(i)
          newObj[num] = res[num]
          o[num] = res[num]
          newArr.push(o)
        }
        console.log(res)
        this.setData({
          isShow: false,
          // 全部城市
          allCity: newObj,
          allCityArr: newArr
        })
        // 获取所有view的高度
        // 由于数据是异步获取，所以有时候会出现没获取到数据的情况
        let hArr = []
        setTimeout(() => { 
          this.data.text.forEach(item => {
            let query = wx.createSelectorQuery()
            query.select('#' + item).boundingClientRect()
            query.exec(function (res) { 
              if (!res[0]) {
                hArr.push(0) 
              } else {
                hArr.push(res[0].top)
              } 
            })
          })
        }, 3000)
        this.setData({
          allHeight: hArr
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 滚动时触发 
  cityScroll(e) { 
    // 由于太卡，暂屏蔽
    // let name = 0
    // for (let i = 0; i < this.data.allHeight.length; i++) {
    //   if (e.detail.scrollTop > this.data.allHeight[i] && e.detail.scrollTop < this.data.allHeight[i + 1]) {
    //     name = i
    //     break
    //   }
    // }
    // this.setData({
    //   currt: this.data.text[name]
    // })
  },
  // 点击右侧滚动左侧
  clickIndex(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currt: e.currentTarget.dataset.id,
      indexId: e.currentTarget.dataset.id,
      indexShow: true,
      scrollTop: this.data.allHeight[index]
    })
    setTimeout(() => {
      this.setData({
        indexShow: false
      })
    }, 1000)
  },
  // 点击跳转到搜索页
  toSearch (e) {
    wx.setStorageSync('nowPickCity', e.currentTarget.dataset.item)
    // 设置全局变量。因为选择的城市数据很多页面都要用到
    app.globalData.nowCity = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/citySearch/citySearch?id=${e.currentTarget.dataset.item.id}&name=${e.currentTarget.dataset.item.name}`
    })
  },
  
  // 小程序注册完成后，加载页面。触发该方法。
  onLoad: function () {
    // 获取热门城市数据
    this.getCityListData('hot')
    // 获取全部城市数据
    this.getCityListData('group')
  },
  // 页面载入后触发onShow方法。显示页面
  onShow: function () {
    
  },
  // 页面首次显示，会触发onReady，渲染页面元素和样式。一个页面只会调用一次。
  onReady: function () {
    
  },
  // 小程序进入后台或者跳转到其他页面时，触发onHide方法。
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